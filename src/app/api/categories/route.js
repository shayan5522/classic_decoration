import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET all categories
export async function GET() {
    const categories = await prisma.category.findMany({
        orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(categories);
}

// POST a new category
export async function POST(req) {
    const body = await req.json();
    const { name } = body;

    if (!name) {
        return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }

    const exists = await prisma.category.findUnique({ where: { name } });
    if (exists) {
        return NextResponse.json({ error: 'Category already exists.' }, { status: 400 });
    }

    const newCategory = await prisma.category.create({
        data: { name },
    });

    return NextResponse.json(newCategory, { status: 201 });
}
