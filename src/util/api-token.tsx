import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getCookie, setCookie } from "./cookies";

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

  return apiToken || getCookie("anonymous_user_token");
};

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

  const token = auth0Token || anonymousToken;

  return {
    token,
    // have a token, or there's no auth0 login nor an anonymous user token
    ready: token || (!user && anonymousToken === null),
  };
};
