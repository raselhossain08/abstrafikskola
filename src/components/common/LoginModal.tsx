'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login, register, isLoading } = useAuth();
  const { language } = useLanguage();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');

  const translations = {
    en: {
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      name: 'Full Name',
      phone: 'Phone (Optional)',
      loginButton: 'Sign In',
      registerButton: 'Sign Up',
      switchToRegister: "Don't have an account? Sign up",
      switchToLogin: 'Already have an account? Sign in',
      close: 'Close',
    },
    sv: {
      login: 'Logga in',
      register: 'Registrera',
      email: 'E-post',
      password: 'Lösenord',
      name: 'Fullständigt namn',
      phone: 'Telefon (Valfritt)',
      loginButton: 'Logga in',
      registerButton: 'Registrera dig',
      switchToRegister: 'Har du inget konto? Registrera dig',
      switchToLogin: 'Har du redan ett konto? Logga in',
      close: 'Stäng',
    },
    ar: {
      login: 'تسجيل الدخول',
      register: 'التسجيل',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      name: 'الاسم الكامل',
      phone: 'الهاتف (اختياري)',
      loginButton: 'تسجيل الدخول',
      registerButton: 'إنشاء حساب',
      switchToRegister: 'ليس لديك حساب؟ سجل الآن',
      switchToLogin: 'لديك حساب بالفعل؟ سجل الدخول',
      close: 'إغلاق',
    },
  };

  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      let result;
      if (isLoginMode) {
        result = await login(formData.email, formData.password);
      } else {
        result = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        });
      }

      if (result.success) {
        onClose();
        setFormData({ name: '', email: '', password: '', phone: '' });
      } else {
        setError(result.message || 'An error occurred');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {isLoginMode ? t.login : t.register}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.name}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLoginMode}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.email}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.password}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {!isLoginMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.phone}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading
              ? 'Loading...'
              : isLoginMode
                ? t.loginButton
                : t.registerButton}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setError('');
              setFormData({ name: '', email: '', password: '', phone: '' });
            }}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            {isLoginMode ? t.switchToRegister : t.switchToLogin}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
