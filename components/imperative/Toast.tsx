import { useContext, useRef } from 'react';
import { POSITION } from './constants';
import { Slide } from './cssTransition';
import { imperative } from './imperative';
import { ToastPosition } from './types';

interface IToastProps {
  isIn?: boolean;
  preventExitTransition?: boolean;
  done?: () => void;
  position?: ToastPosition;
  msg: string;
}

interface IShowToastProps extends IToastProps {
  duration?: number;
}

const Toast = (props: IToastProps) => {
  const {
    msg,
    isIn = true,
    done = () => {},
    position = POSITION.TOP_RIGHT,
    preventExitTransition = false
  } = props;
  const nodeRef = useRef<HTMLDivElement>();

  return (
    <Slide
      isIn={isIn}
      done={done}
      position={position}
      preventExitTransition={preventExitTransition}
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className="toast">
        {msg}
      </div>
    </Slide>
  );
};

const showToast = (parmas: IShowToastProps) => {
  const { duration = 3, msg, ...restProps } = parmas;
  const element = <Toast msg={msg} {...restProps} />;
  imperative.show({ element, duration });
};

export const toast = {
  info: (msg : string) => showToast({ msg })
};

export default Toast;
