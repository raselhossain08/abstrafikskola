'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LoginModal from './LoginModal';

const UserMenu: React.FC = () => {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const { language } = useLanguage();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const translations = {
    en: {
      login: 'Login',
      profile: 'Profile',
      logout: 'Logout',
      welcome: 'Welcome',
    },
    sv: {
      login: 'Logga in',
      profile: 'Profil',
      logout: 'Logga ut',
      welcome: 'Välkommen',
    },
    ar: {
      login: 'تسجيل الدخول',
      profile: 'الملف الشخصي',
      logout: 'تسجيل الخروج',
      welcome: 'مرحباً',
    },
  };

  const t = translations[language];

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {t.login}
        </button>
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
      >
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <span className="hidden md:block">
          {t.welcome}, {user?.name}
        </span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsDropdownOpen(false)}
            >
              {t.profile}
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {t.logout}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
