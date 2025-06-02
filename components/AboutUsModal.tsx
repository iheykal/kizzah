
import React, { useRef } from 'react';
import { XMarkIcon } from './ui/Icons.tsx';
import { Button } from './ui/Button.tsx';

interface AboutUsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const AboutUsModal: React.FC<AboutUsModalProps> = ({ isVisible, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleAnimationEnd = () => {
    // Unmounting logic is handled by App.tsx after animation duration
  };

  const modalClasses = `fixed inset-0 flex items-center justify-center p-4 z-50 ${
    isVisible ? 'modal-enter-active' : 'modal-leave-active'
  }`;

  const aboutUsText = "Kobac is a visionary platform dedicated to simplifying your journey in the real estate world. Whether you're looking to rent your dream home, find the perfect tenant, or explore investment opportunities, Kobac provides intuitive tools and comprehensive listings. Our mission is to connect people with properties seamlessly, fostering a community built on trust, innovation, and unparalleled user experience. We are passionate about leveraging technology to make real estate accessible and enjoyable for everyone. Welcome to the future of property browsing with Kobac.";

  return (
    <div
      ref={modalRef}
      className={modalClasses}
      onClick={onClose}
      onAnimationEnd={handleAnimationEnd}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-us-modal-title"
      aria-hidden={!isVisible}
    >
      <div className="modal-backdrop fixed inset-0 bg-black" /> {/* Uses global animation for backdrop */}
      <div
        className="modal-content-wrapper bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative p-6 md:p-10" // Uses global animation for content
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 bg-white/70 hover:bg-red-100/80 rounded-full p-2 transition-all duration-300 ease-out z-20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transform hover:rotate-90 hover:scale-110"
          aria-label="Close About Us"
        >
          <XMarkIcon className="w-7 h-7" />
        </button>
        <h2 
            id="about-us-modal-title" 
            className="text-3xl md:text-4xl font-bold text-sky-700 mb-6 md:mb-8 text-center anim-fadeInUp"
            style={{animationDelay: '0s'}}
        >
          About Kobac
        </h2>
        <div 
            className="prose prose-slate prose-lg max-w-none prose-p:leading-relaxed anim-fadeInUp" 
            style={{animationDelay: '0.1s'}}
        >
          <p>{aboutUsText}</p>
        </div>
        <div 
            className="mt-8 md:mt-10 pt-6 border-t border-gray-200 text-right anim-fadeInUp"
            style={{animationDelay: '0.2s'}}
        >
          <Button variant="primary" onClick={onClose} size="lg">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};