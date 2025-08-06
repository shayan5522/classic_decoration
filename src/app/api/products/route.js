import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET all products or filter by category
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryName = searchParams.get('category'); // ?category=Gift Boxes

        let whereCondition = undefined;
        if (categoryName) {
            whereCondition = {
                category: {
                    name: {
                        equals: categoryName,
                        mode: 'insensitive',
                    },
                },
            };
        }

        const products = await prisma.product.findMany({
            where: whereCondition,
            include: { category: true },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error('GET /api/products error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products.' },
            { status: 500 }
        );
    }
}

// POST a new product
export async function POST(req) {
    try {
        const body = await req.json();
        const { name, price, image, description, categoryId } = body;

        // Validate required fields
        if (!name || !price || !categoryId) {
            return NextResponse.json(
                { error: 'Name, price, and categoryId are required.' },
                { status: 400 }
            );
        }

        // Ensure category exists
        const category = await prisma.category.findUnique({
            where: { id: parseInt(categoryId) },
        });

        if (!category) {
            return NextResponse.json(
                { error: 'Invalid categoryId. Category not found.' },
                { status: 400 }
            );
        }

        // Create the product
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
