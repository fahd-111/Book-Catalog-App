"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BookWithUser } from "@/types";

export default function BookViewPage({ params }: { params: Promise<{ id: string }> }) {
  const [book, setBook] = useState<BookWithUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookId, setBookId] = useState<string>("");

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setBookId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  const fetchBook = async () => {
    try {
      const response = await fetch(`/api/books/${bookId}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Book not found");
        }
        throw new Error("Failed to fetch book");
      }
      const data = await response.json();
      setBook(data);
    } catch (error: any) {
      console.error("Error fetching book:", error);
      setError(error.message || "Failed to load book");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-950 py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
          {error}
        </div>
        <div className="text-center">
          <Link
            href="/"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium inline-block transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">Book not found</p>
        <Link
          href="/"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium inline-block transition"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6">
          <Link
            href="/"
            className="text-black hover:text-blue-900 font-medium flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {book.title}
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Book Details</h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Author:</span>
                  <p className="text-gray-900 text-lg">{book.author}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Genre:</span>
                  <p className="text-gray-900 text-lg">{book.genre}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Added by:</span>
                  <p className="text-gray-900 text-lg">{book.user?.name || "Unknown"}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Date Added:</span>
                  <p className="text-gray-900">{new Date(book.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">About this Book</h3>
            <div className="space-y-4 text-white">
              <p>
                <strong>{book.title}</strong> by {book.author} is a {book.genre.toLowerCase()} book 
                that has been added to our community collection.
              </p>
              <p>
                This book was shared by <strong>{book.user?.name || "Unknown"}</strong> on{" "}
                {new Date(book.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}.
              </p>
              <div className="mt-6 p-4 bg-white rounded-lg border border-gray-600">
                <p className="text-sm text-gray-600">
                  Want to add your own books to the collection?{" "}
                  <Link href="/auth" className="text-blue-500 hover:text-blue-700 font-medium">
                    Sign up now
                  </Link>{" "}
                  to get started!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="bg-blue-900 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold inline-block transition"
          >
            Explore More Books
          </Link>
        </div>
      </div>
    </div>
  );
}
