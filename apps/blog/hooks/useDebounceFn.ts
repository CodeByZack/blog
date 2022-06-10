import { useRef, useCallback, useEffect } from 'react';
const useDebounceFn = (
  func: Function,
  wait: number = 500,
  immediate?: boolean,
) => {
  const timeout = useRef<any>();
  const fnRef = useRef(func);
  useEffect(() => {
    fnRef.current = func;
  }, [func]);
  const cancel = useCallback(function () {
    timeout.current && clearTimeout(timeout.current);
  }, []);

  const resultRef = useRef();
  function resDebounced(...args) {
    //args就是事件对象event

    // 一直触发一直清除上一个打开的延时器
    cancel();

    if (immediate) {
      // 第一次触发，timeout===undefined恰好可以利用timeout的值
      const callNow = !timeout.current;
      timeout.current = setTimeout(function () {
        timeout.current = null;
      }, wait);
      /* this指向func好了 */
      if (callNow) resultRef.current = fnRef.current.apply(fnRef.current, args);
    } else {
      // 停止触发，只有最后一个延时器被保留
      timeout.current = setTimeout(function () {
        timeout.current = null;
        // func绑定this和事件对象event，还差一个函数返回值
        resultRef.current = fnRef.current.apply(fnRef.current, args);
      }, wait);
    }
    return resultRef.current;
  }
  resDebounced.cancel = function () {
    cancel();
    timeout.current = null;
  };

  return useCallback(resDebounced, [wait, cancel, immediate]);
};
export default useDebounceFn;
