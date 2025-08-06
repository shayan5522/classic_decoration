import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

function slugify(name) {
    return name.toLowerCase().replace(/\s+/g, '-');
}

// GET all categories
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(categories);
    } catch (error) {
        console.error('❌ Error fetching categories:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST a new category
export async function POST(req) {
    try {
        const body = await req.json();
        const { name } = body;

        if (!name) {
            return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
        }

        const slug = slugify(name);

        const exists = await prisma.category.findFirst({
            where: { OR: [{ name }, { slug }] },
        });

        if (exists) {
            return NextResponse.json({ error: 'Category already exists.' }, { status: 400 });
        }

        const newCategory = await prisma.category.create({
            data: { name, slug },
        });

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        console.error('❌ Error creating category:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
