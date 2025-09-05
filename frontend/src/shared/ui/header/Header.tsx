import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom'; // Заменяем Link на NavLink
import orbitlogo from '../../../assets/icons/orbitlogo.png';
import { useAppSelector } from '../../../hooks/rootState.ts';
import { Button } from '../button';
import { logout } from '../../../features/auth/model/authSlice.ts';
import { useAppDispatch } from '../../../hooks/dispatch.ts';
import { useNavigate } from 'react-router';

const Header: React.FC = () => {
  const { isAuth, role } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  const renderNavLinks = () => {
    if (!isAuth || !role) {
      return (
        <>
          <NavLink to="/auth" className="nav-link">
            Войти
          </NavLink>
          <NavLink to="/" className="nav-link">
            Главная
          </NavLink>
        </>
      );
    }

    switch (role) {
      case 'operator':
        return (
          <>
            <NavLink to="/operator/dashboard" className="nav-link">
              Админ-панель
            </NavLink>
          </>
        );
      case 'manager':
        return (
          <>
            <NavLink to="/manager/createOrder" className="nav-link">
              Создать заявку
            </NavLink>
            <NavLink to="/manager/orders" className="nav-link">
              Заявки
            </NavLink>
            <NavLink to="/manager/assignCargo" className="nav-link">
              Заполнить лифт
            </NavLink>
          </>
        );
      default:
        return (
          <>
            <NavLink to="/auth" className="nav-link">
              Войти
            </NavLink>
            <NavLink to="/" className="nav-link">
              Главная
            </NavLink>
          </>
        );
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={orbitlogo} alt="orbitlogo" />
      </div>
      <nav className="nav">{renderNavLinks()}</nav>
      {isAuth && <Button text={'Выход'} onClick={handleLogout} />}
    </header>
  );
};

export default Header;