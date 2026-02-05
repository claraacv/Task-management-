import { NextResponse } from "next/server"

export async function GET(){
    return NextResponse.json({message: "Isso é um get"})
}

export async function POST(){
    return NextResponse.json({message: "Isso é um post"})
}

export async function DELETE(){
    return NextResponse.json({message: "Isso é um delete"})
}

export async function UPDATE(){
    return NextResponse.json({message: "Isso é um update"})
}