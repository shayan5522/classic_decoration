import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma"; // assuming this exports PrismaClient properly

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = await prisma.admin.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) throw new Error("No user found");

                const isValid = await compare(credentials.password, user.password);
                if (!isValid) throw new Error("Invalid password");

                return { id: user.id, email: user.email };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET, // now this will work
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/admin/login",
    },
});

export { handler as GET, handler as POST };
