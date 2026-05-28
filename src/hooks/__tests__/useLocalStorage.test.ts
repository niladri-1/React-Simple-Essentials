import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../useLocalStorage";

describe("useLocalStorage", () => {
  const TEST_KEY = "test-key";

  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("should use initial value if storage is empty", () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, "initial"));
    expect(result.current[0]).toBe("initial");
  });

  it("should update state and localStorage", () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, "initial"));

    act(() => {
      result.current[1]("updated");
    });

    expect(result.current[0]).toBe("updated");
    expect(window.localStorage.getItem(TEST_KEY)).toBe(
      JSON.stringify("updated"),
    );
  });

  it("should retrieve existing value from localStorage on mount", () => {
    window.localStorage.setItem(TEST_KEY, JSON.stringify("existing-data"));
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, "fallback"));

    expect(result.current[0]).toBe("existing-data");
  });
});
