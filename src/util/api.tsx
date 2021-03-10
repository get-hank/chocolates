import { useCallback } from "react";
import { DateTime } from "luxon";
import { clearCookie, getCookie, setCookie } from "./cookies";
import { clearSessionKey, getSessionKey, setSessionKey } from "./session";

export type impersonateStorage = "session" | "cookie";
type storageOpts = {
  apiBase?: string;
  storage?: impersonateStorage;
};
const impersonateKey = "impersonate_id";

const getHostInfo = (uri: string) => {
  const url = new URL(uri);
  return {
    secure: url.protocol === "https:",
    ...(url.hostname !== "localhost" && {
      domain: url.hostname.split(".").slice(-2).join("."),
    }),
  };
};

export const impersonate = (
  userId: string,
  { apiBase, storage }: storageOpts
) => {
  if (storage === "session") {
    setSessionKey({
      name: impersonateKey,
      value: userId,
      expireAt: DateTime.local().plus({ minutes: 10 }),
    });
  } else {
    setCookie({
      name: impersonateKey,
      value: userId,
      expiresInSeconds: 600,
      ...getHostInfo(apiBase),
    });
  }
};

export const stopImpersonating = (apiBase: string) => {
  clearSessionKey(impersonateKey);
  clearCookie({ name: impersonateKey, ...getHostInfo(apiBase) });
};

export const isImpersonating = () => !!impersonatingId();

export const impersonatingId = () =>
  getSessionKey(impersonateKey) || getCookie(impersonateKey);

export const impersonateStorageType: () => impersonateStorage | null = () => {
  if (getSessionKey(impersonateKey)) return "session";
  if (getCookie(impersonateKey)) return "cookie";
  return null;
};

type requestArgs = {
  apiBase: string;
  apiToken: string;
  path: string;
  method?: string;
  body?: object;
};

export const defaultHeaders = (apiToken: string) => {
  const impersonateId = impersonatingId();

  return {
    Authorization: `Bearer ${apiToken}`,
    "Content-Type": "application/json",
    ...(impersonateId && { "X-Impersonate-Id": impersonateId }),
  };
};

export const request: (
  r: requestArgs
) => Promise<{
  error?: Error;
  fieldErrors?: { [field: string]: string };
  body?: any;
}> = async ({ apiBase, apiToken, path, method, body }) => {
  const impersonateId = impersonatingId();
  try {
    const res = await fetch(`${apiBase}/${path}`, {
      method: method ? method : "get",
      body: body ? JSON.stringify(body) : null,
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
        ...(impersonateId && { "X-Impersonate-Id": impersonateId }),
      },
    });

    let responseBody = null;
    try {
      responseBody = await res.json();
    } catch (error) {
      if (res.status !== 204) return { error };
    }

    if (!res.ok) {
      if (responseBody.errors && responseBody.errors.length) {
        return { error: new Error(responseBody.errors[0]), body: responseBody };
      } else if (responseBody.errors) {
        const errors = responseBody.errors as {
          [field: string]: string[] | string;
        };
        return {
          body: responseBody,
          fieldErrors: Object.keys(errors).reduce((errs, key) => {
            const val = errors[key];
            if (Array.isArray(val)) {
              errs[key] = val[0] as string;
            } else {
              errs[key] = val as string;
            }
            return errs;
          }, {} as { [field: string]: string }),
        };
      } else if (responseBody.error) {
        return { error: new Error(responseBody.error), body: responseBody };
      }
      return { error: new Error("Something went wrong") };
    }

    // reset expiration on impersonation cookie upon successful API request
    if (impersonateId)
      impersonate(impersonateId, {
        apiBase,
        storage: impersonateStorageType(),
      });

    return { body: responseBody };
  } catch (err) {
    return { error: err };
  }
};
