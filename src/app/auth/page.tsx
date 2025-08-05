"use client";
import React, { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  const handleGoogle = () => {
    // TODO: Add Google sign-in logic
    alert("Continue with Google clicked");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      <div className="w-full  flex items-start justify-center bg-[#f7f9fb] px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-1">Book Catalogue</h1>
          <p className="text-gray-500 text-center mb-6">Welcome back to your reading journey</p>
          {/* Toggle */}
          <div className="flex mb-6 bg-gray-100 p-1  rounded-lg overflow-hidden relative">
            <div
              className="absolute top-0 left-0 w-1/2 h-full
              border border-gray-300 
              bg-white rounded-lg shadow transition-transform duration-300"
              style={{
                transform: mode === "login" ? "translateX(0%)" : "translateX(100%)",
                width: '50%',
                zIndex: 0,
                

              }}
            />
            <button
              className={`flex-1 py-2 z-10 font-semibold transition-colors duration-300 ${mode === "login" ? "text-gray-900" : "text-gray-400"}`}
              onClick={() => setMode("login")}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 z-10 font-semibold transition-colors duration-300 ${mode === "signup" ? "text-gray-900" : "text-gray-400"}`}
              onClick={() => setMode("signup")}
            >
              Sign Up
            </button>
          </div>
          <div className="mt-2">
            {mode === "login" ? (
              <LoginForm onGoogle={handleGoogle} />
            ) : (
              <SignupForm onGoogle={handleGoogle} />
            )}
          </div>
        </div>
      </div>
    
    </div>
  );
}
