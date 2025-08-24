'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslatedText } from '@/components/common/TranslatedText';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

export const WebsiteTranslationExample: React.FC = () => {
  const { language, isRTL } = useLanguage();

  return (
    <div className={`min-h-screen p-6 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header Section */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            <TranslatedText text="ABS Trafikskola - Learn to Drive Safely" />
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            <TranslatedText text="Professional driving lessons in Södertälje. Get your driver's license with confidence!" />
          </p>
          
          {/* Language Switcher */}
          <div className="flex justify-center mb-8">
            <LanguageSwitcher variant="buttons" showFlags />
          </div>
          
          <div className="text-sm text-gray-500 mb-8">
            <TranslatedText text="Current Language:" /> <strong>{language.toUpperCase()}</strong>
            {isRTL && <span className="ml-2">(<TranslatedText text="Right-to-Left" />)</span>}
          </div>
        </div>

        {/* Navigation Menu Example */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            <TranslatedText text="Website Navigation" />
          </h2>
          <nav className="flex flex-wrap gap-4 justify-center">
            {[
              'Home',
              'Price List', 
              'Driving Courses',
              'Risk Training',
              'Slippery Road Training',
              'About Us',
              'Contact'
            ].map((item, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <TranslatedText text={item} />
              </button>
            ))}
          </nav>
        </div>

        {/* Course Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-3 text-blue-600">
              <TranslatedText text="Beginner Course" />
            </h3>
            <p className="text-gray-600 mb-4">
              <TranslatedText text="Perfect for new drivers. Learn all the basics of driving safely on Swedish roads." />
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              <TranslatedText text="Book Now" />
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-3 text-green-600">
              <TranslatedText text="Intensive Course" />
            </h3>
            <p className="text-gray-600 mb-4">
              <TranslatedText text="Get your license faster with our intensive driving program. Complete in just 2 weeks!" />
            </p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
              <TranslatedText text="Learn More" />
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-3 text-purple-600">
              <TranslatedText text="Advanced Training" />
            </h3>
            <p className="text-gray-600 mb-4">
              <TranslatedText text="Improve your driving skills with advanced techniques and safety training." />
            </p>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
              <TranslatedText text="Enroll Today" />
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            <TranslatedText text="Contact Information" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2 text-gray-700">
                <TranslatedText text="Address" />
              </h4>
              <p className="text-gray-600">
                <TranslatedText text="Dolsgatan 1, 15133 Södertälje, Sweden" />
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-gray-700">
                <TranslatedText text="Contact Details" />
              </h4>
              <p className="text-gray-600">
                <TranslatedText text="Phone: 08 550 66666" /><br />
                <TranslatedText text="Email: info@abstrafikskola.se" />
              </p>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            <TranslatedText text="Why Choose ABS Trafikskola?" />
          </h2>
          <ul className="space-y-3">
            {[
              'Experienced and certified instructors',
              'Modern training vehicles with dual controls',
              'Flexible scheduling to fit your needs',
              'Competitive pricing with payment plans',
              'High pass rate for driving tests',
              'Multilingual instruction available'
            ].map((feature, index) => (
              <li key={index} className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">
                  <TranslatedText text={feature} />
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            <TranslatedText text="Ready to Start Your Driving Journey?" />
          </h2>
          <p className="text-lg mb-6 opacity-90">
            <TranslatedText text="Join thousands of successful drivers who learned with ABS Trafikskola!" />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              <TranslatedText text="Book Your First Lesson" />
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              <TranslatedText text="View Price List" />
            </button>
          </div>
        </div>

        {/* Translation Status */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            <TranslatedText text="Translation Status" />
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <TranslatedText text="✅ All text on this page is automatically translated when you change the language" />
            </p>
            <p>
              <TranslatedText text="✅ Right-to-left (RTL) layout is automatically applied for Arabic" />
            </p>
            <p>
              <TranslatedText text="✅ Language preference is saved in cookies" />
            </p>
            <p>
              <TranslatedText text="✅ Google Cloud Translation API provides high-quality translations" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
