import { EffectCallback, useEffect, useRef } from 'react';

type Destructor = () => void;

const useEffectOnce = (effect: EffectCallback) => {
  const destroyFunc = useRef<Destructor>();
  const calledOnce = useRef(false);
  const renderAfterCalled = useRef(false);

  if (calledOnce.current) {
    renderAfterCalled.current = true;
  }

  useEffect(() => {
    if (calledOnce.current) {
      return;
    }

    calledOnce.current = true;
    destroyFunc.current = effect() as Destructor;

    return () => {
      if (!renderAfterCalled.current) {
        return;
      }

      if (destroyFunc.current) {
        destroyFunc.current();
      }
    };
  }, []);
};

export default useEffectOnce;
