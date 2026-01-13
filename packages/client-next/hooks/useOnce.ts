import { useEffect, useRef } from 'react';

/**
 * Custom hook that performs a callback only once within a component
 * @param callback - The function to be executed only once
 */
export function useOnce(callback: () => void): void {
  const hasBeenCalled = useRef(false);

  useEffect(() => {
    if (!hasBeenCalled.current) {
      callback();
      hasBeenCalled.current = true;
    }
  }, [callback]);
}
