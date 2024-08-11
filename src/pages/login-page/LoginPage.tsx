import { AuthForm } from '@/components';
import { memo } from 'react';
import s from './LoginPage.module.scss';

export const LoginPage = memo(() => {
  return (
    <div className={s.loginPage}>
      <div>
        <img src="/a-core/logo.png" alt="logo" />
      </div>
      <AuthForm />
    </div>
  );
});

LoginPage.displayName = 'LoginPage';
