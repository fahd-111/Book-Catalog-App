"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";



export default function LoginForm({ onGoogle }: { onGoogle?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);
    if (res?.error) setError("Invalid email or password");
    // else: NextAuth will handle redirect if needed
  };

  return (
    <form className="space-y-4 text-gray-900" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-2">Login</h2>
      <button type="button" onClick={onGoogle} className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 mb-2 bg-white hover:bg-gray-50 transition">
        <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" />
        Continue with Google
      </button>
      <div className="flex items-center my-2">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="mx-2 text-gray-400 text-sm">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}
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
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}
