import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth,{ AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma!),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),

        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                //Memeriksa apakah email dan password ada dalam kredensial yang diberikan.
                //  Jika tidak, maka akan melempar error "Invalid credentials".
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Invalid credentials");
                }

                //Mencari pengguna dengan email yang sesuai di database menggunakan Prisma.
                const user = await prisma!.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                //Mencari pengguna dengan email yang sesuai di database menggunakan Prisma.
                if (!user || !user?.hashedPassword) {
                    throw new Error("Invalid credentials");
                }

                //Memeriksa apakah password yang diberikan sesuai dengan password yang tersimpan di database menggunakan bcrypt.
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                //Jika password yang diberikan tidak sesuai, maka akan melempar error "Invalid credentials".
                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials");
                }

                return user;
            },

                })
            ],
            pages: {
                //Ini berarti bahwa ketika pengguna tidak terautentikasi, mereka akan diarahkan ke halaman signin di root URL.
                signIn: "/",
            },
            debug: process.env.NODE_ENV === "development",
            session: {
                strategy: "jwt",
            }  ,
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)