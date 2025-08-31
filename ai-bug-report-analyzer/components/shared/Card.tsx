
import React from 'react';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ icon, title, children }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg shadow-lg ring-1 ring-white/10">
      <div className="p-5">
        <div className="flex items-center mb-3">
          <span className="text-blue-400 mr-3">{icon}</span>
          <h3 className="text-md font-semibold text-white tracking-wide">{title}</h3>
        </div>
        <div className="text-gray-300">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
