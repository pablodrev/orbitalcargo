import React, { useRef, useState } from "react";
import { Input } from "../input";
import { Button } from "../button";
import "./cargolist.css";

interface Cargo {
    name: string;
    weight: string;
    size: string;
}

export const CargoList: React.FC = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const weightRef = useRef<HTMLInputElement>(null);
    const sizeRef = useRef<HTMLInputElement>(null);

    const [cargos, setCargos] = useState<Cargo[]>([]);

    const addCargo = () => {
        const name = nameRef.current?.value.trim() || "";
        const weight = weightRef.current?.value.trim() || "";
        const size = sizeRef.current?.value.trim() || "";

        if (!name || !weight || !size) return;

        setCargos((prev) => [...prev, { name, weight, size }]);

        if (nameRef.current) nameRef.current.value = "";
        if (weightRef.current) weightRef.current.value = "";
        if (sizeRef.current) sizeRef.current.value = "";
    };

    const removeCargo = (index: number) => {
        setCargos((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="cargo-wrapper">
            <div className="cargo-header">
                <div className="cargo-input">
                    <Input label="Название" ref={nameRef} />
                </div>
                <div className="cargo-input">
                    <Input label="Вес" ref={weightRef} />
                </div>
                <div className="cargo-input">
                    <Input label="Размер" ref={sizeRef} />
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
