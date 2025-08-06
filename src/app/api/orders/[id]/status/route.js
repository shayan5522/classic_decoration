import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params }) {
    const { id } = params;
    const { newStatus } = await req.json();

    if (!newStatus) {
        return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    try {
        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { status: newStatus },
        });

        return NextResponse.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order status:', error);
        return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
    }
}
