import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Match all routes under /admin
export const config = {
    matcher: ["/admin((?!/login).*)",],
};

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        // Redirect to login page if not authenticated
        return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return NextResponse.next();
}
