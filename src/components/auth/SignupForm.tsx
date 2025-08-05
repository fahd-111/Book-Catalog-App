"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const SignupForm = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogle = async () => {
    await signIn("google");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Call API route to create user
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      // Auto-login after signup
      const loginRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (loginRes?.error) throw new Error("Signup succeeded but login failed");
      router.push("/books");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 text-gray-900" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
      <button type="button" onClick={handleGoogle} className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 mb-2 bg-white hover:bg-gray-50 transition">
        <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" />
        Continue with Google
      </button>
      <div className="flex items-center my-2">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="mx-2 text-gray-400 text-sm">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}
      <label className="block text-sm font-medium">Name</label>
      <input
        type="text"
        placeholder="Enter your name"
        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <label className="block text-sm font-medium">Email</label>
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <label className="block text-sm font-medium">Password</label>
      <input
        type="password"
        placeholder="Enter your password"
        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-indigo-700 hover:bg-indigo-800 text-white p-2 rounded-lg font-semibold transition" disabled={loading}>
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
}
