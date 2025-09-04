import React from "react";
import "./CreateOrderPage.scss";
import { Input } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";
import { Dropmenu } from "../../../shared/ui/dropmenu";
import { CargoList } from "../../../shared/ui/cargolist";
import { useAppSelector } from "../../../hooks/rootState";
import { useAppDispatch } from "../../../hooks/dispatch";
import {
    setSender,
    setPhoneNumber,
    setDirection,
    createOrder,
} from "../../../features/order/model/orderSlice";

export const CreateOrderPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { sender, phoneNumber, direction, loading, error } = useAppSelector(
        (state) => state.order
    );

    const directions = ["To Orbit", "To Earth"] as const;
    type Direction = typeof directions[number];

    const handleSubmit = () => {
        dispatch(createOrder());
    };

    return (
        <div className="create-order">
            <h2>Создание заказа</h2>

            {error && (
                <div className="error-message" style={{ color: "red", marginBottom: "10px" }}>
                    {error}
                </div>
            )}

            <div className="form-row">
                <Input
                    label="Sender"
                    value={sender}
                    onChange={(e) => dispatch(setSender(e.target.value))}
                    disabled={loading}
                />
            </div>

            <div className="form-row">
                <Input
                    label="Номер телефона"
                    value={phoneNumber}
                    onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
                    disabled={loading}
                />
                <Dropmenu<Direction>
                    label="Направление"
                    options={directions}
                    value={direction as Direction | ""}
                    onChange={(val) => dispatch(setDirection(val))}
                    placeholder="Выберите направление"
                    disabled={loading}
                />
            </div>

            <div className="cargo-section">
                <CargoList />
            </div>

            <div className="form-actions">
                <Button
                    text={loading ? "Отправка..." : "Отправить заявку"}
                    onClick={handleSubmit}
                    disabled={loading}
                />
            </div>
        </div>
    );
};