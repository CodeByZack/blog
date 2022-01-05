import { useRef, useEffect } from 'react';

export const useEventListener = (eventName, handler, element = window) => {
  const handlerRef = useRef();
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);
  useEffect(() => {
    console.log(eventName, element);
    const eventListener = (event) => handlerRef.current?.(event);
    element?.addEventListener(eventName, eventListener);
    return () => {
      element?.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};
