import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(){
    const states = await prisma.state.findMany()
    return NextResponse.json(states)
}

export async function POST(request: NextRequest){
    const {name, color} = await request.json()

    const state = await prisma.state.create({
        data: {
            name,
            color
        }
    })

    return NextResponse.json(state)
}