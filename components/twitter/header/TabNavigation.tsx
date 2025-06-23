"use client";

import { useState } from 'react';

export function TabNavigation() {
  const [activeTab, setActiveTab] = useState('for-you');

  const tabs = [
    { id: 'for-you', label: 'For you' },
    { id: 'following', label: 'Following' },
  ];

  return (
    <div className="flex space-x-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`font-semibold pb-3 transition-colors ${
            activeTab === tab.id
              ? 'text-white border-b-2 border-blue-500'
              : 'text-gray-500 hover:text-white'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}