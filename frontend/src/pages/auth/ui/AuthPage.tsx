import {Input} from "../../../shared/ui/input";
import './AuthPage.scss';
import {Button} from "../../../shared/ui/button";
export const AuthPage = () => {
  return (
    <div className="auth-page-content">
      <h1 className="auth-page-content__header">Выполните вход</h1>
      <Input label={'Логин'} />
      <Input label={'Пароль'} />
      <Button text={"Войти"} />
    </div>
  );
};