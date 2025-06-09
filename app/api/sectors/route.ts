import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: جلب كل القطاعات الداخلية
export async function GET() {
  try {
    const sectors = await prisma.internalSector.findMany({
      orderBy: { SectorName: "asc" },
    });
    return NextResponse.json(sectors);
  } catch (error) {
    console.error("[GET /sectors]", error);
    return NextResponse.json({ error: "فشل في جلب القطاعات" }, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const { SectorName } = await req.json();

    if (!SectorName) {
      return NextResponse.json({ error: "اسم القطاع مطلوب" }, { status: 400 });
    }

    const newSector = await prisma.internalSector.create({
      data: { SectorName },
    });

    return NextResponse.json(newSector);
  } catch (error) {
    console.error("فشل في إضافة القطاع", error);
    return NextResponse.json({ error: "حدث خطأ أثناء الحفظ" }, { status: 500 });
  }
}
