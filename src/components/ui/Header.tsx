import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white border-b">
      <Link href="/books" className="font-bold text-2xl text-gray-900">Book Catalogue</Link>
      <nav className="flex items-center gap-3">
        <Link href="/books" className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition">My Books</Link>
        <Link href="/books/add" className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition">Add Book</Link>
        <Link href="/auth" className="px-5 py-2 rounded-lg bg-indigo-700 text-white font-medium hover:bg-indigo-800 transition">Sign Up</Link>
      </nav>
    </header>
  );
}
