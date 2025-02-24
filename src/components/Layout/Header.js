// src/components/Layout/Header.js
'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href={session ? '/dashboard' : '/'} className="text-xl font-bold text-indigo-600">
            رجیستری هدایا
          </Link>
          
          {session && (
            <nav className="flex items-center space-x-6 rtl:space-x-reverse">
              <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600">
                داشبورد
              </Link>
              
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-gray-700 hover:text-red-600"
              >
                خروج
              </button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}