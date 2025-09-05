import React from 'react';
import './Footer.css';
import orbitlogo from "../../../assets/icons/orbitlogo.png";
import tpu from "../../../assets/icons/tpu.png";
import ishitr from "../../../assets/icons/ishitr.png";
import dog from "../../../assets/icons/dog.png";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p className="text">
        &copy; 2025 <div className="logo">
        <img src={orbitlogo} alt="orbitlogo"/>
      </div> by BAD-BANANAS.
      </p>
      <div className="logos">
        <div className="logo">
          <img src={tpu} alt="tpu"/>
        </div>
        <div className="logo">
          <img src={ishitr} alt="orbitlogo"/>
        </div>
        <div className="logo">
          <img src={dog} alt="orbitlogo"/>
        </div>
      </div>
    </footer>
  );
};

export default Footer;