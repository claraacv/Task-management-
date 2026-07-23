import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ message: "The user is not authorized" });
  }

  const email = session.user.email;
  const courseId = request.nextUrl.searchParams.get("courseId");

  const activities = await prisma.activity.findMany({
    where: {
      ...(courseId && {
        courseId: Number(courseId),
      }),
      course: {
        student: {
          email,
        },
      },
    },
  });

  return NextResponse.json(activities);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const activity = await prisma.activity.create({
    data: {
      title: body.title,
      description: body.description,
      color: body.color,
      stateId: Number(body.stateId),
      courseId: Number(body.courseId),
    },
  });

  return NextResponse.json(activity);
}
