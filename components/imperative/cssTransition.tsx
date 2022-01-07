import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import { Default } from './constants';
import { ToastTransitionProps } from './types';

export interface CSSTransitionProps {
  /**
   * Css class to apply when toast enter
   */
  enter: string;

  /**
   * Css class to apply when toast leave
   */
  exit: string;

  /**
   * Append current toast position to the classname.
   * If multiple classes are provided, only the last one will get the position
   * For instance `myclass--top-center`...
   * `Default: false`
   */
  appendPosition?: boolean;

  /**
   * Collapse toast smoothly when exit animation end
   * `Default: true`
   */
  collapse?: boolean;

  /**
   * Collapse transition duration
   * `Default: 300`
   */
  collapseDuration?: number;
}

export const enum AnimationStep {
  Enter,
  Exit
}
export interface ICSSContainerRef {
  unmount: () => void;
  mount: (content: React.ReactNode) => void;
}

export const CSSTransitionContainer = React.forwardRef<ICSSContainerRef>(
  (props, ref) => {
    const [content, setContent] = useState<React.ReactElement>();
    const [isIn, setIsIn] = useState(false);
    const [mountStatus, setMountStatus] = useState(false);

    const doRealUnmount = () => {
      setMountStatus(false);
      setContent(null);
    };

    useImperativeHandle(ref, () => {
      const unmount = () => {
        setIsIn(false);
      };
      const mount = (element) => {
        setContent(element);
        setIsIn(true);
        setMountStatus(true);
      };
      return {
        unmount,
        mount
      };
    });

    return (
      <div>
        {mountStatus
          ? React.cloneElement(content, { done: doRealUnmount, isIn })
          : null}
      </div>
    );
  }
);

/**
 * Css animation that just work.
 * You could use animate.css for instance
 *
 *
 * ```
 * cssTransition({
 *   enter: "animate__animated animate__bounceIn",
 *   exit: "animate__animated animate__bounceOut"
 * })
 * ```
 *
 */
export function cssTransition({
  enter,
  exit,
  appendPosition = false
}: CSSTransitionProps) {
  return function ToastTransition({
    children,
    position,
    preventExitTransition,
    done,
    nodeRef,
    isIn
  }: ToastTransitionProps) {
    const enterClassName = appendPosition ? `${enter}--${position}` : enter;
    const exitClassName = appendPosition ? `${exit}--${position}` : exit;
    const baseClassName = useRef<string>();
    const animationStep = useRef(AnimationStep.Enter);

    useLayoutEffect(() => {
      onEnter();
    }, []);

    useEffect(() => {
      if (!isIn) preventExitTransition ? onExited() : onExit();
    }, [isIn]);

    function onEnter() {
      console.log('onEnter');
      const node = nodeRef.current!;
      baseClassName.current = node.className;
      node.className += ` ${enterClassName}`;
      console.log(node);
      node.addEventListener('animationend', onEntered);
    }

    function onEntered(e: AnimationEvent) {
      console.log('onEntered');
      if (e.target !== nodeRef.current) return;

      const node = nodeRef.current!;
      node.removeEventListener('animationend', onEntered);
      if (animationStep.current === AnimationStep.Enter) {
        node.className = baseClassName.current!;
      }
    }

    function onExit() {
      console.log('onExit');
      animationStep.current = AnimationStep.Exit;
      const node = nodeRef.current!;
      node.className += ` ${exitClassName}`;
      node.addEventListener('animationend', onExited);
    }

    function onExited() {
      console.log('onExited');
      const node = nodeRef.current!;
      node.removeEventListener('animationend', onExited);
      done();
    }

    return <>{children}</>;
  };
}

export const Bounce = cssTransition({
  enter: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__bounce-enter`,
  exit: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__bounce-exit`,
  appendPosition: true
});

export const Slide = cssTransition({
  enter: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__slide-enter`,
  exit: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__slide-exit`,
  appendPosition: true
});

export const Zoom = cssTransition({
  enter: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__zoom-enter`,
  exit: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__zoom-exit`
});

export const Flip = cssTransition({
  enter: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__flip-enter`,
  exit: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__flip-exit`
});
