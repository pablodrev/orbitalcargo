import React, { forwardRef } from "react";
import "./input.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, type = "text", ...props }, ref) => {
        return (
            <div className="input-wrapper">
                <label className="input-label">{label}</label>
                <input ref={ref} type={type} className="input-field" {...props} />
            </div>
        );
    }
);

Input.displayName = "Input"; // чтобы не было warning в React DevTools
