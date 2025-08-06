import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';

export async function POST(req) {
    try {
        const formData = await req.formData();

        const customerName = formData.get('customerName');
        const customerEmail = formData.get('customerEmail');
        const phone = formData.get('phone');
        const productId = parseInt(formData.get('productId'));
        const advanceAmount = parseFloat(formData.get('advanceAmount'));
        const proofImage = formData.get('proofImage');

        if (
            !customerName ||
            !customerEmail ||
            !phone ||
            !productId ||
            !advanceAmount ||
            !proofImage
        ) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Upload proof image to Cloudinary
        const arrayBuffer = await proofImage.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const base64Image = `data:${proofImage.type};base64,${buffer.toString('base64')}`;

        const uploadRes = await cloudinary.uploader.upload(base64Image, {
            folder: 'orders/proofs',
            resource_type: 'image',
        });

        // Save order to DB
        const newOrder = await prisma.order.create({
            data: {
                customerName,
                customerEmail,
                phone,
                productId,
                advanceAmount,
                proofImage: uploadRes.secure_url,
            },
        });

        return NextResponse.json({ message: 'Order placed successfully', order: newOrder }, { status: 201 });

    } catch (error) {
        console.error('❌ Error placing order:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                product: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return Response.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}