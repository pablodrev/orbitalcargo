import "./input.css";
import React from "react";

interface InputProps {
  label: string;
  type?: string;
  value?: string;
  onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({ label, type = "text", value, onChange }) => {
  return (
    <div className="input-wrapper">
      <label className="input-label">{label}</label>
      <input
        className="input-field"
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};