import React from "react";

interface BookCardProps {
  title: string;
  author: string;
  genre: string;
  createdAt: string;
  onDelete?: () => void;
}

export default function BookCard({ title, author, genre, createdAt, onDelete }: BookCardProps) {
  return (
    <div className="border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between bg-white shadow-sm">
      <div>
        <div className="font-semibold text-lg">{title}</div>
        <div className="text-gray-600">{author} &mdash; {genre}</div>
        <div className="text-xs text-gray-400">Added: {new Date(createdAt).toLocaleString()}</div>
      </div>
      {onDelete && (
        <button onClick={onDelete} className="bg-red-500 text-white px-3 py-1 rounded mt-2 md:mt-0">Delete</button>
      )}
    </div>
  );
}
