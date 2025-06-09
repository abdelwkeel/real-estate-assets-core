// app/api/letters/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const letterId = parseInt(params.id);
  if (isNaN(letterId)) {
    return NextResponse.json({ error: "معرّف غير صالح" }, { status: 400 });
  }

  try {
    await prisma.letter.delete({ where: { LetterID: letterId } });
    return NextResponse.json({ message: "تم حذف الرسالة بنجاح" });
  } catch (error) {
    console.error("[DELETE /letters]", error);
    const message =
      error instanceof Error ? error.message : "فشل في حذف الرسالة";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
