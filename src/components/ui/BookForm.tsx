"use client";
import React, { useState } from "react";
import { BookFormData } from "@/types";

interface BookFormProps {
  onSubmit: (data: BookFormData) => void;
  loading?: boolean;
}

const GENRE_OPTIONS = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Fantasy",
  "Biography",
  "History",
  "Self-Help",
  "Business",
  "Technology",
  "Health & Wellness",
  "Horror",
  "Thriller",
  "Adventure",
  "Poetry",
  "Drama",
  "Comedy",
  "Children's Books",
  "Young Adult",
  "Other"
];

export default function BookForm({ onSubmit, loading }: BookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Title validation
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 2) {
      newErrors.title = "Title must be at least 2 characters long";
    } else if (title.trim().length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    // Author validation
    if (!author.trim()) {
      newErrors.author = "Author is required";
    } else if (author.trim().length < 2) {
      newErrors.author = "Author name must be at least 2 characters long";
    } else if (author.trim().length > 50) {
      newErrors.author = "Author name must be less than 50 characters";
    }

    // Genre validation
    if (!genre) {
      newErrors.genre = "Please select a genre";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({ 
        title: title.trim(), 
        author: author.trim(), 
        genre 
      });
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors(prev => ({ ...prev, title: "" }));
    }
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
    if (errors.author) {
      setErrors(prev => ({ ...prev, author: "" }));
    }
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
    if (errors.genre) {
      setErrors(prev => ({ ...prev, genre: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex text-gray-900 flex-col gap-4">
      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Book Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Enter book title"
          className={`w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:outline-none focus:ring-2 ${errors.title ? 'focus:ring-red-500' : 'focus:ring-blue-500'} transition-colors`}
          value={title}
          onChange={handleTitleChange}
          maxLength={100}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      {/* Author Input */}
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
          Author *
        </label>
        <input
          id="author"
          name="author"
          type="text"
          placeholder="Enter author name"
          className={`w-full border ${errors.author ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:outline-none focus:ring-2 ${errors.author ? 'focus:ring-red-500' : 'focus:ring-blue-500'} transition-colors`}
          value={author}
          onChange={handleAuthorChange}
          maxLength={50}
        />
        {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
      </div>

      {/* Genre Select */}
      <div>
        <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
          Genre *
        </label>
        <select
          id="genre"
          name="genre"
          className={`w-full border ${errors.genre ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg focus:outline-none focus:ring-2 ${errors.genre ? 'focus:ring-red-500' : 'focus:ring-blue-500'} transition-colors bg-white`}
          value={genre}
          onChange={handleGenreChange}
        >
          <option value="">Select a genre</option>
          {GENRE_OPTIONS.map((genreOption) => (
            <option key={genreOption} value={genreOption}>
              {genreOption}
            </option>
          ))}
        </select>
        {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre}</p>}
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="bg-blue-900 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors mt-4" 
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Adding Book...
          </div>
        ) : (
          "Add Book"
        )}
      </button>
    </form>
  );
}
