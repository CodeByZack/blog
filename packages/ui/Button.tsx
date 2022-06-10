import { PropsWithChildren } from 'react';
import { CSSProperties } from 'react';
interface IButtonProps {
  onClick?: () => void;
  style?: CSSProperties;
}

const Button = (props: PropsWithChildren<IButtonProps>) => {
  const { onClick, style, children } = props;

  
  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
