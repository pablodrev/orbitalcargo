import React, { useState } from "react";
import './CreateOrderPage.scss';
import {Input} from "../../../shared/ui/input";
import {Button} from "../../../shared/ui/button";
import {Dropmenu} from "../../../shared/ui/dropmenu";
import {CargoList} from "../../../shared/ui/cargolist";

export const CreateOrderPage: React.FC = () => {
    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [phone, setPhone] = useState("");
    const [direction, setDirection] = useState("");

    const directions = ["С Земли", "На Землю"]; // пример

    const handleSubmit = () => {
        // обработка отправки формы
        console.log({ surname, name, patronymic, phone, direction });
        alert("Заявка отправлена!");
    };

    return (
        <div className="create-order">
            <h2>Создание заказа</h2>

            <div className="form-row">
                <Input label="Фамилия" value={surname} onChange={(e) => setSurname(e.target.value)} />
                <Input label="Имя" value={name} onChange={(e) => setName(e.target.value)} />
                <Input label="Отчество" value={patronymic} onChange={(e) => setPatronymic(e.target.value)} />
            </div>

            <div className="form-row">
                <Input label="Номер телефона" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <Dropmenu
                    label="Направление"
                    options={directions}
                    value={direction}
                    onChange={setDirection}
                />
            </div>

            <div className="cargo-section">
                <CargoList />
            </div>

            <div className="form-actions">
                <Button text="Отправить заявку" onClick={handleSubmit} />
            </div>
        </div>
    );
};
