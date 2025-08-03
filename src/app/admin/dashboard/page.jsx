'use client';

import { useState } from 'react';
import AdminLogoutButton from '@/components/admin/AdminLogoutButton';
import AdminProductsPage from '@/app/admin/products/page';
import CategoryForm from '@/components/admin/CategoryForm';

export default function AdminDashboard() {
    const [showAddCategory, setShowAddCategory] = useState(false);

    return (
        <div className="p-10">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Welcome, Admin</h1>
                <AdminLogoutButton />
            </div>

            <AdminProductsPage />

            <button
                onClick={() => setShowAddCategory(true)}
                className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
            >
                Add Category
            </button>

            {showAddCategory && (
                <CategoryForm
                    onSave={() => {
                        setShowAddCategory(false);
                        // optionally refresh category list here
                    }}
                    onClose={() => setShowAddCategory(false)}
                />
            )}
        </div>
    );
}
