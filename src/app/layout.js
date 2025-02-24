// src/app/layout.js
import { Inter, Vazirmatn } from 'next/font/google';
import './globals.css';
import { getServerSession } from 'next-auth/next';
import SessionProvider from '@/components/Auth/SessionProvider';

// فونت فارسی وزیرمتن
const vazirmatn = Vazirmatn({ 
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

export const metadata = {
  title: 'رجیستری هدایا',
  description: 'اپلیکیشن ثبت و مدیریت لیست هدایای مورد علاقه',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.variable} font-sans bg-gray-50 min-h-screen`}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}