import React, { useEffect, useLayoutEffect, useRef } from 'react';
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

const enum AnimationStep {
  Enter,
  Exit
}

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
      return () => {
        preventExitTransition ? onExited() : onExit();
      };
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
      animationStep.current = AnimationStep.Exit;
      const node = nodeRef.current!;

      node.className += ` ${exitClassName}`;
      node.addEventListener('animationend', onExited);
    }

    function onExited() {
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
