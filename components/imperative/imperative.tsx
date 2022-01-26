import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import {
  CSSTransitionContainer,
  ICSSContainerRef
} from './cssTransition';

interface ImperativeShowOption {
  element: React.ReactElement;
  duration?: number;
  autoClose?: boolean;
}

export const imperative = {
  isShowing: false,
  timeout: null,
  containerDom: null,
  containerRef: null,
  init: () => {
    const containerDom = imperative.getContainerDom();
    const ref = React.createRef<ICSSContainerRef>();
    render(<CSSTransitionContainer ref={ref} />, containerDom);
    imperative.containerRef = ref;
  },
  getContainerRef: () => {
    if (!imperative.containerRef) {
      imperative.init();
    }
    return imperative.containerRef.current as ICSSContainerRef;
  },
  getContainerDom: () => {
    if (!imperative.containerDom) {
      const containerDom = document.createElement('div');
      containerDom.id = 'imperative-container';
      document.body.appendChild(containerDom);
      imperative.containerDom = containerDom;
    }
    return imperative.containerDom;
  },
  destroy: () => {
    const containerDom = document.getElementById('imperative-container');
    if (containerDom) {
      unmountComponentAtNode(containerDom);
    }
    imperative.isShowing = false;
    if (imperative.timeout) {
      clearTimeout(imperative.timeout);
      imperative.timeout = null;
    }
  },
  remove: () => {
    // unmountComponentAtNode(document.getElementById('imperative-container'));
    const containerRef = imperative.getContainerRef();
    containerRef.unmount();
    imperative.isShowing = false;
    if (imperative.timeout) {
      clearTimeout(imperative.timeout);
      imperative.timeout = null;
    }
  },
  show: (option: ImperativeShowOption) => {
    const { element, duration = 3, autoClose = true } = option;

    if (imperative.isShowing) {
      imperative.remove();
    }
    const containerRef = imperative.getContainerRef();
    containerRef.mount(element);

    imperative.isShowing = true;
    if (duration && autoClose) {
      imperative.timeout = setTimeout(imperative.remove, duration * 1000);
    }
  }
};
