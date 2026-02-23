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
    const body = await request.json()

    const activity = await prisma.activity.create({
        data: {
            title: body.title,
            description: body.description,
            color: body.color,
            stateId: Number(body.stateId),
            courseId: Number(body.courseId)
        }
    })

    return NextResponse.json(activity)
}

export async function getByCourse(request: NextRequest){
    const {id} = await request.json()

    const session = await auth()

    if(!session?.user?.email){
        return NextResponse.json({message: "The user is not authorized"})
    }

    const email = session.user.email

    const activities = await prisma.activity.findMany({
        where:{
            course:{
                id,
                student:{
                    email
                }
            }
        }
    })

    return NextResponse.json(activities)
}