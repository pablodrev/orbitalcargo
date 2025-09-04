import "./OrderDetails.scss";
import { useState } from "react";
import { CargoDetails } from "../../cargo-details";
import { Input } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";

interface Cargo {
    id: string;
    public_id: string;
    status: "pending" | "assigned" | "in_transit" | "delivered" | "cancelled";
    position: "ground" | "orbit";
    weight_kg: number;
    size: string;
    created_at: string;
    updated_at: string;
}

interface OrderDetailsProps {
    onBack: () => void;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ onBack }) => {
    const [cargos, setCargos] = useState<Cargo[]>([
        {
            id: "1",
            public_id: "CARGO-001",
            status: "pending",
            position: "ground",
            weight_kg: 100,
            size: "1x1x1 м",
            created_at: "2025-09-01T10:00:00Z",
            updated_at: "2025-09-01T10:00:00Z",
        },
        {
            id: "2",
            public_id: "CARGO-002",
            status: "pending",
            position: "ground",
            weight_kg: 250,
            size: "2x1x1 м",
            created_at: "2025-09-01T10:00:00Z",
            updated_at: "2025-09-01T10:00:00Z",
        },
        {
            id: "3",
            public_id: "CARGO-003",
            status: "pending",
            position: "ground",
            weight_kg: 500,
            size: "3x2x1 м",
            created_at: "2025-09-01T10:00:00Z",
            updated_at: "2025-09-01T10:00:00Z",
        },
    ]);

    const [selectedCargo, setSelectedCargo] = useState<Cargo | null>(null);

    const [newPublicId, setNewPublicId] = useState("");
    const [newWeight, setNewWeight] = useState("");
    const [newSize, setNewSize] = useState("");

    const addCargo = () => {
        if (!newPublicId.trim() || !newWeight.trim() || !newSize.trim()) return;

        const newCargo: Cargo = {
            id: cargos.length ? (parseInt(cargos[cargos.length - 1].id) + 1).toString() : "1",
            public_id: newPublicId,
            status: "pending",
            position: "ground",
            weight_kg: parseFloat(newWeight),
            size: newSize,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        setCargos([...cargos, newCargo]);
        setNewPublicId("");
        setNewWeight("");
        setNewSize("");
    };

    const removeCargo = (id: string) => {
        setCargos((prev) => prev.filter((cargo) => cargo.id !== id));
    };

    if (selectedCargo) {
        return (
            <CargoDetails
                cargo={selectedCargo}
                onBack={() => setSelectedCargo(null)}
            />
        );
    }

    return (
        <div className="order-details-container">
            <div className="order-details-header">
                Заказ №69 компании SpaceX от 14.08.2008
                <Button text="Назад" onClick={onBack} />
            </div>

            <div className="order-details-body">
                <div className="order-details-first">
                    <span>Номер груза</span>
                    <span>Вес</span>
                    <span>Объем</span>
                    <span>Подробнее</span>
                    <span>Удалить</span>
                </div>

                <div className="order-details-list">
                    {cargos.map((cargo) => (
                        <div key={cargo.id} className="order-details-row">
                            <span>{cargo.public_id}</span>
                            <span>{cargo.weight_kg} кг</span>
                            <span>{cargo.size}</span>
                            <button
                                className="order-details-link"
                                onClick={() => setSelectedCargo(cargo)}
                            >
                                Подробнее
                            </button>
                            <Button text="✕" onClick={() => removeCargo(cargo.id)} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="order-details-footer">
                <Input
                    label="Public ID"
                    value={newPublicId}
                    onChange={(e) => setNewPublicId(e.target.value)}
                />
                <Input
                    label="Вес (кг)"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                />
                <Input
                    label="Размер"
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                />
                <Button text="Добавить груз" onClick={addCargo} />
            </div>
        </div>
    );
};