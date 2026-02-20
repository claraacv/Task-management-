import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(){
    const session = await auth()
    
    if(!session?.user?.email){
        return NextResponse.json({message: "The user was is not authorized"})
    }

    const states = await prisma.state.findMany({
    where: {
      student: {
        email: session.user.email
      }
    }
  })

    return NextResponse.json(states)
}

export async function POST(request: NextRequest){
    const session = await auth()

    if(!session?.user?.email){
        return NextResponse.json({message: "The user was is not authorized"})
    }

    const {name, color} = await request.json()

    const user = await prisma.user.findUnique({
        where:{
            email: session.user.email
        }
    })

    if(!user){
        return NextResponse.json({message: "User not found"}, {status: 404})
    }

    const state = await prisma.state.create({
        data: {
            name,
            color,
            studentId: user.id
        }
    })

    return NextResponse.json(state)
}