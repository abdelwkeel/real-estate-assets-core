// app/api/companies/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const companies = await prisma.company.findMany();
    return NextResponse.json(companies);
  } catch (error) {
    console.error("API GET /companies error:", error); // ← سيساعدك في debug
    const message =
      error instanceof Error ? error.message : "حدث خطأ أثناء جلب الشركات";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
// POST: إضافة شركة جديدة
export async function POST(req: Request) {
  try {
    const { CompanyName, AffiliationLaw } = await req.json();

    // التحقق من المدخلات
    if (!CompanyName || !AffiliationLaw) {
      return NextResponse.json(
        { error: "الاسم وقانون التبعية مطلوبان" },
        { status: 400 }
      );
    }

    const newCompany = await prisma.company.create({
      data: {
        CompanyName,
        AffiliationLaw,
      },
    });

    return NextResponse.json(newCompany);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "حدث خطأ أثناء إضافة الشركة";
    console.error("❌ [POST /api/companies]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
