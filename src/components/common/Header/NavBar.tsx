'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { usePathname } from 'next/navigation';
import { Login } from '../../dialog/Login';

type Language = 'en' | 'sv' | 'ar';

interface NavigationItem {
  name: string;
  href: string;
  dropdown?: boolean;
  items?: {
    name: string;
    href: string;
  }[];
}

const navigationTranslations: Record<Language, NavigationItem[]> = {
  en: [
    { name: 'Home', href: '/' },
    { name: 'Price List', href: '/price-list' },
    { name: 'Handledarkurs', href: '/handledarkurs' },
    { name: 'Riskettan', href: '/riskettan' },
    { name: 'Halkbana', href: '/halkbana' },
    { name: 'Taxi', href: '/taxi' },
    {
      name: 'Info',
      href: '/info/about',
      dropdown: true,
      items: [
        { name: 'About Us', href: '/info/about' },
        { name: 'FAQ', href: '/info/faq' },
        { name: 'Terms', href: '/info/terms' },
      ],
    },
    { name: 'Contact', href: '/contact' },
  ],
  sv: [
    { name: 'Hem', href: '/' },
    { name: 'Prislista', href: '/price-list' },
    { name: 'Handledarkurs', href: '/handledarkurs' },
    { name: 'Riskettan', href: '/riskettan' },
    { name: 'Halkbana', href: '/halkbana' },
    {
      name: 'Info',
      href: '',
      dropdown: true,
      items: [
        { name: 'Om oss', href: '/info/about' },
        { name: 'FAQ', href: '/info/faq' },
        { name: 'Villkor', href: '/info/terms' },
      ],
    },
    { name: 'Kontakt', href: '/contact' },
  ],
  ar: [
    { name: 'الرئيسية', href: '/' },
    { name: 'قائمة الأسعار', href: '/price-list' },
    { name: 'دورة القيادة', href: '/handledarkurs' },
    { name: 'ريسكيتان', href: '/riskettan' },
    {
      name: 'معلومات',
      href: '/info/about',
      dropdown: true,
      items: [
        { name: 'معلومات عنا', href: '/info/about' },
        { name: 'الأسئلة الشائعة', href: '/info/faq' },
        { name: 'الشروط', href: '/info/terms' },
      ],
    },
    { name: 'اتصل بنا', href: '/contact' },
  ],
};

const languages = [
  {
    flag: 'https://cdn-icons-png.flaticon.com/512/197/197374.png',
    name: 'English',
    code: 'en',
  },
  {
    flag: 'https://cdn-icons-png.flaticon.com/512/197/197564.png',
    name: 'Swedish',
    code: 'sv',
  },
  {
    flag: 'https://cdn-icons-png.flaticon.com/512/323/323301.png',
    name: 'Arabic',
    code: 'ar',
  },
];

interface NavBarProps {
  lang?: Language;
}

export default function NavBar({ lang = 'en' }: NavBarProps) {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const pathname = usePathname();
  const [loginOpen, setLoginOpen] = useState(false);
  const navigationItems = navigationTranslations[lang];
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages.find((l) => l.code === lang) || languages[0]
  );

  const handleDropdownToggle = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <>
      <div
        className="bg-white flex items-center h-[56px]  lg:h-[96px] "
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="w-full xl:w-[1320px] mx-auto px-4 xl:px-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={75}
                  height={35}
                  className="w-[75px] h-[35px]"
                />
              </Link>
            </div>

            <nav className="hidden xl:flex">
              <ul className="flex space-x-4 xl:space-x-8 items-center h-full">
                {navigationItems.map((item, index) => (
                  <li key={index} className="relative group">
                    {item.dropdown ? (
                      <div
                        onMouseEnter={() => handleDropdownToggle(index)}
                        onMouseLeave={() => handleDropdownToggle(index)}
                        className="relative"
                      >
                        <Link
                          href={item.href}
                          className="flex items-center font-raleway font-medium space-x-1 text-16 leading-[1.4] tracking-[0.5%] transition-colors duration-200"
                        >
                          <span
                            className={`${
                              pathname.startsWith(item.href)
                                ? 'text-blue-500'
                                : 'text-gray-700 group-hover:text-blue-500'
                            }`}
                          >
                            {item.name}
                          </span>
                          <Image
                            src="/icons/arrow.svg"
                            alt="Dropdown Icon"
                            width={16}
                            height={16}
                            className={`ml-1 transition-transform duration-200 w-[14px] h-auto ${
                              activeDropdown === index ? 'rotate-180' : ''
                            }`}
                          />
                        </Link>
                        {activeDropdown === index && (
                          <ul className="absolute bg-white shadow-lg mt-2 rounded-md p-2 space-y-2 min-w-[160px] z-10">
                            {item.items?.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  href={subItem.href}
                                  className="block px-3 py-2 font-raleway text-gray-700 hover:text-blue-500 hover:bg-gray-50 rounded transition-colors duration-200"
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`font-raleway font-medium text-base leading-[1.4] tracking-[0.5%] transition-colors duration-200 ${
                          pathname === item.href
                            ? 'text-blue-500'
                            : 'text-gray-700 hover:text-blue-500'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* mobile menu */}
            <div
              className="fixed top-0 left-0 bg-[#0063D5] h-full w-full z-30 p-5 md:hidden overflow-hidden"
              style={{
                transform: isMobile ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              <div className="relative w-full h-full">
                <Button
                  className="bg-white text absolute top-0 right-0"
                  variant={'link'}
                  onClick={() => setIsMobile(false)}
                >
                  <IoCloseSharp />
                </Button>
                <nav className="flex w-full h-full">
                  <ul className="flex flex-col justify-center w-full h-full items-center space-y-5">
                    {navigationItems.map((item, index) => (
                      <li key={index} className="relative group">
                        {item.dropdown ? (
                          <div
                            onMouseEnter={() => handleDropdownToggle(index)}
                            onMouseLeave={() => handleDropdownToggle(index)}
                            className="relative"
                          >
                            <Link
                              href={item.href}
                              onClick={() => setIsMobile(false)}
                              className={`flex items-center space-x-1 font-raleway font-medium text-16 leading-[1.4] tracking-[0.5%] transition-colors duration-200 ${
                                pathname === item.href
                                  ? 'text-custom-1'
                                  : 'text-white'
                              }`}
                            >
                              <span>{item.name}</span>
                              <Image
                                src="/icons/arrow.svg"
                                alt="Dropdown Icon"
                                width={16}
                                height={16}
                                className={`ml-1 transition-transform duration-200 w-[14px] h-auto brightness-[8.5] ${
                                  activeDropdown === index ? 'rotate-180' : ''
                                }`}
                              />
                            </Link>
                            {activeDropdown === index && (
                              <ul className="absolute bg-white shadow-lg mt-2 rounded-md p-2 space-y-2 min-w-[160px] z-10">
                                {item.items?.map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    <Link
                                      href={subItem.href}
                                      onClick={() => setIsMobile(false)}
                                      className="block px-3 py-2 font-raleway text-gray-700 hover:text-blue-500 hover:bg-gray-50 rounded transition-colors duration-200"
                                    >
                                      {subItem.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setIsMobile(false)}
                            className={`font-raleway font-medium text-18 leading-[1.4] tracking-[0.5%] transition-colors duration-200 ${
                              pathname === item.href
                                ? 'text-[#fa8282]'
                                : 'text-white'
                            }`}
                          >
                            {item.name}
                          </Link>
                        )}
                      </li>
                    ))}
                    <li>
                      <Button
                        className="bg-white px-6  w-[120px] h-[48px] rounded-full font-raleway font-medium text-16 text-blue-600 hover:bg-white transition-colors duration-200 "
                        onClick={() => setLoginOpen(true)}
                      >
                        Login
                      </Button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Right side (Login + Language + Menu icon) */}
            <div className="flex items-center space-x-2 lg:space-x-6 h-full">
              <Button
                className="bg-blue-500 px-6  w-[120px] h-[48px] rounded-full font-raleway font-medium text-16 text-white hover:bg-blue-600 transition-colors duration-200 lg:block hidden"
                onClick={() => setLoginOpen(true)}
              >
                Login
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border border-blue-500 bg-transparent text-gray-700 px-1 lg:px-3 w-[46px] h-[24px] lg:w-[152px] lg:h-[48px] rounded-full font-raleway font-medium text-16 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center lg:space-x-2">
                        <Image
                          src={selectedLanguage.flag}
                          height={24}
                          width={24}
                          alt={`${selectedLanguage.name} Flag`}
                          className="rounded-full w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]"
                          unoptimized
                        />
                        <span className="lg:block hidden">
                          {selectedLanguage.name}
                        </span>
                      </div>
                      <Image
                        src="/icons/arrow.svg"
                        alt="Dropdown Icon"
                        width={14}
                        height={16}
                        className="w-[9.33px] lg:ml-1  lg:w-[14px] h-auto"
                      />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={selectedLanguage.code}
                    onValueChange={(value) => {
                      const lang = languages.find((l) => l.code === value);
                      if (lang) setSelectedLanguage(lang);
                    }}
                  >
                    {languages.map((language) => (
                      <DropdownMenuRadioItem
                        key={language.code}
                        value={language.code}
                        className="flex items-center space-x-2"
                      >
                        <Image
                          src={language.flag}
                          height={20}
                          width={20}
                          alt={`${language.name} Flag`}
                          className="rounded-full"
                          unoptimized
                        />
                        <span>{language.name}</span>
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Menu Icon for Mobile */}
              <div className=" xl:hidden block">
                <Button variant={'ghost'} onClick={() => setIsMobile(true)}>
                  <Image
                    src="/icons/menu.svg"
                    alt="Menu Icon"
                    width={24}
                    height={24}
                    className="w-[24px] h-[24px]"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <Login open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
