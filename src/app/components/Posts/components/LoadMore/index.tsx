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

export function LoadMore(props: { nextPage(): void; isFetching: boolean }) {
  const { nextPage, isFetching } = props;
  const componentRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useElementOnScreen(componentRef);

  const timerId = useRef<NodeJS.Timeout | null>(null);

  function checkVisibility() {
    if (isVisible) {
      nextPage();
    }
  }

  function clearTimer() {
    timerId.current && clearInterval(timerId.current);
  }

  // set timer if playerData is empty
  useEffect(() => {
    timerId.current = setInterval(() => {
      checkVisibility();
    }, 1000);
    return clearTimer;
  }, [isVisible]);

  return (
    <div ref={componentRef}>
      {isFetching ? <div>Loading...</div> : <div>Swipe to load more</div>}
    </div>
  );
}
