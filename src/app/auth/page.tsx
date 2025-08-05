"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";

function AuthContent() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'OAuthAccountNotLinked') {
      setErrorMessage("An account with this email already exists. Please sign in with your email and password, or use the same method you used to create your account.");
    } else if (error === 'AccessDenied') {
      setErrorMessage("Access was denied. Please try again.");
    } else if (error === 'Configuration') {
      setErrorMessage("There was a configuration error. Please contact support.");
    } else if (error) {
      setErrorMessage("An authentication error occurred. Please try again.");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full flex items-start justify-center bg-[#f7f9fb] px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-1">Book Catalogue</h1>
          <p className="text-gray-500 text-center mb-6">Welcome back to your reading journey</p>
          
          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}

          {/* Toggle */}
          <div className="flex mb-6 bg-gray-100 p-1 rounded-lg overflow-hidden relative">
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
              <LoginForm  />
            ) : (
              <SignupForm />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f7f9fb]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}
