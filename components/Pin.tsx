import React from 'react';
import { PinData } from '../types';

interface PinProps {
  pin: PinData;
  onClick: (pin: PinData) => void;
}

const Pin: React.FC<PinProps> = ({ pin, onClick }) => {
  return (
    <button
      onClick={() => onClick(pin)}
      className="group relative block w-full overflow-hidden rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      aria-label={`View details for ${pin.description}`}
    >
      <img
        src={pin.imageUrl}
        alt={pin.description}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <p className="text-white text-sm line-clamp-2">{pin.description}</p>
      </div>
    </button>
  );
};

export default Pin;