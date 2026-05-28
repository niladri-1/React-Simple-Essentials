import { useEffect, useState } from "react";

/**
 * Delays the update of a value until after a specified delay (in milliseconds).
 * Perfect for search inputs to prevent excessive API calls.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    // Cleanup clears the timer if the value changes before the delay finishes
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
