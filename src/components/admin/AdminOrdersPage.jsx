'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const statusOptions = ['pending', 'processing', 'completed', 'cancelled'];

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loadingOrderId, setLoadingOrderId] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders');
            const data = await res.json();
            setOrders(data);
        } catch (err) {
            console.error('Failed to load orders:', err);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        setLoadingOrderId(orderId);
        try {
            const res = await fetch(`/api/orders/${orderId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newStatus }),
            });

            if (!res.ok) throw new Error('Failed to update status');
            const updatedOrder = await res.json();

            setOrders((prev) =>
                prev.map((order) =>
                    order.id === orderId ? { ...order, status: updatedOrder.status } : order
                )
            );
        } catch (err) {
            console.error(err);
            alert('Failed to update status');
        } finally {
            setLoadingOrderId(null);
        }
    };

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow">
                    <thead className="bg-gray-100">
                    <tr className="text-left text-sm font-medium text-gray-700">
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">Customer</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Phone</th>
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3">Advance</th>
                        <th className="px-4 py-3">Proof</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Date</th>
                    </tr>
                    </thead>
                    <tbody className="text-sm text-gray-600">
                    {orders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                            <td className="px-4 py-3">{order.id}</td>
                            <td className="px-4 py-3">{order.customerName}</td>
                            <td className="px-4 py-3">{order.customerEmail}</td>
                            <td className="px-4 py-3">{order.phone}</td>
                            <td className="px-4 py-3">{order.product?.name}</td>
                            <td className="px-4 py-3">Rs. {order.advanceAmount}</td>
                            <td className="px-4 py-3">
                                <a href={order.proofImage} target="_blank" rel="noreferrer">
                                    <Image
                                        src={order.proofImage}
                                        alt="Proof"
                                        width={50}
                                        height={50}
                                        className="rounded object-cover"
                                    />
                                </a>
                            </td>
                            <td className="px-4 py-3 capitalize">
                                <select
                                    className="border px-2 py-1 rounded text-sm"
                                    value={order.status}
                                    onChange={(e) =>
                                        handleStatusChange(order.id, e.target.value)
                                    }
                                    disabled={loadingOrderId === order.id}
                                >
                                    {statusOptions.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className="px-4 py-3">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                    {orders.length === 0 && (
                        <tr>
                            <td colSpan="9" className="px-4 py-8 text-center text-gray-400">
                                No orders found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
