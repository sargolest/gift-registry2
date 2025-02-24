// src/components/GiftList/ShareLink.js
'use client';

import React, { useState } from 'react';

export default function ShareLink({ listId }) {
  const [copied, setCopied] = useState(false);
  
  // ساخت لینک قابل اشتراک‌گذاری
  const shareLink = typeof window !== 'undefined' 
    ? `${window.location.origin}/list/${listId}` 
    : '';
  
  // کپی کردن لینک
  function copyLink() {
    if (!shareLink) return;
    
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  }
  
  // اشتراک‌گذاری از طریق API مرورگر (اگر پشتیبانی شود)
  function shareViaNavigator() {
    if (navigator.share) {
      navigator.share({
        title: 'لیست هدایای من',
        text: 'لیست هدایای مورد علاقه من را ببینید',
        url: shareLink
      })
      .catch(err => {
        console.error('Error sharing: ', err);
      });
    } else {
      copyLink();
    }
  }

  return (
    <div className="flex items-center">
      <button
        onClick={shareViaNavigator}
        className="flex items-center py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
        </svg>
        {copied ? 'کپی شد!' : 'اشتراک‌گذاری'}
      </button>
    </div>
  );
}