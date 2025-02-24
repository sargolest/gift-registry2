// src/app/list/[listId]/page.js
import React from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Header from '@/components/Layout/Header';
import GiftItem from '@/components/GiftList/GiftItem';
import ShareLink from '@/components/GiftList/ShareLink';
import AddGiftForm from '@/components/GiftList/AddGiftForm';

export default async function ListPage({ params }) {
  const { listId } = params;
  const session = await getServerSession();
  
  if (!session) {
    redirect('/');
  }
  
  // دریافت اطلاعات لیست از Firestore
  const listRef = doc(db, 'lists', listId);
  const listSnap = await getDoc(listRef);
  
  if (!listSnap.exists()) {
    redirect('/dashboard');
  }
  
  const list = {
    id: listSnap.id,
    ...listSnap.data()
  };
  
  // بررسی دسترسی کاربر
  const isOwner = list.userId === session.user.id;
  const items = list.items || [];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{list.title}</h1>
            {list.description && (
              <p className="text-gray-600 mt-1">{list.description}</p>
            )}
          </div>
          
          <ShareLink listId={listId} />
        </div>
        
        {isOwner && (
          <div className="mb-8">
            <AddGiftForm listId={listId} />
          </div>
        )}
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-lg font-semibold p-4 border-b">لیست هدایا</h2>
          
          {items.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-600">
                {isOwner 
                  ? 'هنوز هیچ هدیه‌ای به لیست اضافه نشده است. با استفاده از فرم بالا، هدایای مورد نظر خود را اضافه کنید.' 
                  : 'هنوز هیچ هدیه‌ای به لیست اضافه نشده است.'}
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {items.map((item, index) => (
                <GiftItem 
                  key={item.id || index} 
                  item={item} 
                  listId={listId} 
                  isOwner={isOwner}
                  index={index}
                />
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}