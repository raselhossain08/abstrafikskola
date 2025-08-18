import { cache } from "react";

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
  type: 'address' | 'email' | 'phone' | 'whatsapp';
  value: string;
  link: string;
  icon: string;
  order: number;
}

export interface FooterLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
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
  logo: FooterLogo;
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
  data: FooterData;
}

// Default fallback data
const defaultFooterData: FooterData = {
  _id: '',
  logo: {
    src: "/logo.svg",
    alt: "logo",
    width: 75,
    height: 35
  },
  description: "Unlock the road with Södertälje's top Driving school – confidence and competitive prices guaranteed!",
  socialLinks: [
    { _id: '1', name: "Facebook", url: "https://facebook.com", icon: "/icons/footer/facebook.svg", alt: "facebook Icon", order: 1 },
    { _id: '2', name: "Twitter", url: "https://twitter.com", icon: "/icons/footer/x.svg", alt: "twitter Icon", order: 2 },
    { _id: '3', name: "Instagram", url: "https://instagram.com", icon: "/icons/footer/instagram.svg", alt: "instagram Icon", order: 3 },
    { _id: '4', name: "LinkedIn", url: "https://linkedin.com", icon: "/icons/footer/linkedin.svg", alt: "linkedin Icon", order: 4 }
  ],
  companySection: {
    title: "Company",
    links: [
      { _id: '1', name: "Home", url: "/", order: 1 },
      { _id: '2', name: "Price List", url: "/price-list", order: 2 },
      { _id: '3', name: "Handledarkurs", url: "/handledarkurs", order: 3 },
      { _id: '4', name: "Riskettan", url: "/riskettan", order: 4 },
      { _id: '5', name: "Halkbana", url: "/halkbana", order: 5 },
      { _id: '6', name: "Taxi", url: "/taxi", order: 6 },
      { _id: '7', name: "About Us", url: "/info/about", order: 7 },
      { _id: '8', name: "Contact", url: "/contact", order: 8 }
    ]
  },
  contactsSection: {
    title: "Contacts",
    contacts: [
      { _id: '1', type: "address", value: "Dolsgatan 1 1, 15133 Södertälje", link: "", icon: "/icons/footer/location.svg", order: 1 },
      { _id: '2', type: "email", value: "info@abstrafikskola.se", link: "mailto:info@abstrafikskola.se", icon: "/icons/footer/message.svg", order: 2 },
      { _id: '3', type: "phone", value: "08 550 66666", link: "tel:0855066666", icon: "/icons/footer/phone.svg", order: 3 },
      { _id: '4', type: "whatsapp", value: "073 998 8444", link: "https://wa.me/46739988444", icon: "/icons/footer/whatsapp.svg", order: 4 }
    ]
  },
  subscribeSection: {
    title: "Subscribe",
    subtitle: "Get Latest update and offers",
    placeholder: "Enter email address",
    buttonText: "Subscribe"
  },
  footerBottom: {
    text: "2024, All Rights Reserved — Developed by",
    developerName: "Rasel Hossain"
  },
  backgroundColor: "bg-custom-6",
  createdAt: '',
  updatedAt: ''
};

export const getFooterData = cache(async (): Promise<FooterData> => {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    const response = await fetch(`${API_BASE_URL}/footer`, {
      cache: 'force-cache',
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Failed to fetch footer data');
      return defaultFooterData;
    }

    const result: FooterResponse = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }

    return defaultFooterData;
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return defaultFooterData;
  }
});

// Client-side fetch function for React components
export const fetchFooterData = async (): Promise<FooterData> => {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    const response = await fetch(`${API_BASE_URL}/footer`);

    if (!response.ok) {
      console.error('Failed to fetch footer data');
      return defaultFooterData;
    }

    const result: FooterResponse = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }

    return defaultFooterData;
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return defaultFooterData;
  }
};
