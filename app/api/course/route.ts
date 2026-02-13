import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(){
    const session = await auth()

    if(!session?.user?.email){
        return NextResponse.json({message: "The user is not authorized"})
    }

    const email = session.user.email

    const courses = await prisma.course.findMany({
        where:{
            student:{
                email
            }
        }
    })
    
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
