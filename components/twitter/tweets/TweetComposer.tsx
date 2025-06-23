"use client";

import { useState } from 'react';
import { Image, Smile, Calendar, MapPin } from 'lucide-react';

export function TweetComposer() {
  const [tweetText, setTweetText] = useState('');
  const maxLength = 280;

  const handleSubmit = () => {
    if (tweetText.trim()) {
      console.log('Posting tweet:', tweetText);
      setTweetText('');
    }
  };

  return (
    <div className="border-b border-gray-800 p-4">
      <div className="flex space-x-3">
        <img
          src="https://via.placeholder.com/40x40/1f2937/ffffff?text=U"
          alt="Your Avatar"
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        <div className="flex-1">
          <textarea
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            placeholder="What is happening?!"
            className="w-full bg-transparent text-xl placeholder-gray-500 resize-none border-none outline-none min-h-[60px]"
            maxLength={maxLength}
          />
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-4 text-blue-500">
              <button className="hover:bg-blue-500/10 p-2 rounded-full transition-colors">
                <Image className="w-5 h-5" />
              </button>
              <button className="hover:bg-blue-500/10 p-2 rounded-full transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <button className="hover:bg-blue-500/10 p-2 rounded-full transition-colors">
                <Calendar className="w-5 h-5" />
              </button>
              <button className="hover:bg-blue-500/10 p-2 rounded-full transition-colors">
                <MapPin className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              {tweetText.length > 0 && (
                <span className={`text-sm ${
                  tweetText.length > maxLength * 0.9 
                    ? 'text-red-500' 
                    : tweetText.length > maxLength * 0.8 
                    ? 'text-yellow-500' 
                    : 'text-gray-500'
                }`}>
                  {maxLength - tweetText.length}
                </span>
              )}
              <button
                onClick={handleSubmit}
                disabled={!tweetText.trim() || tweetText.length > maxLength}
                className={`font-bold py-1.5 px-4 rounded-full transition-colors ${
                  tweetText.trim() && tweetText.length <= maxLength
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-blue-500/50 text-white/50 cursor-not-allowed'
                }`}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}