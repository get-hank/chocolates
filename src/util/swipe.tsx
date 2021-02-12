import React, { useCallback, useState } from "react";

const defaultSwipeLength = 100;
const defaultLateralDeviationThreshold = 50;

type Event = React.TouchEvent<HTMLElement>;

type SwipeArgs = {
  onSwipe: (direction: "up" | "down" | "left" | "right", length: number) => any;
  swipeLength?: number;
  lateralDeviationThreshold?: number;
};

type SwipeProps = {
  onTouchStart: (e: Event) => void;
  onTouchMove: (e: Event) => void;
  onTouchEnd: (e: Event) => void;
};

type Pos = {
  x: number;
  y: number;
};

export const useSwipe: (args: SwipeArgs) => SwipeProps = ({
  onSwipe,
  swipeLength = defaultSwipeLength,
  lateralDeviationThreshold = defaultLateralDeviationThreshold,
}) => {
  const [touchStart, setTouchStart] = useState<Pos | null>(null);
  const [touchEnd, setTouchEnd] = useState<Pos | null>(null);

  const handleTouchEnd = useCallback(
    (e: Event) => {
      if (!touchStart || !touchEnd) return;

      const yShift = touchEnd.y - touchStart.y;
      const xShift = touchEnd.x - touchStart.x;
      const xSize = Math.abs(xShift);
      const ySize = Math.abs(yShift);

      if (ySize < lateralDeviationThreshold && xSize > swipeLength) {
        onSwipe(xShift > 0 ? "right" : "left", xSize);
      } else if (xSize < lateralDeviationThreshold && ySize > swipeLength) {
        onSwipe(yShift > 0 ? "down" : "up", ySize);
      }

      setTouchStart(null);
      setTouchEnd(null);
    },
    [
      touchStart,
      setTouchStart,
      touchEnd,
      setTouchEnd,
      onSwipe,
      lateralDeviationThreshold,
      swipeLength,
    ]
  );

  const handleTouchStart = useCallback(
    (e: Event) => {
      const { clientX: x, clientY: y } = e.targetTouches[0];
      setTouchStart({ x, y });
    },
    [setTouchStart]
  );

  const handleTouchMove = useCallback(
    (e: Event) => {
      const { clientX: x, clientY: y } = e.targetTouches[0];
      setTouchEnd({ x, y });
    },
    [setTouchEnd]
  );

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
};
