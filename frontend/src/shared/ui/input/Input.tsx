import { forwardRef } from "react";
import "./input.css";

interface InputProps {
    label: string;
    type?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, type = "text" }, ref) => {
        return (
            <div className="input-wrapper">
                <label className="input-label">{label}</label>
                <input ref={ref} className="input-field" type={type} />
            </div>
        );
    }
);

Input.displayName = "Input"; // чтобы не было warning в React DevTools
