import "../globals.css";
import Header from "../components/ui/Header";
import AuthProvider from "../components/AuthProvider";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: "#F8FAFC" }}>
        <AuthProvider>
          <Header />
          <main className="max-w-4xl mx-auto p-3 block w-full">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
