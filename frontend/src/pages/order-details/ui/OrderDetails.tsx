import React from "react";
import "./OrderDetails.scss";
import { Button } from "../../../shared/ui/button";

interface Cargo {
    id: number;
    name: string;
    size: "Small" | "Medium" | "Large";
    weight: number;
    order_id: number;
}

interface Order {
    id: number;
    direction: "To Orbit" | "To Earth";
    sender: string;
    phoneNumber: string;
    status: string;
    cargos: Cargo[];
}

interface OrderDetailsProps {
    order: Order;
    onBack: () => void;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onBack }) => {
    return (
        <div className="order-details-container">
            <div className="order-details-header">
                <h2>Детали заказа №{order.id}</h2>
                <Button text="Назад" onClick={onBack} />
            </div>

            <div className="order-details-body">
                <div className="order-details-info">
                    <p><strong>Направление:</strong> {order.direction}</p>
                    <p><strong>Отправитель:</strong> {order.sender}</p>
                    <p><strong>Номер телефона:</strong> {order.phoneNumber}</p>
                    <p><strong>Статус:</strong> {order.status}</p>
                </div>

                <h3>Грузы</h3>
                <div className="order-details-cargos">
                    <div className="order-details-cargos-header">
                        <span>Название</span>
                        <span>Размер</span>
                        <span>Вес (кг)</span>
                    </div>
                    {order.cargos.length > 0 ? (
                        order.cargos.map((cargo) => (
                            <div key={cargo.id} className="order-details-cargo-row">
                                <span>{cargo.name}</span>
                                <span>{cargo.size}</span>
                                <span>{cargo.weight}</span>
                            </div>
                        ))
                    ) : (
                        <p>Грузы отсутствуют</p>
                    )}
                </div>
            </div>
        </div>
    );
};