import { forwardRef } from "react";
import "./input.css";
import React from "react";

interface InputProps {
    label: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean; // Add disabled prop
}
export const Input: React.FC<InputProps> = ({ label, type = "text", value, onChange, disabled = false }) => {
    return (
        <div className="input-wrapper">
            <label className="input-label">{label}</label>
            <input
                className="input-field"
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
};
