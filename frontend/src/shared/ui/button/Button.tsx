import "./button.css";

interface ButtonProps {
    text?: string; // текст кнопки
    icon?: React.ReactNode; // иконка из библиотеки
    onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, icon, onClick }) => {
    const isIconButton = !!icon && !text;

    return (
        <button
            className={`btn ${isIconButton ? "btn-icon" : "btn-text"}`}
            onClick={onClick}
        >
            {icon}
            {text}
        </button>
    );
};