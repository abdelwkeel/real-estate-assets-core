import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: جلب الجهات الحكومية
export async function GET() {
  try {
    const authorities = await prisma.governmentAuthority.findMany({
      orderBy: { AuthorityName: "asc" },
    });
    return NextResponse.json(authorities);
  } catch (error) {
    console.error("[GET /authorities]", error);
    return NextResponse.json({ error: "فشل في جلب الجهات" }, { status: 500 });
  }
}

// POST: إضافة جهة جديدة
export async function POST(req: Request) {
  try {
    const { AuthorityName } = await req.json();

    if (!AuthorityName) {
      return NextResponse.json({ error: "يرجى إدخال الاسم" }, { status: 400 });
    }

    const newAuthority = await prisma.governmentAuthority.create({
      data: { AuthorityName },
    });

    return NextResponse.json(newAuthority);
  } catch (error) {
    console.error("[POST /authorities]", error);
    return NextResponse.json({ error: "فشل في الإضافة" }, { status: 500 });
  }
}
