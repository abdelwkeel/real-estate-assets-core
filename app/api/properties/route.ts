// app/api/properties/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Get all properties
export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      include: {
        ownerCompany: true,
      },
    });
    return NextResponse.json(properties);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch properties";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST: إنشاء أصل عقاري جديد
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      Name,
      Location,
      OwnerCompanyID,
      Status,
      LegalStatus,
      UtilizationStatus,
      Governorate,
      Images,
      Documents,
    } = data;

    if (!Name || !Location || !OwnerCompanyID || !Status) {
      return NextResponse.json(
        { error: "يرجى توفير جميع الحقول الأساسية." },
        { status: 400 }
      );
    }

    const property = await prisma.property.create({
      data: {
        Name,
        Location,
        OwnerCompanyID,
        Status,
        LegalStatus,
        UtilizationStatus,
        Governorate,
        Images,
        Documents,
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create property";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
