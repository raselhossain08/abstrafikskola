import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { type Language } from '@/contexts/LanguageContext';
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

  // Only use API data - no static fallbacks
  const contact = headerContent?.topHeader?.contact;
  const socialMedia = headerContent?.topHeader?.socialMedia;

  // Don't render if data is not loaded yet or if there's an error
  if (isLoading || error || !contact || !socialMedia) {
    return null;
  }

  return (
    <div
      className={`bg-error-red-500 py-[8px] md:py-[20px] md:max-h-[64px] transition-all duration-300 ${
        isScrolled ? 'md:py-[8px] md:max-h-[40px]' : ''
      }`}
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
              {typeof contact.location === 'string' 
                ? contact.location 
                : (contact.location as any)?.[lang] || (contact.location as any)?.en || 'Location not available'}
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
                alt="Email Icon"
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
              <Image
                src="/icons/phone.svg"
                alt="Phone Icon"
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
              <Image
                src="/icons/whatsapp.svg"
                alt="WhatsApp Icon"
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
            {socialMedia.facebook && (
              <Link
                href={typeof socialMedia.facebook === 'string' ? socialMedia.facebook : socialMedia.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/icons/facebook.svg"
                  alt="Facebook Icon"
                  width={24}
                  height={24}
                  className="w-auto h-[16px] md:h-[24px]"
                />
              </Link>
            )}
            {socialMedia.instagram && (
              <Link
                href={typeof socialMedia.instagram === 'string' ? socialMedia.instagram : socialMedia.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/icons/instagram.svg"
                  alt="Instagram Icon"
                  width={24}
                  height={24}
                  className="w-[16px] h-[16px] md:w-[24px] md:h-[24px]"
                />
              </Link>
            )}
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
