import React from 'react';
import { PinData } from '../types';
import Pin from './Pin';

interface MoodBoardGridProps {
  pins: PinData[];
  onPinClick: (pin: PinData) => void;
}

const MoodBoardGrid: React.FC<MoodBoardGridProps> = ({ pins, onPinClick }) => {
  if (!pins || pins.length === 0) {
    return (
        <div className="text-center py-16 text-slate-600">
            <p>Your creative space awaits.</p>
            <p className="text-sm">Enter a theme above to begin generating your mood board.</p>
        </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {pins.map((pin, index) => (
          <div key={pin.id} className="mb-4 break-inside-avoid pin-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <Pin pin={pin} onClick={onPinClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodBoardGrid;