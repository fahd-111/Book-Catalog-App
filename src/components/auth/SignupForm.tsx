"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SignupFormData } from "@/types";

export const SignupForm = () => {
    const [formData, setFormData] = useState<SignupFormData>({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleGoogle = async () => {
        setGoogleLoading(true);
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
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Signup failed");
            // Auto-login after signup
            const loginRes = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });
            if (loginRes?.error) throw new Error("Signup succeeded but login failed");
            router.push("/books");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof SignupFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <form className="space-y-4 text-gray-900" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
            <button type="button" onClick={handleGoogle} className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 mb-2 bg-white hover:bg-gray-50 cursor-pointer transition">
                <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                {googleLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div> : "Continue with Google"}
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
                value={formData.name}
                onChange={e => handleInputChange("name", e.target.value)}
                required
            />
            <label className="block text-sm font-medium">Email</label>
            <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.email}
                onChange={e => handleInputChange("email", e.target.value)}
                required
            />
            <label className="block text-sm font-medium">Password</label>
            <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.password}
                onChange={e => handleInputChange("password", e.target.value)}
                required
            />
            <button type="submit" className="cursor-pointer w-full bg-blue-700 hover:bg-blue-800 text-white p-2 rounded-lg font-semibold transition" disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
            </button>
        </form>
    );
}
