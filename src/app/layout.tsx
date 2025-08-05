import "../globals.css";

import Header from "../components/ui/Header";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: "#F8FAFC" }}>
        <Header />
        <main className=" max-w-2xl mx-auto p-3 block w-full">{children}</main>

      </body>
    </html>
  );
}
