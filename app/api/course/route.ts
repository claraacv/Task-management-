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
    const {title, color} = await request.json()

    const session = await auth()

    if(!session?.user?.email){
        return NextResponse.json({message: "The user was is not authorized"})
    }

    const user = await prisma.user.findUnique({
        where:{
            email: session.user.email
        }
    })

    if(!user){
        return NextResponse.json({message: "User not found"}, {status: 404})
    }

    const course = await prisma.course.create({
        data: {
            title,
            color,
            studentId: user.id
        }
    })

    return NextResponse.json(course)
}
