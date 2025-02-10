import bcrypt from "bcrypt" 
import prisma from "@/app/libs/prismadb" 
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const body = await request.json()
    const { email, name, password } = body

    //bcrypt berfungsi untuk mengenkripsi password
    const hashedPassword = await bcrypt.hash(password, 12)

    //Fungsi create() dari Prisma digunakan untuk membuat data baru di database.
    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    })

    return NextResponse.json(user) 
}