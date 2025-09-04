import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p className="text">
        &copy; 2025 Orbitalcargo. <a href="/contact" className="link">Связаться с нами</a>
      </p>
    </footer>
  );
};

export default Footer;