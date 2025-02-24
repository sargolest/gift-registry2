// src/components/GiftList/AddGiftForm.js
'use client';

import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function AddGiftForm({ listId }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [price, setPrice] = useState('');
  const [priority, setPriority] = useState('متوسط');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !link) return;
    
    setLoading(true);
    
    try {
      // ساخت آیتم جدید
      const newItem = {
        id: Date.now().toString(), // یک ID ساده برای شناسایی آیتم
        name,
        link,
        price: price || null,
        priority,
        note: note || null,
        purchased: false,
        createdAt: new Date().toISOString()
      };
      
      // به‌روزرسانی لیست در Firestore
      const listRef = doc(db, 'lists', listId);
      await updateDoc(listRef, {
        items: arrayUnion(newItem),
        updatedAt: new Date().toISOString()
      });
      
      // پاک کردن فرم
      setName('');
      setLink('');
      setPrice('');
      setPriority('متوسط');
      setNote('');
      
      // رفرش کردن صفحه
      router.refresh();
    } catch (error) {
      console.error('Error adding gift item:', error);
      alert('خطایی رخ داد. لطفا دوباره تلاش کنید');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium mb-4">افزودن هدیه جدید</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              نام هدیه *
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="مثال: ساعت هوشمند سامسونگ"
            />
          </div>
          
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-700">
              لینک خرید *
            </label>
            <input
              id="link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://..."
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              قیمت تقریبی (تومان)
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="مثال: 1500000"
            />
          </div>
          
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              اولویت
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="پایین">پایین</option>
              <option value="متوسط">متوسط</option>
              <option value="بالا">بالا</option>
              <option value="خیلی بالا">خیلی بالا</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            یادداشت (اختیاری)
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="توضیحات اضافه، رنگ، سایز و..."
          ></textarea>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'در حال افزودن...' : 'افزودن به لیست'}
          </button>
        </div>
      </form>
    </div>
  );
}