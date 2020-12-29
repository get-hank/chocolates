import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

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
