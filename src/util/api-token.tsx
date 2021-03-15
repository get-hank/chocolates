import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { clearCookie, getCookie, setCookie } from "./cookies";

export const setAnonToken = (token: string) =>
  setCookie({ name: "anonymous_user_token", value: token, secure: true });

export const clearAnonToken = () =>
  clearCookie({ name: "anonymous_user_token", secure: true });

export const useApiTokenWithReady = (apiBase: string) => {
  const { isLoading, user, getAccessTokenSilently } = useAuth0();
  const [auth0Token, setAuth0Token] = useState<string | undefined>();
  const [anonymousToken, setAnonymousToken] = useState<
    string | null | undefined
  >();

  useEffect(() => {
    if (isLoading || auth0Token) return;

    if (anonymousToken === undefined) {
      setAnonymousToken(getCookie("anonymous_user_token") || null);
    }

    if (!user) return;

    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: apiBase,
        });
        setAuth0Token(accessToken);
      } catch (e) {
        console.error(e.message, e);
      }
    };

    getToken();
  }, [
    isLoading,
    user,
    getAccessTokenSilently,
    auth0Token,
    setAuth0Token,
    anonymousToken,
    setAnonymousToken,
  ]);

  // Clear anon cookie once we have an authenticated token
  useEffect(() => {
    if (!(auth0Token && anonymousToken)) return;

    clearAnonToken();
    setAnonymousToken(null);
  }, [auth0Token, anonymousToken, setAnonymousToken]);

  const token = auth0Token || anonymousToken;

  return {
    token,
    // have a token, or there's no auth0 login nor an anonymous user token
    ready: token || (!user && anonymousToken === null),
  };
};

export const useApiToken = (apiBase: string) => {
  const { token, ready } = useApiTokenWithReady(apiBase);
  if (!ready) return null;
  return token;
};
