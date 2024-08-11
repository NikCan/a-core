import { FC, memo, useCallback, useId, useState } from 'react';
import s from './TextField.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorText?: string;
}
export const TextField: FC<Props> = memo(
  ({ label, errorText, required, type, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const id = useId();

    const isPasswordField = type === 'password';
    const inputType = isPasswordField && showPassword ? 'text' : type;

    const toggleShowPassword = useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    return (
      <div className={s.textField}>
        {label && (
          <label htmlFor={id}>
            {label}
            {required && <span className={s.required}>*</span>}
          </label>
        )}
        <div className={s.inputWrapper}>
          <input
            id={id}
            className={`${s.input} ${errorText ? s.errorInput : ''}`}
            type={inputType}
            {...props}
          />
          {isPasswordField && (
            <span
              className={s.icon}
              onClick={toggleShowPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              role="button"
            >
              {showPassword ? (
                <img src="/a-core/eye-off.svg" alt="eye off" />
              ) : (
                <img src="/a-core/eye-on.svg" alt="eye on" />
              )}
            </span>
          )}
        </div>
        <span className={s.errorText}>{errorText ?? ' '}</span>
      </div>
    );
  }
);

TextField.displayName = 'TextField';
