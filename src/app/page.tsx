import BookCard from "../components/ui/BookCard";
import Link from "next/link";
import { prisma } from "../lib/prisma";
import { getServerSession } from "next-auth";

type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  createdAt: string;
};

export default async function HomePage() {
  const session = await getServerSession();
  let books: Book[] = [];
  if (session?.user?.id) {
    const dbBooks = await prisma.book.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });
    books = dbBooks.map(({ id, title, author, genre, createdAt }) => ({
      id,
      title,
      author,
      genre,
      createdAt: createdAt.toISOString(),
    }));
  }
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Your Book Catalog</h1>
      <Link href="/books/add" className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block">Add Book</Link>
      <div className="grid gap-4">
        {books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          books.map(book => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              genre={book.genre}
              createdAt={book.createdAt}
              onDelete={undefined}
            />
          ))
        )}
      </div>
    </>
  );
}
