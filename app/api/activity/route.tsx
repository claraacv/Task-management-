import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(){
    const activities = await prisma.activity.findMany()
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