import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(){
    const session = await auth()

    if(!session?.user?.email){
        return NextResponse.json({message: "The user is not authorized"})
    }

    const email = session.user.email

    const activities = await prisma.activity.findMany({
        where:{
            course:{
                student:{
                    email
                }
            }
        }
    })

    return NextResponse.json(activities)
}

export async function POST(request: NextRequest){
    const {title, color, description, stateId, courseId} = await request.json()

    const activity = await prisma.activity.create({
        data: {
            title,
            description,
            color,
            stateId,
            courseId
        }
    })

    return NextResponse.json(activity)
}