import { NextResponse } from "next/server"

export async function POST(request: Request){
    const courseData = await request.json()

    return NextResponse.json({message: "Post: ", courseData})
}