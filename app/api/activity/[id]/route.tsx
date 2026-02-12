import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(request: NextRequest, { params }: { params: { id: string }}){
    const id = Number(params.id)
    const deletedActivity= await prisma.activity.delete({where: {id}})
    return NextResponse.json(deletedActivity)
}

export async function UPDATE(request: NextRequest, {params}: {params: {id: string}}){
    const id = Number(params.id)
    const {title, color, description, stateId, courseId} = await request.json()
    const updatedActivity = await prisma.activity.update({where: {id}, data: {title, color, description, stateId, courseId}} )
    return NextResponse.json(updatedActivity)
}