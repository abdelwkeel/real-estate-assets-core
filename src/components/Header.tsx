"use client";

import { signOut } from "next-auth/react";

interface HeaderProps {
  userName: string;
}

export default function Header({ userName }: HeaderProps) {
  return (
    <header className="w-full p-4 bg-gray-800 text-white flex justify-between items-center">
      <h2 className="text-2xl font-bold">مرحبًا {userName}</h2>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="bg-red-500 px-4 py-2 rounded"
      >
        تسجيل الخروج
      </button>
    </header>
  );
}
