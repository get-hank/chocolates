import { useCallback, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { clearCookie, getCookie, setCookie } from "./cookies";

export const defaultHeaders = (apiToken: string) => {
  const impersonateId = getCookie("impersonate_id");

  return {
    Authorization: `Bearer ${apiToken}`,
    "Content-Type": "application/json",
    ...(impersonateId && { "X-Impersonate-Id": impersonateId }),
  };
};

export const useApiToken = (apiBase: string) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [apiToken, setApiToken] = useState<string | undefined>();

  useEffect(() => {
    if (!user) return;

    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: apiBase,
        });
        setApiToken(accessToken);
      } catch (e) {
        console.error(e.message, e);
      }
    };

    getToken();
  }, [user, getAccessTokenSilently, setApiToken]);

  return apiToken;
};

export const impersonate = (userId: string, apiBase: string) => {
  const url = new URL(apiBase);

  setCookie({
    name: "impersonate_id",
    value: userId,
    expiresInSeconds: 600,
    secure: url.protocol === "https:",
    ...(url.hostname !== "localhost" && {
      domain: url.hostname.split(".").slice(-2).join("."),
    }),
  });
};

export const stopImpersonating = () => clearCookie("impersonate_id");

type requestArgs = {
  apiBase: string;
  apiToken: string;
  path: string;
  method?: string;
  body?: object;
};

export const request: (
  r: requestArgs
) => Promise<{ error?: Error; body?: any }> = async ({
  apiBase,
  apiToken,
  path,
  method,
  body,
}) => {
    const impersonateId = getCookie("impersonate_id");
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
        } else if (responseBody.error) {
          return { error: new Error(responseBody.error), body: responseBody };
        }
        return { error: new Error("Something went wrong") };
      }

      // reset expiration on impersonation cookie upon successful API request
      if (impersonateId) impersonate(impersonateId, apiBase);

      return { body: responseBody };
    } catch (err) {
      return { error: err };
    }
  };
