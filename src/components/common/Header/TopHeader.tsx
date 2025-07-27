import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { type Language } from '@/contexts/LanguageContext';

// Define types for the translations
type Translations = {
  location: string;
  email: string;
  phone: string;
  whatsapp: string;
};

// Translation objects
const translations: Record<Language, Translations> = {
  en: {
    location: 'Dalgatan 11, 15133 Södertälje',
    email: 'info@abstrafikskola.se',
    phone: '08 598 66666',
    whatsapp: '073 998 8241',
  },
  sv: {
    location: 'Dalagatan 1 L, 15133 Södertälje',
    email: 'info@abstrafikskola.se',
    phone: '08 598 66666',
    whatsapp: '073 998 8241',
  },
  ar: {
    location: 'دالاغاتان 1 لتر، 15133 سودرتاليا',
    email: 'info@abstrafikskola.se',
    phone: '08 598 66666',
    whatsapp: '073 998 8241',
  },
};

interface TopHeaderProps {
  lang?: Language;
  isScrolled?: boolean;
}

export default function TopHeader({
  lang = 'en',
  isScrolled = false,
}: TopHeaderProps) {
  const t = translations[lang];

  return (
    <div
      className={`bg-error-red-500 py-[8px] md:py-[20px] md:max-h-[64px] transition-all duration-300 ${
        isScrolled ? 'md:py-[8px] md:max-h-[40px]' : ''
      }`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="w-full xl:w-[1320px] mx-auto px-5 xl:px-0">
        <div className="flex w-full justify-between items-center">
          {/* Location */}
          <div className="items-center space-x-1 lg:flex hidden">
            <Image
              src="/icons/location.svg"
              alt="Location Icon"
              width={24}
              height={24}
              className="w-[24px] h-[24px]"
            />
            <span className="font-normal text-base leading-[140%] tracking-[0.5%] text-16 text-white md:block hidden">
              {t.location}
            </span>
          </div>

          <div className="flex items-center space-x-2 lg:space-x-8">
            <div className="md:hidden flex items-center space-x-1">
              <Image
                src="/icons/location.svg"
                alt="Location Icon"
                width={24}
                height={24}
                className="w-[16px] h-[16px] md:w-[24px] md:h-[24px]"
              />
            </div>
            {/* Email */}
            <div className="flex items-center space-x-1">
              <Image
                src="/icons/message.svg"
                alt="message Icon"
                width={24}
                height={24}
                className="w-[16px] h-[16px] md:w-[24px] md:h-[24px]"
              />
              <Link
                href="mailto:info@skärholmskola.se"
                className="hover:underline font-normal text-base leading-[140%] tracking-[0.5%] text-16 text-white lg:block hidden"
              >
                {t.email}
              </Link>
            </div>
            {/* Phone */}
            <div className="flex items-center space-x-1">
              <Image
                src="/icons/phone.svg"
                alt="phone Icon"
                width={24}
                height={24}
                className="w-[16px] h-[16px] md:w-[24px] md:h-[24px]"
              />
              <Link
                href="tel:0859866666"
                className="hover:underline font-normal text-base leading-[140%] tracking-[0.5%] text-16 text-white lg:block hidden"
              >
                {t.phone}
              </Link>
            </div>
            {/* WhatsApp */}
            <div className="flex items-center space-x-1">
              <Image
                src="/icons/whatsapp.svg"
                alt="whatsapp Icon"
                width={24}
                height={24}
                className="w-[16px] h-[16px] md:w-[24px] md:h-[24px]"
              />
              <Link
                href="https://wa.me/46739988241"
                className="hover:underline font-normal text-base leading-[140%] tracking-[0.5%] text-16 text-white lg:block hidden"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.whatsapp}
              </Link>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-3 text-base">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/facebook.svg"
                alt="facebook Icon"
                width={24}
                height={24}
                className="w-auto h-[16px] md:h-[24px]"
              />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/instagram.svg"
                alt="instagram Icon"
                width={24}
                height={24}
                className="w-[16px] h-[16px] md:w-[24px] md:h-[24px]"
              />
            </Link>

          </div>
        </div>

        {/* mobile */}
      </div>
    </div>
  );
}
