"use client";

import { useState, useEffect } from "react";

export const breakPoints = {
  xs: 420,
  ls: 482,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

function getDeviceScreen() {
  try {
    return window.innerWidth;
  } catch (error) {
    return 0;
  }
}

export function useScreenSize() {
  const [innerWidth, setInnerWidth] = useState(getDeviceScreen);

  useEffect(() => {
    function onResize() {
      setInnerWidth(getDeviceScreen());
    }
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return innerWidth;
}
