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

  useEffect(() => {
    if (isVisible) {
      nextPage();
    }
  }, [isVisible, nextPage]);

  return (
    <div ref={componentRef}>
      {isFetching ? <div>Loading...</div> : <div>Swipe to load more</div>}
    </div>
  );
}
