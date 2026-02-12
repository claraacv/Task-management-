import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(){
    const courses = await prisma.course.findMany()
    return NextResponse.json(courses)
}

export async function POST(request: NextRequest){
    const {title, color, studentId} = await request.json()

    const course = await prisma.course.create({
        data: {
            title,
            color,
            studentId
        }
    })

    return NextResponse.json(course)
}
