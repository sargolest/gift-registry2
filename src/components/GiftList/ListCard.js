// src/components/GiftList/ListCard.js
import React from 'react';
import Link from 'next/link';
import ShareLink from './ShareLink';

export default function ListCard({ list }) {
  const { id, title, description, items = [], createdAt } = list;
  const itemCount = items.length;
  const purchasedCount = items.filter(item => item.purchased).length;
  
  // تبدیل تاریخ به فرمت فارسی
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{description}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>
            آیتم‌ها: {itemCount} | خریداری شده: {purchasedCount}
          </span>
          <span>
            {formatDate(createdAt)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <Link 
            href={`/list/${id}`}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            مشاهده و ویرایش
          </Link>
          
          <ShareLink listId={id} />
        </div>
      </div>
    </div>
  );
}