import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import orbitlogo from '../../../assets/icons/orbitlogo.png';
import { useAppSelector } from '../../../hooks/rootState.ts';
import {Button} from "../button";
import {logout} from "../../../features/auth/model/authSlice.ts";
import {useAppDispatch} from "../../../hooks/dispatch.ts";
import {useNavigate} from "react-router";

const Header: React.FC = () => {
  const { isAuth, role } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth')
  }

  const renderNavLinks = () => {
    if (!isAuth || !role) {
      return (
        <>
          <Link to="/auth" className="nav-link">Войти</Link>
          <Link to="/" className="nav-link">Главная</Link>
        </>
      );
    }

    switch (role) {
      case 'operator':
        return (
          <>
            <Link to="/operator/dashboard" className="nav-link">Админ-панель</Link>
          </>
        );
      case 'manager':
        return (
          <>
            <Link to="/manager/createOrder" className="nav-link">Создать заявку</Link>
            <Link to="/manager/orders" className="nav-link">Заявки</Link>
          </>
        );
      default:
        return (
          <>
            <Link to="/auth" className="nav-link">Войти</Link>
            <Link to="/" className="nav-link">Главная</Link>
          </>
        );
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={orbitlogo} alt="orbitlogo" />
      </div>
      <nav className="nav">
        {renderNavLinks()}
      </nav>
      <div className="role">
        {role ? `Роль: ${role}` : 'Не авторизован'}
      </div>
      { isAuth && (
        <Button text={'Выход'} onClick={handleLogout} />
      )}
    </header>
  );
};

export default Header;