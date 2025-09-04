import React, { useState } from "react";
import { Input } from "../input";
import { Button } from "../button";
import "./cargolist.css";

interface Cargo {
    name: string;
    weight: string;
    size: string;
}

export const CargoList: React.FC = () => {
    const [name, setName] = useState("");
    const [weight, setWeight] = useState("");
    const [size, setSize] = useState("");
    const [cargos, setCargos] = useState<Cargo[]>([]);

    const addCargo = () => {
        if (!name.trim() || !weight.trim() || !size.trim()) return;

        setCargos((prev) => [...prev, { name, weight, size }]);
        setName("");
        setWeight("");
        setSize("");
    };

    const removeCargo = (index: number) => {
        setCargos((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="cargo-wrapper">
            <div className="cargo-header">
                <div className="cargo-input">
                    <Input label="Название" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="cargo-input">
                    <Input label="Вес" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
                <div className="cargo-input">
                    <Input label="Размер" value={size} onChange={(e) => setSize(e.target.value)} />
                </div>
                <Button icon={<span>＋</span>} onClick={addCargo} />
            </div>

            <div className="cargo-list">
                {cargos.map((cargo, index) => (
                    <div key={index} className="cargo-item">
                        <div className="cargo-info">
                            <span>{cargo.name}</span>
                            <span>{cargo.weight}</span>
                            <span>{cargo.size}</span>
                        </div>
                        <Button
                            icon={<span>✕</span>} // позже заменишь на иконку
                            onClick={() => removeCargo(index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
