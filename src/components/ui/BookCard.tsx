import React from "react";
import Link from "next/link";

interface BookCardProps {
  id?: string;
  title: string;
  author: string;
  genre: string;
  createdAt: string;
  onDelete?: () => void;
}

export default function BookCard({ id, title, author, genre, createdAt, onDelete }: BookCardProps) {
  return (
    <div className="border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between bg-white shadow-sm">
      <div className="flex-1">
        <h1 className="text-slate-950 font-semibold text-lg">{title}</h1>
        <div className="text-gray-700">Author: {author} &mdash; {genre}</div>
        <div className="text-xs text-gray-600">Added: {new Date(createdAt).toLocaleString()}</div>
      </div>
      <div className="flex gap-2 mt-2 md:mt-0">
        {id && (
          <Link
            href={`/books/view/${id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
          >
            View
          </Link>
        )}
        {onDelete && (
          <button 
            onClick={onDelete} 
            className="bg-red-100 hover:bg-red-200 text-red-900 cursor-pointer px-3 py-1 rounded text-sm transition"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
