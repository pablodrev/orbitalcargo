import React from 'react';
import './Header.css';
import {Link} from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="title">Мое приложение</h1>
      <nav className="nav">
        <Link to="/auth">Войти</Link>
        <a href="/" className="nav-link">Главная</a>
      </nav>
    </header>
  );
};

export default Header;