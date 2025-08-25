import { cache } from "react";

// API Response interfaces (matching actual backend structure)
export interface FooterSocialLink {
  _id: string;
  id: string;
  platform: string;
  url: string;
  iconUrl: string;
  altText: string;
  width: number;
  height: number;
}

export interface FooterCompanyLink {
  _id: string;
  id: string;
  title: MultiLanguageText | string;
  url: string;
}

export interface FooterContactInfo {
  _id: string;
  id: string;
  type: string;
  value: string;
  iconUrl: string;
  width: number;
  height: number;
  label: string;
}

export interface FooterLogo {
  altText: string;
  imageUrl: string;
  width: number;
  height: number;
}

export interface MultiLanguageText {
  en: string;
  sv: string;
  ar: string;
}

export interface FooterNewsletter {
  _id: string;
  title: MultiLanguageText;
  description: MultiLanguageText;
  placeholder: MultiLanguageText;
  buttonText: MultiLanguageText;
  submittingText: MultiLanguageText;
  successMessage: MultiLanguageText;
  errorMessage: MultiLanguageText;
}

export interface FooterCopyright {
  text: MultiLanguageText;
  developer: MultiLanguageText;
}

export interface FooterSectionTitles {
  companyTitle: MultiLanguageText;
  contactTitle: MultiLanguageText;
  loadingText: MultiLanguageText;
  emailValidationText: MultiLanguageText;
}

// Raw API response structure
export interface FooterDataRaw {
  _id: string;
  logo: FooterLogo;
  description: MultiLanguageText | string;
  socialLinks: FooterSocialLink[];
  companyLinks: FooterCompanyLink[];
  contactInfo: FooterContactInfo[];
  newsletter: FooterNewsletter;
  copyright: FooterCopyright;
  sectionTitles: FooterSectionTitles;
  isActive: boolean;
  version: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Simplified interfaces for component consumption
export interface SocialLink {
  _id: string;
  name: string;
  url: string;
  icon: string;
  alt: string;
  order: number;
}

export interface NavLink {
  _id: string;
  name: string;
  url: string;
  order: number;
}

export interface ContactInfo {
  _id: string;
  type: string;
  value: string;
  link: string;
  icon: string;
  order: number;
}

export interface CompanySection {
  title: string;
  links: NavLink[];
}

export interface ContactsSection {
  title: string;
  contacts: ContactInfo[];
}

export interface SubscribeSection {
  title: string;
  subtitle: string;
  placeholder: string;
  buttonText: string;
}

export interface FooterBottom {
  text: string;
  developerName: string;
}

export interface FooterData {
  _id: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  description: string;
  socialLinks: SocialLink[];
  companySection: CompanySection;
  contactsSection: ContactsSection;
  subscribeSection: SubscribeSection;
  footerBottom: FooterBottom;
  backgroundColor: string;
  createdAt: string;
  updatedAt: string;
}

export interface FooterResponse {
  success: boolean;
  data: FooterDataRaw;
}

// Helper function to extract language-specific data
const extractLanguageData = (rawData: FooterDataRaw, language: string = 'en'): FooterData => {
  const lang = language as keyof MultiLanguageText;
  
  // Helper function to get text value
  const getText = (value: MultiLanguageText | string): string => {
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value !== null) {
      return value[lang] || value.en || '';
    }
    return '';
  };

  // Convert social links
  const socialLinks: SocialLink[] = (rawData.socialLinks || []).map((social, index) => ({
    _id: social._id,
    name: social.platform,
    url: social.url,
    icon: social.iconUrl,
    alt: social.altText,
    order: index + 1
  }));

  // Convert company links
  const companyLinks: NavLink[] = (rawData.companyLinks || []).map((link, index) => ({
    _id: link._id,
    name: getText(link.title),
    url: link.url,
    order: index + 1
  }));

  // Convert contact info
  const contacts: ContactInfo[] = (rawData.contactInfo || []).map((contact, index) => ({
    _id: contact._id,
    type: contact.type,
    value: contact.value,
    link: contact.type === 'email' ? `mailto:${contact.value}` : 
          contact.type === 'phone' ? `tel:${contact.value.replace(/\s/g, '')}` :
          contact.type === 'whatsapp' ? `https://wa.me/${contact.value.replace(/\s/g, '').replace(/^\+?46/, '46')}` : '',
    icon: contact.iconUrl,
    order: index + 1
  }));

  return {
    _id: rawData._id,
    logo: {
      src: rawData.logo.imageUrl,
      alt: rawData.logo.altText,
      width: rawData.logo.width,
      height: rawData.logo.height
    },
    description: getText(rawData.description),
    socialLinks,
    companySection: {
      title: getText(rawData.sectionTitles?.companyTitle),
      links: companyLinks
    },
    contactsSection: {
      title: getText(rawData.sectionTitles?.contactTitle),
      contacts
    },
    subscribeSection: {
      title: getText(rawData.newsletter?.title),
      subtitle: getText(rawData.newsletter?.description),
      placeholder: getText(rawData.newsletter?.placeholder),
      buttonText: getText(rawData.newsletter?.buttonText)
    },
    footerBottom: {
      text: getText(rawData.copyright?.text),
      developerName: getText(rawData.copyright?.developer)
    },
    backgroundColor: "bg-custom-6",
    createdAt: rawData.createdAt,
    updatedAt: rawData.updatedAt
  };
};

// Default fallback data
const defaultFooterData: FooterData = {
  _id: '',
  logo: {
    src: "/logo.svg",
    alt: "ABS Trafikskola Logo",
    width: 75,
    height: 35
  },
  description: "Unlock the road with Södertälje's top Driving school – confidence and competitive prices guaranteed!",
  socialLinks: [
    { _id: '1', name: "Facebook", url: "https://facebook.com", icon: "/icons/footer/facebook.svg", alt: "Facebook", order: 1 },
    { _id: '2', name: "Instagram", url: "https://instagram.com", icon: "/icons/footer/instagram.svg", alt: "Instagram", order: 2 },
    { _id: '3', name: "LinkedIn", url: "https://linkedin.com", icon: "/icons/footer/linkedin.svg", alt: "LinkedIn", order: 3 }
  ],
  companySection: {
    title: "Company",
    links: [
      { _id: '1', name: "About Us", url: "/about", order: 1 },
      { _id: '2', name: "Services", url: "/services", order: 2 },
      { _id: '3', name: "Price List", url: "/price-list", order: 3 },
      { _id: '4', name: "Contact", url: "/contact", order: 4 }
    ]
  },
  contactsSection: {
    title: "Contacts",
    contacts: [
      { _id: '1', type: "email", value: "info@abstrafikskola.se", link: "mailto:info@abstrafikskola.se", icon: "/icons/footer/message.svg", order: 1 },
      { _id: '2', type: "phone", value: "08 598 66666", link: "tel:0859866666", icon: "/icons/footer/phone.svg", order: 2 },
      { _id: '3', type: "whatsapp", value: "073 998 8241", link: "https://wa.me/46739988241", icon: "/icons/footer/whatsapp.svg", order: 3 }
    ]
  },
  subscribeSection: {
    title: "Subscribe to our newsletter",
    subtitle: "Get the latest updates and news from ABS Trafikskola",
    placeholder: "Enter your email",
    buttonText: "Subscribe"
  },
  footerBottom: {
    text: "© 2024 ABS Trafikskola. All Rights Reserved.",
    developerName: "Developed by Rasel Hossain"
  },
  backgroundColor: "bg-custom-6",
  createdAt: '',
  updatedAt: ''
};

export const getFooterData = cache(async (language: string = 'en'): Promise<FooterData> => {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    const response = await fetch(`${API_BASE_URL}/api/footer-content?lang=${language}`, {
      cache: 'force-cache',
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Failed to fetch footer data');
      return defaultFooterData;
    }

    const result: FooterResponse = await response.json();
    
    if (result.success && result.data) {
      return extractLanguageData(result.data, language);
    }

    return defaultFooterData;
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return defaultFooterData;
  }
});

// Client-side fetch function for React components
export const fetchFooterData = async (language: string = 'en'): Promise<FooterData> => {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    const response = await fetch(`${API_BASE_URL}/api/footer-content?lang=${language}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // Always fetch fresh data for client-side
    });

    if (!response.ok) {
      console.error('Failed to fetch footer data');
      return defaultFooterData;
    }

    const result: FooterResponse = await response.json();
    
    if (result.success && result.data) {
      return extractLanguageData(result.data, language);
    }

    return defaultFooterData;
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return defaultFooterData;
  }
};
