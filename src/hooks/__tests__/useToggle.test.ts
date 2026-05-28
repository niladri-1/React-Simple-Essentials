import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useToggle } from "../useToggle";

describe("useToggle", () => {
  it("should initialize with default false value", () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.value).toBe(false);
  });

  it("should initialize with provided explicit value", () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current.value).toBe(true);
  });

  it("should toggle values correctly", () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(true);
  });

  it("should explicitly open and close values", () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => {
      result.current.open();
    });
    expect(result.current.value).toBe(true);
    act(() => {
      result.current.close();
    });
    expect(result.current.value).toBe(false);
  });
});
