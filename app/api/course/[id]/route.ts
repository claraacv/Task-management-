import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function DELETE(request: NextRequest, { params }: { params: { id: string }}){
    const id = Number(params.id)
    const deletedCourse= await prisma.course.delete({where: {id}})
    return NextResponse.json(deletedCourse)
}

export async function PUT(request: NextRequest, {params}: {params: {id: string}}){
    const id = Number(params.id)
    const {title, color, studentId} = await request.json()
    const updatedCourse = await prisma.course.update({where: {id}, data: {title, color, studentId}} )
    return NextResponse.json(updatedCourse)
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json(
      { message: "The user is not authorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  const course = await prisma.course.findUnique({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(course);
}