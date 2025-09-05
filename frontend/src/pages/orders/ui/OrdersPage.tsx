import React, { useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
import { Button } from '../../../shared/ui/button';
import { OrderDetails } from '../../order-details'; // Adjust path as needed
import { useAppSelector } from '../../../hooks/rootState';
import { useAppDispatch } from '../../../hooks/dispatch';
import { fetchOrders } from '../../../features/orders/model/getOrdersSlice';
import './OrdersPage.scss';

interface Order {
    id: number;
    direction: 'To Orbit' | 'To Earth';
    sender: string;
    phoneNumber: string;
    status: string;
    cargos: { id: number; name: string; size: "Small" | "Medium" | "Large"; weight: number; order_id: number }[];
}

export const OrdersPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { orders, loading } = useAppSelector((state) => state.orders);
    const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    if (selectedOrder) {
        return (
            <OrderDetails
                order={selectedOrder}
                onBack={() => setSelectedOrder(null)}
            />
        );
    }

    return (
        <div className="ordersContainer">
            <h1 className="title">Ваши заказы</h1>
            {loading ? (
                <div>Загрузка...</div>
            ) : (
                <ul className="orderList">
                    {orders.map((order) => (
                        <li key={order.id} className="orderItem">
                            <span>Заказ #{order.id}</span>
                            <span>{order.direction}</span>
                            <span>{order.status}</span>
                            <Button
                                text="Подробнее..."
                                onClick={() => setSelectedOrder(order)}
                                disabled={loading}
                            />
                        </li>
                    ))}
                </ul>
            )}
            {/*<NavLink to="/" className="backButton">*/}
            {/*    Назад*/}
            {/*</NavLink>*/}
        </div>
    );
};

export default OrdersPage;