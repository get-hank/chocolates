import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { breakPoint } from "./layout";

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

export const useHashRoute = (name: string, yOffset = 0) => {
  const { hash } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const ref = useCallback(
    (node) => {
      if (!scrolled && node && node.offsetTop) {
        setScrolled(true);
        if (hash === `#${name}`) {
          setTimeout(() => {
            window.scrollTo(0, node.offsetTop - yOffset);
          });
        }
      }
    },
    [hash, scrolled, setScrolled, name]
  );
};
