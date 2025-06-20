import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (
    !session ||
    (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN")
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const {
    title,
    description,
    fileUrl,
    decisionDate,
    decisionTypeId,
    decisionNumber,
  } = await req.json();

  const updatedDecision = await prisma.boardDecision.update({
    where: { id: Number(params.id) },
    data: {
      decisionNumber,
      title,
      description,
      fileUrl,
      decisionDate,
      decisionType: { connect: { id: decisionTypeId } },
    },
  });

  return NextResponse.json(updatedDecision);
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (
    !session ||
    (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN")
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await prisma.boardDecision.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: "Decision deleted successfully" });
}
