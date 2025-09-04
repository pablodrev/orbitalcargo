import "./button.css";
import React from "react";

interface ButtonProps {
    text?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean; // Add disabled prop
}

export const Button: React.FC<ButtonProps> = ({ text, icon, onClick, disabled = false }) => {
    const isIconButton = !!icon && !text;

    return (
        <button
            className={`btn ${isIconButton ? "btn-icon" : "btn-text"}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon}
            {text}
        </button>
    );
};