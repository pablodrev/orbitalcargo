import "./CargoDetails.scss";
import { useState } from "react";
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

interface CargoDetailsProps {
    cargo?: Cargo;
    onBack: () => void;
}

export const CargoDetails: React.FC<CargoDetailsProps> = ({ cargo, onBack }) => {
    //МОК
    const defaultCargo: Cargo =
        cargo || {
            id: "550e8400-e29b-41d4-a716-446655440000",
            public_id: "CARGO-001",
            status: "pending",
            position: "ground",
            weight_kg: 1200,
            size: "2x2x3 м",
            created_at: "2025-09-01T10:00:00Z",
            updated_at: "2025-09-01T10:00:00Z",
        };

    const [publicId, setPublicId] = useState(defaultCargo.public_id || "");
    const [status, setStatus] = useState(defaultCargo.status || "pending");
    const [position, setPosition] = useState(defaultCargo.position || "ground");
    const [weight, setWeight] = useState(
        defaultCargo.weight_kg ? defaultCargo.weight_kg.toString() : ""
    );
    const [size, setSize] = useState(defaultCargo.size || "");


    const handleSave = () => {
        console.log("Сохраняем изменения:", {
            id: defaultCargo.id,
            publicId,
            status,
            position,
            weight: Number(weight),
            size,
        });
        onBack();
    };

    return (
        <div className="cargo-details">
            <h2>Редактирование груза {defaultCargo.public_id}</h2>

            <Input
                label="Public ID"
                value={publicId}
                onChange={(e) => setPublicId(e.target.value)}
            />

            <div className="input-wrapper">
                <label className="input-label">Статус</label>
                <select
                    className="input-field"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Cargo["status"])}
                >
                    <option value="pending">pending</option>
                    <option value="assigned">assigned</option>
                    <option value="in_transit">in transit</option>
                    <option value="delivered">delivered</option>
                    <option value="cancelled">cancelled</option>
                </select>
            </div>

            <div className="input-wrapper">
                <label className="input-label">Позиция</label>
                <select
                    className="input-field"
                    value={position}
                    onChange={(e) => setPosition(e.target.value as Cargo["position"])}
                >
                    <option value="ground">ground</option>
                    <option value="orbit">orbit</option>
                </select>
            </div>

            <Input
                label="Вес (кг)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            />

            <Input
                label="Размер"
                value={size}
                onChange={(e) => setSize(e.target.value)}
            />

            <div className="cargo-details-actions">
                <Button text="Назад" onClick={onBack} />
                <Button text="Сохранить" onClick={handleSave} />
            </div>
        </div>
    );
};
