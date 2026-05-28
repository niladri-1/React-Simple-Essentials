import { RefObject, useEffect, useRef } from "react";

type EventType = MouseEvent | TouchEvent;

/**
 * Listens for clicks outside of a specified element.
 * Optimized using a mutable ref callback wrapper to prevent listener re-attachments.
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
): void {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    function handleClick(event: EventType) {
      const element = ref.current;
      if (!element) return;

      if (!element.contains(event.target as Node)) {
        callbackRef.current();
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [ref]);
}
