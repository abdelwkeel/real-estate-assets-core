import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const {
    title,
    description,
    fileUrl,
    decisionTypeId,
    decisionDate,
    decisionNumber,
  } = await req.json();

  const decision = await prisma.boardDecision.create({
    data: {
      decisionNumber,
      title,
      description,
      fileUrl,
      decisionDate: new Date(decisionDate),
      decisionType: { connect: { id: decisionTypeId } },
      createdBy: { connect: { email: session.user.email! } },
    },
  });

  return NextResponse.json(decision);
}
export async function GET() {
  const decisions = await prisma.boardDecision.findMany({
    include: { decisionType: true, createdBy: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(decisions);
}
