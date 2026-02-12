import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(request: NextRequest, { params }: { params: { id: string }}){
    const id = Number(params.id)
    const deletedState = await prisma.state.delete({where: {id}})
    return NextResponse.json(deletedState)
}

export async function UPDATE(request: NextRequest, {params}: {params: {id: string}}){
    const id = Number(params.id)
    const {name, color} = await request.json()
    const updatedState = await prisma.state.update({where: {id}, data: {name, color}} )
    return NextResponse.json(updatedState)
}