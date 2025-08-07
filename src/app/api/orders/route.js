import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';
import { Readable } from 'stream';

function bufferToStream(buffer) {
    return new Readable({
        read() {
            this.push(buffer);
            this.push(null);
        },
    });
}

export async function POST(req) {
    try {
        const formData = await req.formData();

        const customerName = formData.get('customerName');
        const customerEmail = formData.get('customerEmail');
        const phone = formData.get('phone');
        const productId = parseInt(formData.get('productId'));
        const advanceAmount = parseFloat(formData.get('advanceAmount'));
        const proofImage = formData.get('proofImage');

        console.log('➡️ Received form data:', {
            customerName,
            customerEmail,
            phone,
            productId,
            advanceAmount,
            proofImage: proofImage?.name,
        });

        if (
            !customerName ||
            !customerEmail ||
            !phone ||
            !productId ||
            !advanceAmount ||
            !proofImage
        ) {
            console.warn('⚠️ Missing required fields');
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Convert image to buffer
        const arrayBuffer = await proofImage.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary
        let uploadRes;
        try {
            uploadRes = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'orders/proofs',
                        resource_type: 'image',
                    },
                    (error, result) => {
                        if (error) {
                            console.error('❌ Cloudinary Upload Error:', error);
                            return reject(error);
                        }
                        console.log('✅ Cloudinary upload successful:', result.secure_url);
                        resolve(result);
                    }
                );

                bufferToStream(buffer).pipe(uploadStream);
            });
        } catch (err) {
            console.error('❌ Failed to upload to Cloudinary:', err.message);
            return NextResponse.json(
                { error: 'Image upload failed' },
                { status: 500 }
            );
        }

        // Save order to database
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

        console.log('✅ Order saved:', newOrder.id);

        return NextResponse.json(
            { message: 'Order placed successfully', order: newOrder },
            { status: 201 }
        );
    } catch (error) {
        console.error('❌ Error placing order:', error.message);
        console.error(error.stack);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
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

        console.log('✅ Orders fetched:', orders.length);

        return Response.json(orders);
    } catch (error) {
        console.error('❌ Error fetching orders:', error.message);
        console.error(error.stack);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error' }),
            { status: 500 }
        );
    }
}
