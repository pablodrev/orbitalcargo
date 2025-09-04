import React from 'react';
import './Header.css';
import {Link} from "react-router-dom";
import orbitlogo from '../../../assets/icons/orbitlogo.png';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="logo">
        <img src={orbitlogo} alt="orbitlogo" />
      </h1>
      <nav className="nav">
        <Link to="/auth">Войти</Link>
        <a href="/" className="nav-link">Главная</a>
      </nav>
      <div className="role">
        Роль пользователя
      </div>
    </header>
  );
};

export default Header;