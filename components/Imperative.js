import { unmountComponentAtNode, render } from 'react-dom';
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
  show: (option) => {
    if (imperative.isShowing) {
      imperative.remove();
    }
    const containerDom = imperative.getContainerDom();
    render(<div>个地方发呆</div>, containerDom);
    imperative.isShowing = true;

    if (option?.duration) {
      imperative.timeout = setTimeout(imperative.remove, duration * 1000);
    }
  }
};
