import "./input.css";

interface InputProps {
    label: string;
    type?: string;
}

export const Input: React.FC<InputProps> = ({ label, type = "text" }) => {
    return (
        <div className="input-wrapper">
            <label className="input-label">{label}</label>
            <input className="input-field" type={type} />
        </div>
    );
};