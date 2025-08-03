import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET all products
export async function GET() {
    const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(products);
}

// POST new product
export async function POST(req) {
    try {
        const body = await req.json();
        const { name, price, image, description, categoryId } = body;

        // Validate input
        if (!name || !price || !categoryId) {
            return NextResponse.json(
                { error: 'Name, price, and categoryId are required.' },
                { status: 400 }
            );
        }

        // Check if category exists
        const category = await prisma.category.findUnique({
            where: { id: parseInt(categoryId) },
        });

        if (!category) {
            return NextResponse.json(
                { error: 'Invalid categoryId. Category not found.' },
                { status: 400 }
            );
        }

        // Create product
        const newProduct = await prisma.product.create({
            data: {
                name,
                price: parseFloat(price),
                image,
                description,
                categoryId: parseInt(categoryId),
            },
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error('POST /api/products error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
