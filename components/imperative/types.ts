export type ToastPosition =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

export type TypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';

export interface ToastTransitionProps {
  isIn: boolean;
  done: () => void;
  position: ToastPosition | string;
  preventExitTransition: boolean;
  nodeRef: React.RefObject<HTMLElement>;
  children?: React.ReactNode;
}
