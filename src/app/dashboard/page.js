// src/app/dashboard/page.js
import React from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import CreateList from '@/components/GiftList/CreateList';
import ListCard from '@/components/GiftList/ListCard';
import Header from '@/components/Layout/Header';

export default async function DashboardPage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/');
  }
  
  // دریافت لیست‌های کاربر از Firestore
  const userId = session.user.id;
  const listQuery = query(collection(db, 'lists'), where('userId', '==', userId));
  const snapshot = await getDocs(listQuery);
  
  const lists = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">داشبورد من</h1>
          <CreateList />
        </div>
        
        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">لیست‌های من</h2>
          
          {lists.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-md">
              <p className="text-gray-600">شما هنوز هیچ لیستی نساخته‌اید</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lists.map((list) => (
                <ListCard key={list.id} list={list} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}