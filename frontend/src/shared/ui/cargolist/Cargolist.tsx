import React, { useState } from "react";
import { useAppSelector } from "../../../hooks/rootState.ts";
import { useAppDispatch } from "../../../hooks/dispatch.ts";
import type { Cargo } from "../../../features/order/model/orderSlice.ts"; // Use type-only import
import {
    addCargo,
    removeCargo,
} from "../../../features/order/model/orderSlice.ts"; // Removed updateCargo
import { Input } from "../input";
import { Button } from "../button";
import { Dropmenu } from "../dropmenu";
import { toast, ToastContainer } from "react-toastify";
import "./cargolist.css";
import "react-toastify/dist/ReactToastify.css";

export const CargoList: React.FC = () => {
    const dispatch = useAppDispatch();
    const cargos = useAppSelector((state) => state.order.cargos);

    // Options for size enum with Russian labels
    const sizes = [
        { value: "Small", label: "Маленький" },
        { value: "Medium", label: "Средний" },
        { value: "Large", label: "Большой" },
    ] as const;
    type CargoSize = typeof sizes[number]["value"];

    // State for adding new cargo
    const [newName, setNewName] = useState<string>("");
    const [newSize, setNewSize] = useState<CargoSize | "">(""); // Allow "" for placeholder
    const [newWeight, setNewWeight] = useState<string>(""); // String for input, convert to number

    const handleAddCargo = () => {
        const weightNum = parseFloat(newWeight);
        if (!newName.trim() || !newSize || isNaN(weightNum) || weightNum <= 0) {
            toast.error("Заполните все поля для нового груза (вес должен быть числом > 0)", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            return;
        }
        const newCargo: Cargo = {
            name: newName,
            size: newSize as CargoSize, // Safe cast since we check !newSize
            weight: weightNum,
        };
        dispatch(addCargo(newCargo));
        setNewName("");
        setNewSize("");
        setNewWeight("");
    };

    const handleRemoveCargo = (index: number) => {
        dispatch(removeCargo(index));
    };

    return (
        <div className="cargo-wrapper">
            <ToastContainer />
            <div className="cargo-header">
                <div className="cargo-input">
                    <Input
                        label="Название"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </div>
                <div className="cargo-input">
                    <Input
                        label="Вес"
                        type="number"
                        value={newWeight}
                        onChange={(e) => setNewWeight(e.target.value)}
                    />
                </div>
                <div className="cargo-input">
                    <Dropmenu<CargoSize>
                        label="Размер"
                        options={sizes}
                        value={newSize}
                        onChange={(val) => setNewSize(val)}
                        placeholder="Выберите размер"
                    />
                </div>
                <Button icon={<span>＋</span>} onClick={handleAddCargo} />
            </div>

            <div className="cargo-list">
                {cargos.length === 0 ? (
                    <p>Нет грузов. Добавьте новый.</p>
                ) : (
                    cargos.map((cargo, index) => (
                        <div key={index} className="cargo-item">
                            <div className="cargo-info">
                                <span>{cargo.name}</span>
                                <span>{cargo.weight} кг</span>
                                <span>{cargo.size}</span>
                                <Button
                                    icon={<span>✕</span>}
                                    onClick={() => handleRemoveCargo(index)}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};