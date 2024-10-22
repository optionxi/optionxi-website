import React from 'react';

const GridBackground = () => {
  return (
    <div className="fixed inset-0 z-0 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="absolute inset-0">
        <div className="w-full h-full grid grid-cols-12 gap-4">
          {Array(144).fill(null).map((_, index) => (
            <div key={index} className="border-t border-l border-gray-700 opacity-20"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridBackground;