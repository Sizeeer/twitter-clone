//@ts-nocheck
import { useEffect, useState, useRef, RefObject } from "react";

export const useOnScreen = (ref: RefObject<HTMLElement>) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting)
    );
  }, []);

  useEffect(() => {
    const currentElement = ref.current;

    if (currentElement) {
      observerRef.current.observe(ref.current);
    }

    return () => {
      if (currentElement) {
        observerRef.current.unobserve(currentElement);
      }
    };
  }, [ref]);

  return isOnScreen;
};
