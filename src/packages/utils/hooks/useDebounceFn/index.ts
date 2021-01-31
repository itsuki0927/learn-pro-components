import type { DependencyList } from 'react';
import { useEffect, useRef, useCallback } from 'react';

export type ReturnValue<T extends any[]> = {
  run: (...args: T) => void;
  cancel: () => void;
};

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
    return () => undefined;
  }, deps);
};

function useDebounceFn<T extends any[]>(
  fn: (...args: T) => Promise<any>,
  deps: DependencyList | number,
  wait?: number,
): ReturnValue<T> {
  const hooksDeps: DependencyList = Array.isArray(deps) ? deps : [];
  const hookWait = typeof deps === 'number' ? deps : wait || 0;
  const timer = useRef<any>();

  const fnRef = useRef<any>(fn);
  fnRef.current = fn;

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  const run = useCallback(() => {
    async (...args: any): Promise<void> => {
      return new Promise((resolve) => {
        cancel();
        timer.current = setTimeout(async () => {
          await fnRef.current(...args);
          resolve();
        }, hookWait);
      });
    };
  }, []);

  useUpdateEffect(() => {
    run();
    return cancel;
  }, [hookWait, hooksDeps]);

  useEffect(() => cancel, []);

  return {
    run,
    cancel,
  };
}

export default useDebounceFn;
