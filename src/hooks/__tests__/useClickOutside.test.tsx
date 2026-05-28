import React, { useRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { useClickOutside } from "../useClickOutside";

function TestComponent({ callback }: { callback: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, callback);
  return (
    <div>
      <div ref={ref} data-testid="inside">
        Inside Element
      </div>
      <button data-testid="outside">Outside Element</button>
    </div>
  );
}

describe("useClickOutside", () => {
  it("should trigger callback when clicked outside the target element", () => {
    const callback = vi.fn();
    const { getByTestId } = render(<TestComponent callback={callback} />);

    fireEvent.mouseDown(getByTestId("outside"));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not trigger callback when clicked inside the target element", () => {
    const callback = vi.fn();
    const { getByTestId } = render(<TestComponent callback={callback} />);

    fireEvent.mouseDown(getByTestId("inside"));
    expect(callback).not.toHaveBeenCalled();
  });
});
