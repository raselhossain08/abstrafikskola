'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { headerApi } from '@/lib/headerApi';

export interface IconData {
  url: string;
  publicId: string;
  alt: string;
}

export interface ContactIcon {
  phone: IconData;
  email: IconData;
  location: IconData;
  whatsapp: IconData;
}

export interface HeaderContactInfo {
  location: string;
  email: string;
  phone: string;
  whatsapp: string;
  icons: ContactIcon;
}

export interface SocialMediaItem {
  url: string;
  icon: IconData;
}

export interface HeaderSocialMedia {
  facebook: SocialMediaItem;
  instagram: SocialMediaItem;
  twitter?: SocialMediaItem;
  linkedin?: SocialMediaItem;
  youtube?: SocialMediaItem;
}

export interface HeaderTopHeader {
  contact: HeaderContactInfo;
  socialMedia: HeaderSocialMedia;
}

export interface NavigationIcon {
  url: string;
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  component?: string;
}

export interface Logo {
  url: string;
  publicId: string;
  alt: string;
  width: number;
  height: number;
}

export interface HeaderDropdownItem {
  id: string;
  name: string;
  href: string;
  icon: IconData;
}

export interface HeaderMenuItem {
  id: string;
  name: string;
  href: string;
  hasDropdown: boolean;
  icon: IconData;
  dropdownItems: HeaderDropdownItem[];
}

export interface HeaderNavigation {
  logo: Logo;
  hamburger: NavigationIcon;
  close: NavigationIcon;
  dropdown: NavigationIcon;
  menuItems: HeaderMenuItem[];
}

export interface HeaderLanguage {
  code: string;
  name: string;
  flag: IconData;
  direction: 'ltr' | 'rtl';
  isDefault: boolean;
}

export interface HeaderContent {
  topHeader: HeaderTopHeader;
  navigation: HeaderNavigation;
  languages: HeaderLanguage[];
  loginButton: string;
  meta: {
    version: string;
    direction: 'ltr' | 'rtl';
  };
}

export interface UseHeaderContentReturn {
  headerContent: HeaderContent | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useHeaderContent = (): UseHeaderContentReturn => {
  const { language } = useLanguage();
  const [headerContent, setHeaderContent] = useState<HeaderContent | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Transform API response to component-friendly format - Updated for new backend format
  const transformApiResponse = (apiData: any): HeaderContent => {
    // Handle the new backend response structure
    const data = apiData.data || apiData; // Handle both response.data and direct data formats
    
    return {
      topHeader: {
        contact: {
          location: data.contact?.find((item: any) => item.type === 'location')?.text || '',
          email: data.contact?.find((item: any) => item.type === 'email')?.text || '',
          phone: data.contact?.find((item: any) => item.type === 'phone')?.text || '',
          whatsapp: data.contact?.find((item: any) => item.type === 'whatsapp')?.text || '',
          icons: {
            location: {
              url: data.contact?.find((item: any) => item.type === 'location')?.icon || '',
              publicId: '',
              alt: 'Location Icon',
            },
            email: {
              url: data.contact?.find((item: any) => item.type === 'email')?.icon || '',
              publicId: '',
              alt: 'Email Icon',
            },
            phone: {
              url: data.contact?.find((item: any) => item.type === 'phone')?.icon || '',
              publicId: '',
              alt: 'Phone Icon',
            },
            whatsapp: {
              url: data.contact?.find((item: any) => item.type === 'whatsapp')?.icon || '',
              publicId: '',
              alt: 'WhatsApp Icon',
            },
          },
        },
        socialMedia: {
          facebook: {
            url: data.social?.find((item: any) => item.platform === 'facebook')?.text || '',
            icon: {
              url: data.social?.find((item: any) => item.platform === 'facebook')?.icon || '',
              publicId: '',
              alt: 'Facebook Icon',
            },
          },
          instagram: {
            url: data.social?.find((item: any) => item.platform === 'instagram')?.text || '',
            icon: {
              url: data.social?.find((item: any) => item.platform === 'instagram')?.icon || '',
              publicId: '',
              alt: 'Instagram Icon',
            },
          },
          twitter: {
            url: data.social?.find((item: any) => item.platform === 'twitter')?.text || '',
            icon: {
              url: data.social?.find((item: any) => item.platform === 'twitter')?.icon || '',
              publicId: '',
              alt: 'Twitter Icon',
            },
          },
          linkedin: {
            url: data.social?.find((item: any) => item.platform === 'linkedin')?.text || '',
            icon: {
              url: data.social?.find((item: any) => item.platform === 'linkedin')?.icon || '',
              publicId: '',
              alt: 'LinkedIn Icon',
            },
          },
        },
      },
      navigation: {
        logo: {
          url: data.logo?.image?.url || '/logo.svg',
          publicId: '',
          alt: data.logo?.image?.alt || 'Company Logo',
          width: data.logo?.image?.width || 75,
          height: data.logo?.image?.height || 35,
        },
        hamburger: {
          url: data.icons?.menu?.url || '/icons/menu.svg',
          publicId: '',
          alt: data.icons?.menu?.alt || 'Menu Icon',
          width: data.icons?.menu?.width || 24,
          height: data.icons?.menu?.height || 24,
        },
        close: {
          url: data.icons?.close?.url || '/icons/close.svg',
          publicId: '',
          alt: data.icons?.close?.alt || 'Close Icon',
          component: data.icons?.close?.component || 'IoCloseSharp',
        },
        dropdown: {
          url: data.icons?.arrow?.url || '/icons/arrow.svg',
          publicId: '',
          alt: data.icons?.arrow?.alt || 'Dropdown Arrow',
          width: data.icons?.arrow?.width || 16,
          height: data.icons?.arrow?.height || 16,
        },
        menuItems: (data.navigation || []).map((item: any) => ({
          id: item.id,
          name: item.name,
          href: item.href,
          hasDropdown: item.dropdown || false,
          icon: {
            url: item.icon?.url || '',
            publicId: '',
            alt: 'Menu Icon',
          },
          dropdownItems: (item.items || []).map((subItem: any) => ({
            id: subItem.id,
            name: subItem.name,
            href: subItem.href,
            icon: {
              url: subItem.icon?.url || '',
              publicId: '',
              alt: 'Menu Icon',
            },
          })),
        })),
      },
      languages: (data.languages || []).map((lang: any) => ({
        code: lang.code,
        name: lang.name,
        flag: {
          url: lang.flag,
          publicId: '',
          alt: `${lang.name} Flag`,
        },
        direction: lang.direction || 'ltr',
        isDefault: lang.isDefault || false,
      })),
      loginButton: data.buttons?.login?.text || 'Login',
      meta: {
        version: '1.0',
        direction: 'ltr',
      },
    };
  };

  const fetchHeaderContent = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Use headerApi to fetch active header content
      const response = await headerApi.getActiveHeader(language);

      if (response.success && response.data) {
        const transformedData = transformApiResponse(response.data);
        setHeaderContent(transformedData);
        console.log(`✅ Header content loaded for language: ${language}`);
      } else {
        throw new Error(response.message || 'Failed to load header content from API');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch header content';
      setError(errorMessage);
      console.error('❌ Error fetching header content:', errorMessage);
      
      // Don't set fallback - components will handle no data state
      setHeaderContent(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch header content when language changes
  useEffect(() => {
    fetchHeaderContent();
  }, [language]);

  const refetch = async () => {
    await fetchHeaderContent();
  };

  return {
    headerContent,
    isLoading,
    error,
    refetch,
  };
};
