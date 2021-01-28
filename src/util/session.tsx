import { DateTime } from "luxon";

type sessionArgs = {
  name: string;
  value: string;
  expireAt?: DateTime;
};

type ExpirableSessionItem = {
  value: string;
  expireAt?: string;
};

export const setSessionKey = ({ name, value, expireAt }: sessionArgs) => {
  const payload = {
    value,
    ...(expireAt && { expireAt: expireAt.toISO() }),
  };
  window.sessionStorage.setItem(name, JSON.stringify(payload));
};

export const getSessionKey = (name: string) => {
  const item = window.sessionStorage.getItem(name);
  if (!item) return null;
  const payload = JSON.parse(item) as ExpirableSessionItem;
  if (
    !payload.expireAt ||
    DateTime.fromISO(payload.expireAt) > DateTime.local()
  )
    return payload.value;

  return null;
};

export const clearSessionKey = (name: string) => {
  window.sessionStorage.removeItem(name);
};
