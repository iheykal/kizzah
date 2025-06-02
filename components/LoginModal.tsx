import React, { useState, useRef, FormEvent, ChangeEvent, useEffect } from 'react';
import { Button } from './ui/Button.tsx';
import { Input } from './ui/Input.tsx';
import { XMarkIcon } from './ui/Icons.tsx';

interface LoginModalProps {
  isVisible: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => boolean; // Returns true on success, false on failure
}

export const LoginModal: React.FC<LoginModalProps> = ({ isVisible, onClose, onLogin }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleAnimationEnd = () => {
    // Unmounting logic handled by App.tsx
    if (isVisible && emailInputRef.current) {
      emailInputRef.current.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Email and Password cannot be empty.");
      if (!email && emailInputRef.current) {
        emailInputRef.current.focus();
      } else if (!password && passwordInputRef.current) {
        passwordInputRef.current.focus();
      }
      return;
    }
    const loginSuccess = onLogin(email, password);
    if (!loginSuccess) {
      setError("Incorrect email or password. Please try again.");
      setEmail(''); // Clear email field on error
      setPassword(''); // Clear password field on error
      emailInputRef.current?.focus();
    }
    // On success, App.tsx will handle closing the modal via onLogin
  };
  
  useEffect(() => {
    if (!isVisible) {
      setEmail('');
      setPassword('');
      setError(null);
    } else if (emailInputRef.current) {
        setTimeout(() => emailInputRef.current?.focus(), 50); 
    }
  }, [isVisible]);


  const fieldStyling = "block w-full rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/60 placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-slate-100 text-base py-2.5 px-4 shadow-sm hover:border-slate-400 dark:hover:border-slate-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:shadow-2xl focus:bg-white dark:focus:bg-slate-700 transition-all duration-250 ease-in-out";
  const labelStyling = "block text-slate-700 dark:text-slate-300 font-semibold text-sm mb-2";


  const modalClasses = `fixed inset-0 flex items-center justify-center p-4 z-50 ${
    isVisible ? 'modal-enter-active' : 'modal-leave-active'
  }`;

  return (
    <div
      ref={modalRef}
      className={modalClasses}
      onClick={onClose}
      onAnimationEnd={handleAnimationEnd}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      aria-hidden={!isVisible}
    >
      <div className="modal-backdrop fixed inset-0 bg-black" />
      <div
        className="modal-content-wrapper bg-gradient-to-br from-slate-100 to-gray-100 dark:from-slate-800 dark:to-gray-900 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative p-6 md:p-10 border border-slate-200 dark:border-slate-700"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 dark:hover:text-red-400 bg-transparent hover:bg-red-100 dark:hover:bg-red-700/30 rounded-full p-2 transition-all duration-300 ease-out z-10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transform hover:rotate-90 hover:scale-110"
          aria-label="Close login form"
        >
          <XMarkIcon className="w-7 h-7" />
        </button>

        <h2 id="login-modal-title" className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-8 md:mb-10 text-center anim-fadeInUp" style={{animationDelay: '0s'}}>
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <div className="anim-fadeInUp" style={{animationDelay: '0.1s'}}>
            <label htmlFor="email" className={labelStyling}>Email</label>
            <Input
              ref={emailInputRef}
              id="email"
              type="text" // Changed to text as per user request "123"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              placeholder="Enter admin email"
              className={fieldStyling}
              aria-describedby={error ? "login-error" : undefined}
            />
          </div>
          <div className="anim-fadeInUp" style={{animationDelay: '0.15s'}}>
            <label htmlFor="password" className={labelStyling}>Password</label>
            <Input
              ref={passwordInputRef}
              id="password"
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              placeholder="Enter admin password"
              className={fieldStyling}
              aria-describedby={error ? "login-error" : undefined}
            />
          </div>

          {error && (
            <p id="login-error" role="alert" className="text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-md p-3 text-center anim-fadeInUp" style={{animationDelay: '0.2s'}}>
              {error}
            </p>
          )}

          <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-4 space-y-3 sm:space-y-0 pt-8 md:pt-10 border-t border-slate-300 dark:border-slate-600 mt-10 md:mt-12 anim-fadeInUp" style={{animationDelay: '0.25s'}}>
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              className="w-full sm:w-auto"
              size="lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="w-full sm:w-auto"
              size="lg"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};