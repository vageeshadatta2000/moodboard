import React, { useEffect, useState } from 'react';
import { PinData } from '../types';
import { DownloadIcon, CloseIcon } from './icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  pin: PinData | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, pin }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // A tiny delay to allow the component to mount before starting the animation
      requestAnimationFrame(() => setIsAnimating(true));
    } else {
      setIsAnimating(false);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    // Wait for animation to finish before calling onClose
    setTimeout(onClose, 300);
  };

  const handleDownload = () => {
    if (!pin) return;
    const link = document.createElement('a');
    link.href = pin.imageUrl;
    // Sanitize description for filename
    const fileName = pin.description.replace(/[^a-z0-9]/gi, '_').slice(0, 50);
    link.download = `${fileName}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  if (!isOpen && !isAnimating) {
    return null;
  }

  if (!pin) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)'}}
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden modal-content ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-2/3 h-64 md:h-auto bg-gray-200 flex items-center justify-center">
            <img src={pin.imageUrl} alt={pin.description} className="w-full h-full object-contain" />
        </div>
        <div className="w-full md:w-1/3 p-6 flex flex-col">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">{pin.description}</h3>
          <div className="mt-auto space-y-3">
            <button
                onClick={handleDownload}
                className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg flex items-center justify-center font-semibold hover:bg-indigo-700 transition-colors"
            >
                <DownloadIcon className="w-5 h-5 mr-2" />
                Download
            </button>
            <button
                onClick={handleClose}
                className="w-full bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg flex items-center justify-center font-semibold hover:bg-gray-300 transition-colors"
            >
                Close
            </button>
          </div>
        </div>
        <button onClick={handleClose} className="absolute top-4 right-4 text-white md:text-gray-500 hover:text-gray-800" aria-label="Close modal">
            <CloseIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
