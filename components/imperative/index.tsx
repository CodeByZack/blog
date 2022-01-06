import { useRef } from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { POSITION } from './constants';
import { Slide } from './cssTransition';

interface ImpreativeShowOption {
  element: React.ReactElement;
  duration?: number;
  autoClose?: boolean;
}

const Toast = (props) => {
  const nodeRef = useRef<HTMLDivElement>();

  return (
    <Slide
      isIn={true}
      done={() => {
        console.log('done');
      }}
      position={POSITION.TOP_RIGHT}
      preventExitTransition={false}
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className="toast">
        测试toast
      </div>
    </Slide>
  );
};

export const imperative = {
  isShowing: false,
  timeout: null,
  containerDom: null,
  getContainerDom: () => {
    if (!imperative.containerDom) {
      const containerDom = document.createElement('div');
      containerDom.id = 'imperative-container';
      document.body.appendChild(containerDom);
      imperative.containerDom = containerDom;
    }
    return imperative.containerDom;
  },
  destory: () => {
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
    unmountComponentAtNode(document.getElementById('imperative-container'));
    imperative.isShowing = false;
    if (imperative.timeout) {
      clearTimeout(imperative.timeout);
      imperative.timeout = null;
    }
  },
  show: (option: ImpreativeShowOption) => {
    const { element, duration = 3, autoClose = true } = option;

    if (imperative.isShowing) {
      imperative.remove();
    }
    const containerDom = imperative.getContainerDom();
    render(element, containerDom);
    imperative.isShowing = true;

    if (duration && autoClose) {
      imperative.timeout = setTimeout(imperative.remove, duration * 1000);
    }
  }
};

export const toast = () => {
  const element = <Toast />;
  imperative.show({ element });
};
