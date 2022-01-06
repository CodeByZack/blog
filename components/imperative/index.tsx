import { unmountComponentAtNode, render } from 'react-dom';

interface ImpreativeShowOption {
  element: React.ReactElement;
  duration?: number;
  autoClose?: boolean;
}

const Toast = (props) => {
  return <div className="toast">测试toast</div>;
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
  remove: () => {
    unmountComponentAtNode(document.getElementById('imperative-container'));
    imperative.isShowing = false;
    if (imperative.timeout) {
      clearTimeout(imperative.timeout);
      imperative.timeout = null;
    }
  },
  show: (option: ImpreativeShowOption) => {
    const { element, duration = 3, autoClose } = option;

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
