// app/api/board-extract/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const extracts = await prisma.boardExtract.findMany({
      include: { createdBy: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ extracts }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "حدث خطأ أثناء جلب البيانات" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "غير مصرح" }, { status: 401 });
    }

    const { extractNumber, extractDate, title, content, fileUrl } =
      await request.json();

    if (!extractNumber || !extractDate || !title || !content) {
      return NextResponse.json(
        { message: "يرجى ملء جميع الحقول المطلوبة" },
        { status: 400 }
      );
    }

    const newExtract = await prisma.boardExtract.create({
      data: {
        extractNumber,
        extractDate: new Date(extractDate),
        title,
        content,
        fileUrl,
        createdById: parseInt(session.user.id),
      },
    });

    return NextResponse.json({ extract: newExtract }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "حدث خطأ أثناء إضافة المستخرج" },
      { status: 500 }
    );
  }
}
  
