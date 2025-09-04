// src/shared/ui/cargolist/CargoList.tsx
import React, { useState } from "react";
import { useAppSelector } from "../../../hooks/rootState.ts";
import { useAppDispatch } from "../../../hooks/dispatch.ts";
import type { Cargo, CargoSize } from "../../../features/order/model/orderSlice.ts" // Use type-only import
import {
    addCargo,
    updateCargo,
    removeCargo,
} from "../../../features/order/model/orderSlice.ts"; // Value imports
import { Input } from "../input";
import { Button } from "../button";
import { Dropmenu } from "../dropmenu";
import "./cargolist.css";

export const CargoList: React.FC = () => {
    const dispatch = useAppDispatch();
    const cargos = useAppSelector((state) => state.order.cargos);

    // Options for size enum as per API schema
    const sizes: CargoSize[] = ["Small", "Medium", "Large"];

    // State for adding new cargo
    const [newName, setNewName] = useState<string>("");
    const [newSize, setNewSize] = useState<CargoSize | "">(""); // Allow "" for placeholder
    const [newWeight, setNewWeight] = useState<string>(""); // String for input, convert to number

    // State for editing existing cargo
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingName, setEditingName] = useState<string>("");
    const [editingSize, setEditingSize] = useState<CargoSize | "">(""); // Allow "" for placeholder
    const [editingWeight, setEditingWeight] = useState<string>("");

    const handleAddCargo = () => {
        const weightNum = parseFloat(newWeight);
        if (!newName.trim() || !newSize || isNaN(weightNum) || weightNum <= 0) {
            alert("Заполните все поля для нового груза (вес должен быть числом > 0)");
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

    const startEditing = (index: number) => {
        const cargo = cargos[index];
        setEditingIndex(index);
        setEditingName(cargo.name);
        setEditingSize(cargo.size);
        setEditingWeight(cargo.weight.toString());
    };

    const handleUpdateCargo = () => {
        if (editingIndex === null) return;
        const weightNum = parseFloat(editingWeight);
        if (!editingName.trim() || !editingSize || isNaN(weightNum) || weightNum <= 0) {
            alert("Заполните все поля для обновления груза (вес должен быть числом > 0)");
            return;
        }
        const updatedCargo: Cargo = {
            name: editingName,
            size: editingSize as CargoSize, // Safe cast since we check !editingSize
            weight: weightNum,
        };
        dispatch(updateCargo({ index: editingIndex, cargo: updatedCargo }));
        setEditingIndex(null);
        setEditingName("");
        setEditingSize("");
        setEditingWeight("");
    };

    const handleRemoveCargo = (index: number) => {
        dispatch(removeCargo(index));
    };

    return (
        <div className="cargo-wrapper">
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
                            {editingIndex === index ? (
                                <div className="cargo-header">
                                    <div className="cargo-input">
                                        <Input
                                            label="Название"
                                            value={editingName}
                                            onChange={(e) => setEditingName(e.target.value)}
                                        />
                                    </div>
                                    <div className="cargo-input">
                                        <Input
                                            label="Вес"
                                            type="number"
                                            value={editingWeight}
                                            onChange={(e) => setEditingWeight(e.target.value)}
                                        />
                                    </div>
                                    <div className="cargo-input">
                                        <Dropmenu<CargoSize>
                                            label="Размер"
                                            options={sizes}
                                            value={editingSize}
                                            onChange={(val) => setEditingSize(val)}
                                            placeholder="Выберите размер"
                                        />
                                    </div>
                                    <Button text="Сохранить" onClick={handleUpdateCargo} />
                                    <Button
                                        icon={<span>✕</span>}
                                        onClick={() => setEditingIndex(null)}
                                    />
                                </div>
                            ) : (
                                <div className="cargo-info">
                                    <span>{cargo.name}</span>
                                    <span>{cargo.weight} кг</span>
                                    <span>{cargo.size}</span>
                                    <Button text="Редактировать" onClick={() => startEditing(index)} />
                                    <Button
                                        icon={<span>✕</span>}
                                        onClick={() => handleRemoveCargo(index)}
                                    />
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
