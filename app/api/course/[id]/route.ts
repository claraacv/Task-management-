import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(request: NextRequest, { params }: { params: { id: string }}){
    const id = Number(params.id)
    const deletedCourse= await prisma.course.delete({where: {id}})
    return NextResponse.json(deletedCourse)
}

export async function UPDATE(request: NextRequest, {params}: {params: {id: string}}){
    const id = Number(params.id)
    const {title, color, studentId} = await request.json()
    const updatedCourse = await prisma.course.update({where: {id}, data: {title, color, studentId}} )
    return NextResponse.json(updatedCourse)
}