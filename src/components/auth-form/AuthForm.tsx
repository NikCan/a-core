import { useAuth } from '@/hooks/useAuth';
import { FC, memo, useCallback, useState } from 'react';
import { Button, TextField } from '../ui';
import s from './AuthForm.module.scss';

export const AuthForm: FC = memo(() => {
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login, loading } = useAuth();

  const onSubmitHandler = async () => {
    email.trim().length === 0 &&
      setEmailError('введите адрес электронной почты');
    password.trim().length === 0 && setPasswordError('введите пароль');

    if (!emailError && !passwordError) {
      login(email.trim(), password.trim()).catch((error) => {
        console.log(error);
        setEmailError('неверный логин или пароль');
        setPasswordError('неверный логин или пароль');
      });
    }
  };

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      emailError && setEmailError(undefined);
      passwordError && setPasswordError(undefined);
    },
    [emailError, passwordError]
  );

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      emailError && setEmailError(undefined);
      passwordError && setPasswordError(undefined);
    },
    [emailError, passwordError]
  );

  return (
    <form
      className={s.form}
      onSubmit={(e) => {
        e.preventDefault();
        void onSubmitHandler();
      }}
    >
      <div className={s.container}>
        <span className={s.text}>Войдите в свой аккаунт</span>
      </div>
      <div className={s.fields}>
        <TextField
          label="Адрес электронной почты"
          type="email"
          name="email"
          required
          errorText={emailError}
          value={email}
          onChange={onChangeEmail}
        />
        <TextField
          label="Пароль"
          type="password"
          name="password"
          required
          errorText={passwordError}
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <Button type="submit" disabled={loading}>
        Продолжить
      </Button>
      <div className={s.container}>
        <span className={s.text2}>Не удается войти в систему?</span>
      </div>
    </form>
  );
});
AuthForm.displayName = 'AuthForm';
