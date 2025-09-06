import React, { useState } from 'react';

const PlatformSelector = ({ selectedPlatforms, onPlatformChange, onConfirm }) => {
  const platforms = [
    { id: 'twitter', name: 'Twitter', icon: '𝕏', color: 'bg-black text-white', description: 'Short-form posts and threads' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'bg-blue-600 text-white', description: 'Professional networking content' },
    { id: 'reddit', name: 'Reddit', icon: '🔴', color: 'bg-orange-500 text-white', description: 'Community discussions' },
    { id: 'youtube', name: 'YouTube', icon: '📺', color: 'bg-red-600 text-white', description: 'Video content and descriptions' },
    { id: 'instagram', name: 'Instagram', icon: '📸', color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white', description: 'Visual storytelling' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'bg-black text-white', description: 'Short-form video scripts' }
  ];

  const handlePlatformToggle = (platformId) => {
    const newSelected = selectedPlatforms.includes(platformId)
      ? selectedPlatforms.filter(id => id !== platformId)
      : [...selectedPlatforms, platformId];
    onPlatformChange(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedPlatforms.length === platforms.length) {
      onPlatformChange([]);
    } else {
      onPlatformChange(platforms.map(p => p.id));
    }
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Select Platforms</h3>
          <p className="text-sm text-gray-600">Choose which social media platforms you want content for</p>
        </div>
        <button
          onClick={handleSelectAll}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          {selectedPlatforms.length === platforms.length ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id);
          return (
            <div
              key={platform.id}
              onClick={() => handlePlatformToggle(platform.id)}
              className={`
                relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <div className="flex items-start space-x-3">
                <div className={`
                  flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg
                  ${platform.color}
                `}>
                  {platform.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900">{platform.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{platform.description}</p>
                </div>
                {isSelected && (
                  <div className="flex-shrink-0">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''} selected
        </div>
        <button
          onClick={onConfirm}
          disabled={selectedPlatforms.length === 0}
          className={`
            px-4 py-2 rounded-lg font-medium text-sm transition-colors
            ${selectedPlatforms.length > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          Generate Content for {selectedPlatforms.length} Platform{selectedPlatforms.length !== 1 ? 's' : ''}
        </button>
      </div>
    </div>
  );
};

export default PlatformSelector;

