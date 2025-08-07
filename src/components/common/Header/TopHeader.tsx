import Link from 'next/link';
import React from 'react';
import { type Language } from '@/contexts/LanguageContext';
import { CloudinaryImage } from '@/hooks/useCloudinaryImages';
import { useHeaderContent } from '@/hooks/useHeaderContent';

interface TopHeaderProps {
  lang?: Language;
  isScrolled?: boolean;
}

export default function TopHeader({
  lang = 'en',
  isScrolled = false,
}: TopHeaderProps) {
  const { headerContent, isLoading, error } = useHeaderContent();

  // Use API data or fallback to static data
  const contact = headerContent?.topHeader.contact || {
    location:
      lang === 'ar'
        ? 'دالاغاتان 1 لتر، 15133 سودرتاليا'
        : lang === 'sv'
          ? 'Dalagatan 1 L, 15133 Södertälje'
          : 'Dalgatan 11, 15133 Södertälje',
    email: 'info@abstrafikskola.se',
    phone: '08 598 66666',
    whatsapp: '073 998 8241',
  };

  const socialMedia = headerContent?.topHeader.socialMedia || {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  };

  const direction =
    headerContent?.meta.direction || (lang === 'ar' ? 'rtl' : 'ltr');

  return (
    <div
      className={`bg-error-red-500 py-[8px] md:py-[20px] md:max-h-[64px] transition-all duration-300 ${
        isScrolled ? 'md:py-[8px] md:max-h-[40px]' : ''
      }`}
      dir={direction}
    >
      <div className="w-full xl:w-[1320px] mx-auto px-5 xl:px-0">
        <div className="flex w-full justify-between items-center">
          {/* Location */}
          <div className="items-center space-x-1 lg:flex hidden">
            <CloudinaryImage
              src="/icons/location.svg"
              alt="Location Icon"
              width={24}
              height={24}
              className="w-[24px] h-[24px]"
            />
            <span className="font-normal text-base leading-[140%] tracking-[0.5%] text-16 text-white md:block hidden">
              {contact.location}
            </span>
          </div>

          <div className="flex items-center space-x-2 lg:space-x-8">
            <div className="md:hidden flex items-center space-x-1">
              <CloudinaryImage
                src="/icons/location.svg"
                alt="Location Icon"
                width={24}
                height={24}
                className="w-[16px] h-[16px] md:w-[24px] md:h-[24px]"
              />
            </div>
            {/* Email */}
            <div className="flex items-center space-x-1">
              <CloudinaryImage
                src="/icons/message.svg"
                alt="message Icon"
                width={24}
                height={24}
                className="w-[16px] h-[16px] md:w-[24px] md:h-[24px]"
              />
              <Link
                href={`mailto:${contact.email}`}
                className="hover:underline font-normal text-base leading-[140%] tracking-[0.5%] text-16 text-white lg:block hidden"
              >
                {contact.email}
              </Link>
            </div>
            {/* Phone */}
            <div className="flex items-center space-x-1">
              <CloudinaryImage
                src="/icons/phone.svg"
                alt="phone Icon"
                width={24}
                height={24}
                className="w-[16px] h-[16px] md:w-[24px] md:h-[24px]"
              />
              <Link
                href={`tel:${contact.phone.replace(/\s/g, '')}`}
                className="hover:underline font-normal text-base leading-[140%] tracking-[0.5%] text-16 text-white lg:block hidden"
              >
                {contact.phone}
              </Link>
            </div>
            {/* WhatsApp */}
            <div className="flex items-center space-x-1">
              <CloudinaryImage
                src="/icons/whatsapp.svg"
                alt="whatsapp Icon"
                width={24}
                height={24}
                className="w-[16px] h-[16px] md:w-[24px] md:h-[24px]"
              />
              <Link
                href={`https://wa.me/${contact.whatsapp.replace(/[\s-]/g, '')}`}
                className="hover:underline font-normal text-base leading-[140%] tracking-[0.5%] text-16 text-white lg:block hidden"
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.whatsapp}
              </Link>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-3 text-base">
            <Link
              href={socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CloudinaryImage
                src="/icons/facebook.svg"
                alt="facebook Icon"
                width={24}
                height={24}
                className="w-auto h-[16px] md:h-[24px]"
              />
            </Link>
            <Link
              href={socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CloudinaryImage
                src="/icons/instagram.svg"
                alt="instagram Icon"
                width={24}
                height={24}
                className="w-[16px] h-[16px] md:w-[24px] md:h-[24px]"
              />
            </Link>
          </div>
        </div>

        {/* Loading indicator - only show if data is still loading */}
        {isLoading && (
          <div className="flex justify-center mt-2">
            <div className="text-white text-xs opacity-75">
              Loading header content...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
