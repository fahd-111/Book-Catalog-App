"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BookWithUser } from "@/types";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [books, setBooks] = useState<BookWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    try {
      const response = await fetch("/api/books/all");
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

  if (status === "loading" || loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to Book Catalogue
        </h1>
        
        {!session ? (
          <Link
            href="/auth"
            className="bg-gray-950 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold text-lg inline-block transition"
          >
            Get Started
          </Link>
        ) : (
          <div className="space-x-4">
            <Link
              href="/books"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold text-lg inline-block transition"
            >
              My Books
            </Link>
            <Link
              href="/books/add"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg inline-block transition"
            >
              Add Book
            </Link>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
          {error}
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
           All Books
        </h2>
        
        {books.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No books available yet. Be the first to add one!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map(book => (
              <Link
                key={book.id}
                href={`/books/view/${book.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border hover:border-emerald-200"
              >
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Author:</span> {book.author}
                </p>
                <p className="text-gray-600 mb-3">
                  <span className="font-medium">Genre:</span> {book.genre}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Added by {book.user?.name || "Unknown"}</span>
                  <span>{new Date(book.createdAt).toLocaleDateString()}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
}
