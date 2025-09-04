import {Input} from "../../../shared/ui/input";
import './AuthPage.scss';
import {Button} from "../../../shared/ui/button";
import {useAppDispatch} from "../../../hooks/dispatch.ts";
import React, {useState} from "react";
import {useAppSelector} from "../../../hooks/rootState.ts";
import { login } from '../../../features/auth/model/authSlice.ts';

export const AuthPage = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  }

  return (
    <form className="auth-page-content" onSubmit={handleSubmit}>
      <div className="auth-page-content__header">Выполните вход</div>
      <Input
        label={'Логин'}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label={'Пароль'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="auth-page-content__button">
        <Button text={loading ? 'Отправка...' : 'Войти'} />
      </div>
    </form>
  );
};