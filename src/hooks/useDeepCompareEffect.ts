import React, {
  DependencyList,
  EffectCallback,
  useEffect,
  useRef,
} from 'react';
import isDev from './utils/isDev';
import depsEqual from './utils/depsEqual';

const isPrimitive = (val: any) => val !== Object(val);
const useDeepCompareEffect = (effect: EffectCallback, deps: DependencyList) => {
  if (isDev) {
    if (!(deps instanceof Array) || !deps.length) {
      console.warn(
        '`useDeepCompareEffect` should not be used with no dependencies. Use React.useEffect instead.',
      );
    }

    if (deps.every(isPrimitive)) {
      console.warn(
        '`useDeepCompareEffect` should not be used with dependencies that are all primitive values. Use React.useEffect instead.',
      );
    }
  }

  const ref = useRef<DependencyList>();

  if (!ref.current || !depsEqual(deps, ref.current)) {
    ref.current = deps;
  }

  useEffect(effect, ref.current);
};

export default useDeepCompareEffect;
