import isDeepEqualReact from 'fast-deep-equal/es6/react';
import { DependencyList, useEffect, useRef } from 'react';

export const isDeepEqual: (a: any, b: any) => boolean = isDeepEqualReact;

const useDeepCompareMemoize = (value: any) => {
  const ref = useRef();
  if (!isDeepEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
};

const useDeepCompareEffect = (effect: React.EffectCallback, dependencies: DependencyList) => {
  useEffect(effect, useDeepCompareMemoize(dependencies));
};

export default useDeepCompareEffect;
