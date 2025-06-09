// app/api/companies/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const companyId = parseInt(params.id);
  if (isNaN(companyId)) {
    return NextResponse.json({ error: "معرّف غير صالح" }, { status: 400 });
  }

  try {
    await prisma.company.delete({
      where: { CompanyID: companyId },
    });

    return NextResponse.json({ message: "تم الحذف بنجاح" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "فشل في حذف الشركة";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
