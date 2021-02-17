import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { useEffect, useRef } from 'react';

type Dispatch<A> = (value: A) => void;

function useMountMergeState<S>(
  initialState: S | (() => S),
  options?: {
    defaultValue: S;
    value?: S;
    onChange?: (value: S, preValue: S) => void;
    postState?: (value: S) => S;
  },
): [S, Dispatch<S>] {
  const mountRef = useRef<boolean>(false);
  useEffect(() => {
    mountRef.current = true;
    return () => {
      mountRef.current = false;
    };
  });
  const [state, setState] = useMergedState<S>(initialState, options);
  const mountSetState: Dispatch<S> = (preState: S) => {
    requestAnimationFrame(() => {
      if (mountRef.current) {
        setState(preState);
      }
    });
  };
  return [state, mountSetState];
}

export default useMountMergeState;
