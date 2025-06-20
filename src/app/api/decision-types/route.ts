import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }

    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "الاسم مطلوب" }, { status: 400 });
    }

    const decisionType = await prisma.decisionType.create({
      data: { name },
    });

    return NextResponse.json(decisionType);
  } catch (error) {
    console.error("خطأ في إضافة نوع القرار:", error);
    return NextResponse.json({ error: "فشل في الإضافة" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const decisionTypes = await prisma.decisionType.findMany();
    return NextResponse.json(decisionTypes);
  } catch (error) {
    console.error("خطأ في جلب أنواع القرارات:", error);
    return NextResponse.json({ error: "فشل في الجلب" }, { status: 500 });
  }
}
