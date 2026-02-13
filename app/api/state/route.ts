import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(){
    const session = await auth()
    
    if(!session?.user?.email){
        return NextResponse.json({message: "The was is not authorized"})
    }

    const email = session.user.email

    const states = await prisma.state.findMany({
        where:{
            activities:{
                some:{
                    course:{
                        student:{
                            email:email,
                        }
                    }
                }
            }
        },
        distinct: ["id"]
    })

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