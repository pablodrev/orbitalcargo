import './dropmenu.css'

interface DropmenuProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

export const Dropmenu: React.FC<DropmenuProps> = ({ label, options, value, onChange }) => {
    return (
        <div className="dropmenu-wrapper">
            <label className="dropmenu-label">{label}</label>
            <select
                className="dropmenu-field"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((opt, idx) => (
                    <option key={idx} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
};