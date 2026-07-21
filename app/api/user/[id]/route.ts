import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(request: NextRequest, { params }: { params: { id: string }}){
    const id = Number(params.id)
    const deletedUser = await prisma.user.delete({where: {id}})
    return NextResponse.json(deletedUser)
}

export async function PUT(request: NextRequest, {params}: {params: {id: string}}){
    const id = Number(params.id)
    const {username, email} = await request.json()
    if (!username || !email) {
        return NextResponse.json(
            { error: 'Username e email são obrigatórios' },
            { status: 400 }
        )
    }
    const updatedUser = await prisma.user.update({where: {id}, data: {username, email}} )
    return NextResponse.json(updatedUser)
}