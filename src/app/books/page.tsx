"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BookCard from "@/components/ui/BookCard";
import Link from "next/link";
import { Book } from "@/types";

export default function BooksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/auth");
      return;
    }

    fetchBooks();
  }, [session, status, router]);

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/books");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete book");
      }
      
      setBooks(books.filter(book => book.id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
      setError("Failed to delete book");
    }
  };

  if (status === "loading" || loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Books</h1>
        <Link
          href="/books/add"
          className="bg-blue-900 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
        >
          Add New Book
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid gap-4">
        {books.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-600 mb-2">No books yet</h2>
            <p className="text-gray-500 mb-4">Start building your book collection!</p>
            <Link 
              href="/books/add"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium inline-block transition"
            >
              Add Your First Book
            </Link>
          </div>
        ) : (
          books.map(book => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              genre={book.genre}
              createdAt={book.createdAt}
              onDelete={() => handleDeleteBook(book.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
