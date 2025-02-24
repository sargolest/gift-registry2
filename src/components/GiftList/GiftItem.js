// src/components/GiftList/GiftItem.js
'use client';

import React, { useState } from 'react';
import { doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function GiftItem({ item, listId, isOwner, index }) {
  const [updating, setUpdating] = useState(false);
  const router = useRouter();
  
  const { id, name, link, price, priority, note, purchased } = item;
  
  // رنگ نشان‌دهنده اولویت
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'خیلی بالا': return 'bg-red-100 text-red-800';
      case 'بالا': return 'bg-orange-100 text-orange-800';
      case 'متوسط': return 'bg-blue-100 text-blue-800';
      case 'پایین': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // تغییر وضعیت خرید
  async function togglePurchased() {
    if (updating) return;
    setUpdating(true);
    
    try {
      const listRef = doc(db, 'lists', listId);
      
      // حذف آیتم فعلی
      await updateDoc(listRef, {
        items: arrayRemove(item)
      });
      
      // اضافه کردن آیتم با وضعیت به‌روز شده
      const updatedItem = {
        ...item,
        purchased: !purchased
      };
      
      await updateDoc(listRef, {
        items: arrayUnion(updatedItem),
        updatedAt: new Date().toISOString()
      });
      
      router.refresh();
    } catch (error) {
      console.error('Error updating gift item:', error);
      alert('خطایی رخ داد. لطفا دوباره تلاش کنید');
    } finally {
      setUpdating(false);
    }
  }
  
  // حذف آیتم
  async function deleteItem() {
    if (!confirm('آیا مطمئن هستید که می‌خواهید این مورد را حذف کنید؟')) return;
    
    setUpdating(true);
    
    try {
      const listRef = doc(db, 'lists', listId);
      
      await updateDoc(listRef, {
        items: arrayRemove(item),
        updatedAt: new Date().toISOString()
      });
      
      router.refresh();
    } catch (error) {
      console.error('Error deleting gift item:', error);
      alert('خطایی رخ داد. لطفا دوباره تلاش کنید');
    } finally {
      setUpdating(false);
    }
  }

  return (
    <li className={`p-4 ${purchased ? 'bg-gray-50' : ''}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className={`text-lg font-medium ${purchased ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {name}
            </h3>
            <span className={`mr-2 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(priority)}`}>
              {priority}
            </span>
          </div>
          
          {price && (
            <p className="text-gray-600 mt-1">
              قیمت تقریبی: {parseInt(price).toLocaleString('fa-IR')} تومان
            </p>
          )}
          
          {note && (
            <p className="text-gray-600 mt-1 text-sm">
              {note}
            </p>
          )}
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-4 rtl:space-x-reverse">
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            مشاهده و خرید
          </a>
          
          <button
            onClick={togglePurchased}
            disabled={updating}
            className={`px-3 py-1 rounded-md text-sm font-medium ${purchased 
              ? 'text-yellow-700 bg-yellow-100 hover:bg-yellow-200' 
              : 'text-green-700 bg-green-100 hover:bg-green-200'}`}
          >
            {purchased ? 'برگشت به لیست' : 'خریداری شد'}
          </button>
          
          {isOwner && (
            <button
              onClick={deleteItem}
              disabled={updating}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              حذف
            </button>
          )}
        </div>
      </div>
    </li>
  );
}