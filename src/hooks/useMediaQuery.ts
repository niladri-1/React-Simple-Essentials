import { useState, useEffect } from "react";

/**
 * Listens to CSS media queries and returns a boolean indicating a match.
 * Perfect for responsive JS logic (e.g., rendering a MobileMenu vs DesktopMenu).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = (event: MediaQueryListEvent) =>
      setMatches(event.matches);

    // Set the initial value
    setMatches(mediaQueryList.matches);

    // Listen for changes
    mediaQueryList.addEventListener("change", documentChangeHandler);
    return () => {
      mediaQueryList.removeEventListener("change", documentChangeHandler);
    };
  }, [query]);

  return matches;
}
