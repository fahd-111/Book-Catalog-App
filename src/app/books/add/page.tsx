"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BookForm from "@/components/ui/BookForm";
import { BookFormData } from "@/types";

export default function AddBookPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/auth");
      return;
    }
  }, [session, status, router]);

  const handleSubmit = async (data: BookFormData) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add book");
      }

      const book = await response.json();
      setSuccess("Book added successfully!");
      
      // Redirect to books page after a short delay
      setTimeout(() => {
        router.push("/books");
      }, 1500);
    } catch (error: any) {
      console.error("Error adding book:", error);
      setError(error.message || "Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Add New Book
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <BookForm onSubmit={handleSubmit} loading={loading} />

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/books")}
            className="text-gray-600 hover:text-gray-800 font-medium cursor-pointer"
          >
            ← Back to My Books
          </button>
        </div>
      </div>
    </div>
  );
}

