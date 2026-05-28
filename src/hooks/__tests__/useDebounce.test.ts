import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce the value update', () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    // Update the hook props to trigger a change
    rerender({ value: 'updated', delay: 500 });

    // Before timeout, it should still be 'initial'
    expect(result.current).toBe('initial');

    // FIX: Wrap the timer advancement in act() so React flushes the state update
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // After timeout, it should now be successfully updated
    expect(result.current).toBe('updated');

    vi.useRealTimers();
  });
});
