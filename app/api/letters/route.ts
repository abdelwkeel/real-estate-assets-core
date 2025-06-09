// app/api/letters/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: جلب كل الرسائل
export async function GET() {
  try {
    const letters = await prisma.letter.findMany({
      orderBy: { DateSent: "desc" },
    });
    return NextResponse.json(letters);
  } catch (error) {
    console.error("[GET /letters]", error);
    const message =
      error instanceof Error ? error.message : "فشل في جلب الرسائل";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST: إضافة رسالة جديدة
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      Subject,
      RecipientType,
      RecipientName,
      DateSent,
      OutgoingNumber,
      AttachedFiles,
    } = body;

    // تحقق من الحقول المطلوبة
    if (
      !Subject ||
      !RecipientType ||
      !RecipientName ||
      !DateSent ||
      !OutgoingNumber
    ) {
      return NextResponse.json(
        { error: "الرجاء إدخال جميع الحقول الأساسية" },
        { status: 400 }
      );
    }

    const newLetter = await prisma.letter.create({
      data: {
        Subject,
        RecipientType,
        RecipientName,
        DateSent: new Date(DateSent),
        OutgoingNumber,
        AttachedFiles: AttachedFiles || [],
      },
    });

    return NextResponse.json(newLetter);
  } catch (error) {
    console.error("[POST /letters]", error);
    const message =
      error instanceof Error ? error.message : "فشل في إنشاء الرسالة";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
