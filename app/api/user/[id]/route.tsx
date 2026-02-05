import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(request: NextRequest, { params }: { params: { id: string }}){
    const id = Number(params.id)
    const deletedUser = await prisma.user.delete({where: {id}})
    return NextResponse.json(deletedUser)
}

export async function UPDATE(request: NextRequest, {params}: {params: {id: string}}){
    const id = Number(params.id)
    const {username} = await request.json()
    const updatedUser = await prisma.user.update({where: {id}, data: {username}} )
    return NextResponse.json(updatedUser)
}