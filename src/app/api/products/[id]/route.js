import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET product by ID
export async function GET(_, { params }) {
    const product = await prisma.product.findUnique({
        where: { id: parseInt(params.id) },
        include: { category: true },
    });

    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(product);
}

// UPDATE product
export async function PUT(req, { params }) {
    const body = await req.json();
    const { name, price, image, categoryId, description } = body;

    const updated = await prisma.product.update({
        where: { id: parseInt(params.id) },
        data: {
            name,
            price: parseFloat(price),
            image,
            categoryId: categoryId ? parseInt(categoryId) : undefined,
            description, // 👈 update description too
        },
    });

    return NextResponse.json(updated);
}


// DELETE product
export async function DELETE(_, { params }) {
    await prisma.product.delete({
        where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ success: true });
}
