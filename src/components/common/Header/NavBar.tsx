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
import React, { useState, useEffect } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { usePathname, useRouter } from 'next/navigation';
import { Login } from '../../dialog/Login';
import { useLanguage, type Language } from '@/contexts/LanguageContext';
import { useHeaderContent } from '@/hooks/useHeaderContent';

interface NavBarProps {
  lang?: Language;
  isScrolled?: boolean;
}

export default function NavBar({
  lang = 'en',
  isScrolled = false,
}: NavBarProps) {
  // All hooks must be declared before any conditional returns
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<any>(null);
  
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const { headerContent, isLoading, error } = useHeaderContent();

  // Extract data from headerContent safely
  const navigationItems = headerContent?.navigation?.menuItems || [];
  const languages = headerContent?.languages || [];
  const loginButton = headerContent?.loginButton || { en: 'Login', sv: 'Logga in', ar: 'تسجيل الدخول' };

  // Keep layout consistent - no RTL for the main container
  const isRTLContent = language === 'ar';
  const textDirection = isRTLContent ? 'rtl' : 'ltr';

  // Get multilingual content based on current language
  const getLocalizedText = (textObj: any) => {
    if (typeof textObj === 'string') return textObj;
    return textObj?.[language] || textObj?.en || textObj;
  };

  const loginButtonText =
    getLocalizedText(headerContent?.loginButton) ||
    (language === 'ar'
      ? 'تسجيل الدخول'
      : language === 'sv'
        ? 'Logga in'
        : 'Login');

  // Initialize selectedLanguage after languages are loaded
  useEffect(() => {
    if (languages.length > 0) {
      setSelectedLanguage(
        languages.find((l) => l.code === language) || languages[0]
      );
    }
  }, [languages, language]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if click is outside any dropdown
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  // Handle mobile menu and close dropdowns when mobile menu opens
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = 'hidden';
      setActiveDropdown(null); // Close any open dropdowns when mobile menu opens
    } else {
      document.body.style.overflow = 'unset';
      setActiveDropdown(null); // Close any open dropdowns when mobile menu closes
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile]);

  // Handler functions
  const handleLanguageChange = (newLang: string) => {
    const languageObj = languages.find((l) => l.code === newLang);
    if (languageObj) {
      setLanguage(newLang as Language);
      setSelectedLanguage(languageObj);
    }
  };

  const handleDropdownToggle = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleMobileMenuToggle = () => {
    setIsMobile(!isMobile);
    setActiveDropdown(null); // Close any open dropdowns
  };

  const handleSubmenuClick = (href: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    console.log('Submenu clicked:', href); // Debug log
    setActiveDropdown(null);
    
    // Use router.push for navigation with a small delay to ensure dropdown closes
    setTimeout(() => {
      console.log('Navigating to:', href); // Debug log
      router.push(href);
    }, 100);
  };

  // Don't render if essential data is not loaded yet
  if (!headerContent || navigationItems.length === 0 || !selectedLanguage) {
    return (
      <div className={`h-16 flex items-center justify-center ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}>
        <div className="text-gray-500 text-sm">Loading navigation...</div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile menu backdrop */}
      {isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={() => {
            setIsMobile(false);
            setActiveDropdown(null);
          }}
        />
      )}
      
      <div
        className={`bg-white flex items-center h-[56px] lg:h-[96px] transition-all duration-300 ${
          isScrolled ? 'lg:h-[70px] shadow-md' : ''
        }`}
      >
        <div className="w-full xl:w-[1320px] mx-auto px-4 xl:px-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/img/logo.svg"
                  alt="Company Logo"
                  width={75}
                  height={35}
                  className="w-[75px] h-[35px]"
                />
              </Link>
            </div>

            <nav className="hidden xl:flex">
              <ul className="flex space-x-4 xl:space-x-8 items-center h-full">
                {navigationItems.map((item, index) => (
                  <li key={item.id} className="relative group">
                    {item.hasDropdown ? (
                      <div className="relative dropdown-container">
                        <button
                          onClick={() => handleDropdownToggle(index)}
                          className="flex items-center font-raleway font-medium space-x-1 text-16 leading-[1.4] tracking-[0.5%] transition-colors duration-200"
                        >
                          <span
                            className={`${
                              pathname.startsWith('/info')
                                ? 'text-blue-500'
                                : 'text-gray-700 hover:text-blue-500'
                            }`}
                            dir={textDirection}
                          >
                            {getLocalizedText(item.name)}
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
                        </button>
                        {activeDropdown === index && (
                          <ul className="absolute bg-white shadow-lg mt-2 rounded-md p-2 space-y-2 min-w-[190px] z-50">
                            {item.dropdownItems?.map((subItem, subIndex) => (
                              <li key={subItem.id}>
                                <button
                                  onClick={() => handleSubmenuClick(subItem.href)}
                                  className="text-14 w-full text-left px-3 py-2 font-raleway text-gray-700 hover:text-blue-500 hover:bg-gray-50 rounded transition-colors duration-200"
                                  dir={textDirection}
                                >
                                  {getLocalizedText(subItem.name)}
                                </button>
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
                        dir={textDirection}
                      >
                        {getLocalizedText(item.name)}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* mobile menu */}
            <div
              className={`fixed top-0 left-0 bg-[#0063D5] h-full w-full z-50 p-5 xl:hidden overflow-hidden transition-transform duration-300 ease-in-out ${
                isMobile ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <div className="relative w-full h-full">
                <Button
                  className="bg-white text-gray-700 absolute top-0 right-0 hover:bg-gray-100"
                  variant={'outline'}
                  size="sm"
                  onClick={() => {
                    setIsMobile(false);
                    setActiveDropdown(null);
                  }}
                  aria-label="Close mobile menu"
                >
                  <IoCloseSharp className="w-5 h-5" />
                </Button>
                <nav className="flex w-full h-full overflow-y-auto">
                  <div className="flex flex-col justify-start w-full h-full items-center space-y-5 py-16">
                    {navigationItems.map((item, index) => (
                      <div key={item.id} className="w-full max-w-xs">
                        {item.hasDropdown ? (
                          <div className="w-full">
                            <button
                              onClick={() => handleDropdownToggle(index)}
                              className={`flex items-center justify-center space-x-1 font-raleway font-medium text-16 leading-[1.4] tracking-[0.5%] transition-colors duration-200 w-full ${
                                pathname.startsWith('/info')
                                  ? 'text-custom-1'
                                  : 'text-white'
                              }`}
                            >
                              <span dir={textDirection}>
                                {getLocalizedText(item.name)}
                              </span>
                              <Image
                                src="/icons/arrow.svg"
                                alt="Dropdown Icon"
                                width={16}
                                height={16}
                                className={`ml-1 transition-transform duration-200 w-[14px] h-auto brightness-[8.5] ${
                                  activeDropdown === index ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                            {activeDropdown === index && (
                              <div className="mt-3 w-full animate-in slide-in-from-top-2 duration-200">
                                <div className="bg-white/10 backdrop-blur-sm rounded-md p-2 space-y-2 border border-white/20">
                                  {item.dropdownItems?.map(
                                    (subItem, subIndex) => (
                                      <div key={subItem.id}>
                                        <button
                                          onClick={() => {
                                            setActiveDropdown(null);
                                            setIsMobile(false);
                                            handleSubmenuClick(subItem.href);
                                          }}
                                          className="w-full px-3 py-2 font-raleway text-white/90 hover:text-white hover:bg-white/10 rounded transition-colors duration-200 text-center text-14"
                                          dir={textDirection}
                                        >
                                          {getLocalizedText(subItem.name)}
                                        </button>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setIsMobile(false)}
                            className={`font-raleway font-medium text-18 leading-[1.4] tracking-[0.5%] transition-colors duration-200 block text-center ${
                              pathname === item.href
                                ? 'text-[#fa8282]'
                                : 'text-white'
                            }`}
                            dir={textDirection}
                          >
                            {getLocalizedText(item.name)}
                          </Link>
                        )}
                      </div>
                    ))}
                    <div className="w-full max-w-xs pt-4">
                      <Button
                        className="bg-white px-6 w-full h-[48px] rounded-full font-raleway font-medium text-16 text-blue-600 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => {
                          setLoginOpen(true);
                          setIsMobile(false);
                        }}
                        dir={textDirection}
                      >
                        {loginButtonText}
                      </Button>
                    </div>
                  </div>
                </nav>
              </div>
            </div>

            {/* Right side (Login + Language + Menu icon) */}
            <div className="flex items-center space-x-2 lg:space-x-6 h-full">
              <Button
                className="bg-blue-500 px-6  w-[120px] h-[48px] rounded-full font-raleway font-medium text-16 text-white hover:bg-blue-600 transition-colors duration-200 lg:block hidden"
                onClick={() => setLoginOpen(true)}
                dir={textDirection}
              >
                {loginButtonText}
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
                          src={typeof selectedLanguage.flag === 'string' ? selectedLanguage.flag : selectedLanguage.flag?.url || '/icons/default-flag.svg'}
                          height={24}
                          width={24}
                          alt={`${getLocalizedText(selectedLanguage.name)} Flag`}
                          className="rounded-full w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]"
                          unoptimized
                        />
                        <span className="lg:block hidden">
                          {getLocalizedText(selectedLanguage.name)}
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
                  <DropdownMenuLabel>
                    {language === 'ar' ? 'اختر اللغة' : language === 'sv' ? 'Välj språk' : 'Select Language'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={selectedLanguage.code}
                    onValueChange={handleLanguageChange}
                  >
                    {languages.map((lang) => (
                      <DropdownMenuRadioItem
                        key={lang.code}
                        value={lang.code}
                        className={`flex items-center space-x-2 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}
                      >
                        <Image
                          src={typeof lang.flag === 'string' ? lang.flag : lang.flag?.url || '/icons/default-flag.svg'}
                          height={20}
                          width={20}
                          alt={`${getLocalizedText(lang.name)} Flag`}
                          className="rounded-full"
                          unoptimized
                        />
                        <span>{getLocalizedText(lang.name)}</span>
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Menu Icon for Mobile */}
              <div className="xl:hidden block">
                <Button 
                  variant={'ghost'} 
                  onClick={handleMobileMenuToggle}
                  className="p-2 hover:bg-gray-100 transition-colors"
                  aria-label="Open mobile menu"
                >
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
