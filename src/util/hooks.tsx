import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { breakPoint } from "./layout";

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

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export const useBreakpoint = (bp: string) => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { width } = windowDimensions;

  return width <= breakPoint(bp);
};
