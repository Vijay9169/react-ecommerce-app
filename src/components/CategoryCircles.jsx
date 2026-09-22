import React from 'react';

const categoryData = [
  { 
    name: 'Electronics', 
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&auto=format&fit=crop&q=80' 
  },
  { 
    name: 'Fashion', 
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=300&auto=format&fit=crop' 
  },
  { 
    name: 'Home & Living', 
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&auto=format&fit=crop&q=80' 
  },
  { 
    name: 'Beauty', 
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&auto=format&fit=crop&q=80' 
  },
  { 
    name: 'Sports', 
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80' 
  },
  { 
    name: 'Toys', 
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=300&auto=format&fit=crop&q=80' 
  },
  { 
    name: 'All', 
    label: 'More', 
    isMore: true 
  }
];

export default function CategoryCircles({ selectedCategory, onSelectCategory }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
      {/* Scrollable Container without browser scrollbars */}
      <div className="flex items-center justify-between gap-6 sm:gap-8 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-3 px-2">
        {categoryData.map((item) => {
          const isSelected = selectedCategory.toLowerCase() === item.name.toLowerCase();
          
          if (item.isMore) {
            return (
              <button
                key={item.label}
                onClick={() => onSelectCategory(item.name)}
                className="flex flex-col items-center gap-2.5 flex-shrink-0 group focus:outline-none"
              >
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 flex items-center justify-center bg-white transition-all duration-200 ${
                  isSelected 
                    ? 'border-blue-500 shadow-md ring-2 ring-blue-100' 
                    : 'border-blue-400 group-hover:border-blue-600 group-hover:shadow-sm'
                }`}>
                  <span className="text-gray-500 group-hover:text-blue-600 text-2xl font-black tracking-widest leading-none mb-1">
                    •••
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-blue-600 group-hover:underline">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.name}
              onClick={() => onSelectCategory(item.name)}
              className="flex flex-col items-center gap-2.5 flex-shrink-0 group focus:outline-none"
            >
              {/* Outer Circular Ring with subtle border shadow */}
              <div 
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-white border border-gray-200 shadow-sm transition-all duration-200 ${
                  isSelected 
                    ? 'ring-2 ring-blue-500 border-transparent scale-105' 
                    : 'group-hover:scale-105 group-hover:shadow-md'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className={`text-xs sm:text-sm font-medium transition-colors ${
                isSelected 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-800 group-hover:text-blue-600'
              }`}>
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}