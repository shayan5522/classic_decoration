import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export const POST = async (req) => {
    const data = await req.formData();
    const file = data.get('image');

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ folder: 'products' }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            })
            .end(buffer);
    });

    return NextResponse.json({ url: result.secure_url });
};
