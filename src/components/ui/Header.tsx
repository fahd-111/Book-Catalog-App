"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white border-b">
      <Link href="/" className="font-bold text-2xl text-gray-900">
        Book Catalogue
      </Link>
      <nav className="flex items-center gap-3">
        {status === "loading" ? (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        ) : session ? (
          <>
            <Link 
              href="/books" 
              className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
            >
              My Books
            </Link>
            <Link 
              href="/books/add" 
              className="px-5 py-2 rounded-lg bg-blue-900 text-white font-medium hover:bg-blue-700 transition"
            >
              Add Book
            </Link>
            <button
              onClick={() => signOut()}
              className="px-5 py-2 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-600 cursor-pointer transition"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link 
              href="/auth" 
              className="px-5 py-2 rounded-lg bg-indigo-700 text-white font-medium hover:bg-indigo-800 transition"
            >
              Sign In
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
