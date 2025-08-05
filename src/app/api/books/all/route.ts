import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BookWithUser } from "@/types";

// GET /api/books/all - Get all books (public route for home page)
export async function GET(req: NextRequest) {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(books);
  } catch (error) {
    console.error("Error fetching all books:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
