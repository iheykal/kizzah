
import React from 'react';
import { Button } from './ui/Button.tsx';
import { LoginIcon, LogoutIcon, PlusIcon } from './ui/Icons.tsx'; // Added PlusIcon for consistency

interface HeaderProps {
  onAddListingClick: () => void;
  isAdminLoggedIn: boolean;
  onAdminLoginClick: () => void;
  onLogoutClick: () => void;
}

const kobacLogoUrl = "https://i.postimg.cc/Z5J0s3DL/493841939-122181515270310428-8319815765703423295-n.jpg";

export const Header: React.FC<HeaderProps> = ({ 
  onAddListingClick, 
  isAdminLoggedIn,
  onAdminLoginClick,
  onLogoutClick
}) => {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 md:h-28">
          <div className="flex items-center">
            <a 
              href="#" 
              className="flex items-center text-gray-800 hover:text-blue-700 transition-all duration-200 ease-in-out transform hover:scale-105 group"
              aria-label="Kobac Home"
            >
              <img 
                src={kobacLogoUrl} 
                alt="Kobac Real Estate Logo" 
                className="h-20 sm:h-24 w-auto mr-2 transition-all duration-200"
              />
              <span className="font-bold text-3xl sm:text-4xl tracking-tight text-blue-600 group-hover:text-blue-700 transition-colors">Kobac</span>
            </a>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <nav className="hidden md:flex space-x-1">
              {['Buy', 'Rent', 'Sell', 'Home Loans', 'Agent Finder'].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className="text-gray-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out hover:bg-blue-50 transform hover:-translate-y-0.5"
                  aria-label={item}
                >
                  {item}
                </a>
              ))}
            </nav>
            {isAdminLoggedIn ? (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onAddListingClick}
                  className="text-blue-600 hover:bg-blue-100/70"
                  leftIcon={<PlusIcon className="w-4 h-4" />}
                  aria-label="Add new listing"
                >
                  Add Listing
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={onLogoutClick}
                  className="text-red-600 hover:bg-red-100 border-red-200 hover:border-red-300"
                  leftIcon={<LogoutIcon className="w-4 h-4" />}
                  aria-label="Logout"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onAdminLoginClick}
                className="text-blue-600 hover:bg-blue-100/70"
                leftIcon={<LoginIcon className="w-4 h-4" />}
                aria-label="Admin Login"
              >
                Admin Login
              </Button>
            )}
            {/* Mobile menu button can be added here if needed, with ARIA attributes */}
          </div>
        </div>
      </div>
    </header>
  );
};
