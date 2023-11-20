import React, { useCallback, useMemo } from 'react';
import { isFunction } from './utils';
import isDev from './utils/isDev';
import useLatest from './useLatest';
import { current } from '@reduxjs/toolkit';
import useUnmount from './useUnmount';

type Timer = any;
type SomeFunction = (...args: any[]) => any;

function useDebounce<T extends SomeFunction>(fn: T, delay?: number) {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(
        `useDebounce expected parameter is a function, got ${typeof fn}`,
      );
    }
  }

  let lastArgs: any;
  delay = delay || 1000;

  const obj: { fn: SomeFunction; timer: Timer } = {
    fn,
    timer: null,
  };
  const ref = useLatest(obj);

  function cancel() {
    if (ref.current.timer) {
      clearTimeout(ref.current.timer);
    }
  }

  function flush() {
    if (ref.current.timer) {
      clearTimeout(ref.current.timer);
    }
    console.log('2', lastArgs);
    ref.current.fn(...lastArgs);
  }

  const cachedDebounce = useCallback((...args: any[]): any => {
    if (ref.current.timer) {
      clearTimeout(ref.current.timer);
    }

    ref.current.timer = setTimeout(() => {
      ref.current.fn(...args);
    }, delay);
  }, []);

  const debounced = (...args: any[]): any => {
    lastArgs = args
    return cachedDebounce(...args);
  };

  useUnmount(()=>{
    debounced.cancel()
  })

  debounced.cancel = cancel;
  debounced.flush = flush;

  return debounced;
}

export default useDebounce;
