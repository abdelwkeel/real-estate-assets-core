// app/api/board-extract/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "غير مصرح" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN") {
      return NextResponse.json(
        { message: "ليس لديك صلاحية التعديل" },
        { status: 403 }
      );
    }

    const { extractNumber, extractDate, title, content, fileUrl } =
      await request.json();

    const updatedExtract = await prisma.boardExtract.update({
      where: { id: Number(params.id) },
      data: {
        extractNumber,
        extractDate: new Date(extractDate),
        title,
        content,
        fileUrl,
      },
    });

    return NextResponse.json({ extract: updatedExtract }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "حدث خطأ أثناء التعديل" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "غير مصرح" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN") {
      return NextResponse.json(
        { message: "ليس لديك صلاحية الحذف" },
        { status: 403 }
      );
    }

    await prisma.boardExtract.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: "تم الحذف بنجاح" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "حدث خطأ أثناء الحذف" },
      { status: 500 }
    );
  }
}
