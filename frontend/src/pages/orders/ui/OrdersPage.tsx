import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../../../shared/ui/button';
import { OrderDetails } from '../../order-details'; // Adjust path as needed
import './OrdersPage.scss';

interface Order {
    id: number;
    direction: 'up' | 'down';
    status: string;
}

export const OrdersPage: React.FC = () => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const orders: Order[] = [
        { id: 1001, direction: 'up', status: 'Shipped' },
        { id: 1002, direction: 'down', status: 'Pending' },
        { id: 1003, direction: 'up', status: 'Delivered' },
    ];

    if (selectedOrder) {
        return (
            <OrderDetails onBack={() => setSelectedOrder(null)} />
        );
    }

    return (
        <div className="ordersContainer">
            <h1 className="title">Ваши заказы</h1>
            <ul className="orderList">
                {orders.map((order) => (
                    <li key={order.id} className="orderItem">
                        <span>{order.id}</span>
                        <span>{order.direction}</span>
                        <span>{order.status}</span>
                        <Button
                            text="more..."
                            onClick={() => setSelectedOrder(order)}
                        />
                    </li>
                ))}
            </ul>
            <NavLink to="/" className="backButton">
                Назад
            </NavLink>
        </div>
    );
};

export default OrdersPage;