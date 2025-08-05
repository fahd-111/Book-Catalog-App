import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// GET /api/books/[id] - Get a single book
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: bookId } = await params;

    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}



// DELETE /api/books/[id]
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: bookId } = await params;

    // Check if the book exists and belongs to the user
    const book = await prisma.book.findFirst({
      where: {
        id: bookId,
        userId: session.user.id,
      },

    });



    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // Delete the book
    await prisma.book.delete({
      where: { id: bookId },
    });

    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
