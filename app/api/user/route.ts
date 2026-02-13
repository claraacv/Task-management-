import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(){
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
}

export async function POST(request: NextRequest){
    const {username, email} = await request.json()

    if (!username || !email) {
        return NextResponse.json(
            { error: 'Username e email são obrigatórios' },
            { status: 400 }
        )
    }

    const user = await prisma.user.create({
        data: {
            username,
            email
        }
    })

    return NextResponse.json(user)
}