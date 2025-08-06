"use client";
import React, { useState } from "react";
import { BookFormData } from "@/types";

interface BookFormProps {
  onSubmit: (data: BookFormData) => void;
  loading?: boolean;
}

export default function BookForm({ onSubmit, loading }: BookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !genre) {
      setError("All fields are required");
      return;
    }
    setError("");
    onSubmit({ title, author, genre });
  };

  return (
    <form onSubmit={handleSubmit} className="flex text-gray-900 flex-col gap-4">
      <input
        name="title"
        placeholder="Title"
        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        name="author"
        placeholder="Author"
        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        required
      />
      <input
        name="genre"
        placeholder="Genre"
        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={genre}
        onChange={e => setGenre(e.target.value)}
        required
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? "Adding..." : "Add Book"}
      </button>
    </form>
  );
}
