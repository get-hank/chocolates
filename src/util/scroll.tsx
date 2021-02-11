import { ComponentType, useEffect, useRef, RefObject } from "react";

const isBrowser = typeof window !== `undefined`;

type Position = {
  x: number;
  y: number;
  visible: boolean;
};

const getScrollPosition: (
  e: RefObject<HTMLElement>,
  s: RefObject<HTMLElement>
) => Position = (element, scrollRegion) => {
  const emptyResult = { x: 0, y: 0, visible: false };
  if (!isBrowser) return emptyResult;
  const target = element && element.current;
  const parent = scrollRegion && scrollRegion.current;
  if (!target || !parent) return emptyResult;

  const targetPos = target.getBoundingClientRect();
  const parentPos = parent.getBoundingClientRect();

  return {
    x: targetPos.left - parentPos.left,
    y: targetPos.top - parentPos.top,
    visible:
      targetPos.bottom - parentPos.top > 0 &&
      targetPos.right - parentPos.left > 0,
  };
};

export function useScrollPosition(
  effect: (p: Position) => unknown,
  deps: unknown[]
) {
  const scrollRegionRef = useRef(null);
  const watchElementRef = useRef(null);

  useEffect(() => {
    const listenTo = scrollRegionRef.current;
    if (!listenTo) return;

    const handleScroll = () => {
      effect(getScrollPosition(watchElementRef, scrollRegionRef));
    };

    listenTo.addEventListener("scroll", handleScroll);

    return () => listenTo.removeEventListener("scroll", handleScroll);
  }, [scrollRegionRef, watchElementRef, ...deps]);

  return { scrollRegionRef, watchElementRef };
}
