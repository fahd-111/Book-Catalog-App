import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }
    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }
    // Create user (password is plain text for demo; hash in production!)
    await prisma.user.create({
      data: { name, email, password },
    });
    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
