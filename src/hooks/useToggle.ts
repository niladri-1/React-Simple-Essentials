import { useCallback, useState } from "react";

export interface UseToggleReturn {
  value: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * A highly optimized state management hook to cleanly toggle booleans.
 */
export function useToggle(initialValue = false): UseToggleReturn {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((current) => !current);
  }, []);

  const open = useCallback(() => {
    setValue(true);
  }, []);

  const close = useCallback(() => {
    setValue(false);
  }, []);

  return { value, toggle, open, close, setValue };
}
