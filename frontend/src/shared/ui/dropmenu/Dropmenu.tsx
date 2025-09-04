import "./dropmenu.css";

interface DropmenuProps<T extends string> {
    label: string;
    options: readonly T[];
    value: T | "";
    onChange: (value: T | "") => void;
    placeholder?: string;
    disabled?: boolean;
}

export function Dropmenu<T extends string>({
                                               label,
                                               options,
                                               value,
                                               onChange,
                                               placeholder,
                                               disabled = false,
                                           }: DropmenuProps<T>) {
    return (
        <div className="dropmenu-wrapper">
            <label className="dropmenu-label">{label}</label>
            <select
                className="dropmenu-field"
                value={value}
                onChange={(e) => onChange(e.target.value as T | "")}
                disabled={disabled}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}