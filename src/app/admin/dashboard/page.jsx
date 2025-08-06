'use client';

import { useState } from 'react';
import AdminLogoutButton from '@/components/admin/AdminLogoutButton';
import AdminProductsPage from '@/app/admin/products/page';
import CategoryForm from '@/components/admin/CategoryForm';
import AdminOrdersPage from '@/components/admin/AdminOrdersPage';

export default function AdminDashboard() {
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [activeTab, setActiveTab] = useState('products');

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                    <nav className="space-y-4">
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`w-full text-left px-4 py-2 rounded ${
                                activeTab === 'products'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            Products
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`w-full text-left px-4 py-2 rounded ${
                                activeTab === 'orders'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            Orders
                        </button>
                        <button
                            onClick={() => setShowAddCategory(true)}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                        >
                            Add Category
                        </button>
                    </nav>
                </div>

                <div className="mt-10">
                    <AdminLogoutButton />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                {activeTab === 'products' && <AdminProductsPage />}
                {activeTab === 'orders' && <AdminOrdersPage />}

                {showAddCategory && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                            <CategoryForm
                                onSave={() => setShowAddCategory(false)}
                                onClose={() => setShowAddCategory(false)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
