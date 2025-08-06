import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET all products or products by category
export async function GET(req, Request) {
    const { searchParams } = new URL(req.url);
    const categoryName = searchParams.get('category');

    const products = await prisma.product.findMany({
        where: categoryName
            ? {
                category: {
                    name: {
                        equals: categoryName,
                        mode: 'insensitive',
                    },
                },
            }
            : undefined,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
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
