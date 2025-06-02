
import React, { useRef } from 'react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from './ui/Icons.tsx';

interface FullscreenImageViewerProps {
  isVisible: boolean;
  imageUrl: string;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  currentIndex: number;
  totalImages: number;
}

export const FullscreenImageViewer: React.FC<FullscreenImageViewerProps> = ({ 
  isVisible,
  imageUrl, 
  onClose, 
  onNext, 
  onPrevious,
  currentIndex,
  totalImages
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleAnimationEnd = () => {
    if (!isVisible && modalRef.current) {
      // App.tsx's onClose now handles unmounting after animation
    }
  };

  const showNavigationButtons = totalImages > 1;
  
  const modalClasses = `fixed inset-0 flex items-center justify-center p-4 z-[60] ${
    isVisible ? 'modal-enter-active' : 'modal-leave-active' // Using backdrop animation from global
  }`;


  return (
    <div
      ref={modalRef}
      className={modalClasses}
      onClick={onClose} 
      onAnimationEnd={handleAnimationEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen image view"
      aria-hidden={!isVisible}
    >
      <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-90" /> {/* Explicit backdrop for opacity control */}
      
      <div
        className="modal-content-wrapper relative max-w-full max-h-full flex items-center justify-center" // This will use modalEnter/Leave from global
        onClick={e => e.stopPropagation()} 
      >
        <img
          key={imageUrl} // Ensures re-render and transition on src change
          src={imageUrl}
          alt="Fullscreen view"
          className="block max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl transition-opacity duration-300 ease-in-out anim-fadeIn"
          style={{animationDelay: '0s'}}
        />
      </div>

      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white hover:text-gray-300 transition-all duration-200 ease-in-out z-20 p-2.5 bg-black/50 hover:bg-black/70 rounded-full focus:outline-none focus:ring-2 focus:ring-white/70 transform hover:scale-110 active:scale-95"
        aria-label="Close fullscreen image"
      >
        <XMarkIcon className="w-8 h-8" />
      </button>

      {showNavigationButtons && onPrevious && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrevious(); }}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-all duration-200 ease-in-out z-20 p-3 bg-black/50 hover:bg-black/70 rounded-full focus:outline-none focus:ring-2 focus:ring-white/70 transform hover:scale-110 active:scale-95"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="w-9 h-9" />
        </button>
      )}

      {showNavigationButtons && onNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-all duration-200 ease-in-out z-20 p-3 bg-black/50 hover:bg-black/70 rounded-full focus:outline-none focus:ring-2 focus:ring-white/70 transform hover:scale-110 active:scale-95"
          aria-label="Next image"
        >
          <ChevronRightIcon className="w-9 h-9" />
        </button>
      )}
      
      {totalImages > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-sm bg-black/60 px-3.5 py-2 rounded-lg z-20 transition-opacity duration-300 ease-in-out anim-fadeInUp" style={{animationDelay:'0.1s'}}>
          {currentIndex + 1} / {totalImages}
        </div>
      )}
    </div>
  );
};