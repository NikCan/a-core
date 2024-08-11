import { FC, memo } from 'react';
import s from './Button.module.scss';

export const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = memo(
  ({ children, ...props }) => {
    return (
      <button className={s.button} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
