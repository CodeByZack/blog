import React  from 'react';
import ReactDOM from 'react-dom';


export interface IInjectPropsByImperative {
  dispose : ()=>void;
  reject : (value: unknown) => void;
  resolve : (value: unknown) => void;
};

/**
 * 用于把 React 组件变成命令式的
 * 比如 showModal showToast 这种形式
 * 此处还返回 promise 方便获取弹出组件的返回值
 * 
 * @param Component React 组件 会注入 reject resolve dispose 三个属性
 * @param mountingNode 挂载的dom节点 默认 document.body
 * @param unmountDelay 卸载延迟的时间 默认 1000ms
 * @returns 返回一个函数 签名如下 (props)=>Promise 
 */
const makeImperative = <T,>(Component : React.ComponentType<T>, mountingNode ?: HTMLElement, unmountDelay = 1000, ) => {
  return (props : T) => {
    const wrapper = (mountingNode || document.body).appendChild(document.createElement('div'));
    const promise = new Promise((resolve, reject) => {
      try {
        ReactDOM.render(
          <Component
            reject={reject}
            resolve={resolve}
            dispose={dispose}
            {...props}
          />,
          wrapper
        );
      } catch (e) {
        console.error(e);
        throw e;
      }
    })

    function dispose() {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(wrapper);
        setTimeout(() => {
            if (wrapper && wrapper.parentNode) {
              wrapper.parentNode.removeChild(wrapper);
            }
        });
      }, unmountDelay);
    }

    return promise.then((result) => {
      dispose();
      return result;
    }, (result) => {
      dispose();
      return Promise.reject(result);
    });
  }
}

export default makeImperative;