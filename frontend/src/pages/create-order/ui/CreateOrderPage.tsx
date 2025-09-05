import React, { useEffect } from "react";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CreateOrderPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { sender, phoneNumber, direction, loading, error } = useAppSelector(
        (state) => state.order
    );

    const directions = [
        { value: "To Orbit", label: "На орбиту" },
        { value: "To Earth", label: "На Землю" },
    ] as const;
    type Direction = typeof directions[number]["value"];

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
    }, [error]);

    const handleSubmit = () => {
        dispatch(createOrder()).then((action) => {
            if (createOrder.fulfilled.match(action)) {
                toast.success("Заказ успешно создан!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });
            }
            // No changes needed here, as no alert is present in handleSubmit
        });
    };

    // Rest of the code remains unchanged
    return (
        <div className="create-order">
            <ToastContainer />
            <h2>Создание заказа</h2>

            <div className="form-row">
                <Input
                    label="Отправитель"
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