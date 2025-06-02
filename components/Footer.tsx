
import React from 'react';

interface FooterProps {
  onAboutUsClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAboutUsClick }) => {
  const currentYear = new Date().getFullYear();
  const footerLinkClasses = "hover:text-sky-300 transform hover:scale-[1.03] transition-all duration-200 ease-in-out inline-block";
  const footerButtonClasses = `${footerLinkClasses} bg-transparent border-none p-0 cursor-pointer text-gray-400`;
  
  return (
    <footer className="bg-gray-800 text-gray-400 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <h5 className="font-bold text-lg text-white mb-4">Kobac</h5>
            <p className="text-sm leading-relaxed">Your destination for finding the perfect rental property. Explore thousands of listings with ease and confidence.</p>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-4">Quick Links</h5>
            <ul className="space-y-2.5">
              <li>
                <button type="button" onClick={onAboutUsClick} className={footerButtonClasses} aria-label="Learn more about Kobac">
                  About Us
                </button>
              </li>
              <li><a href="#" className={footerLinkClasses}>Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-4">Support</h5>
            <ul className="space-y-2.5">
              <li><a href="#" className={footerLinkClasses}>FAQs</a></li>
              <li><a href="#" className={footerLinkClasses}>Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Kobac Inc. All rights reserved. Inspired by Zillow and modern rental platforms.</p>
        </div>
      </div>
    </footer>
  );
};
