"use client";
import { useState, useEffect, useRef } from "react";

function useElementOnScreen(ref: any) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isVisible;
}

interface Props {
  nextPage(): void;
  isFetching: boolean;
  children: React.ReactNode;
}

export function LoadMore(props: Props) {
  const { nextPage, isFetching, children } = props;
  const componentRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useElementOnScreen(componentRef);

  const timerId = useRef<NodeJS.Timeout | null>(null);

  // set timer if playerData is empty
  useEffect(() => {
    function checkVisibility() {
      if (isVisible) {
        nextPage();
      }
    }
    timerId.current = setInterval(() => {
      checkVisibility();
    }, 1000);
    return () => {
      timerId.current && clearInterval(timerId.current);
    };
  }, [isVisible, nextPage]);

  return <div ref={componentRef}>{isFetching ? children : null}</div>;
}
