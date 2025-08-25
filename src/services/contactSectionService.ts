import { cache } from "react";

// Multi-language interfaces
export interface MultiLanguageText {
  en: string;
  sv: string;
  ar: string;
}

export interface ContactSectionButtonStyle {
  backgroundColor: string;
  hoverColor: string;
  width: string;
  height: string;
  borderRadius: string;
}

export interface ContactSectionContainerHeight {
  mobile: string;
  desktop: string;
}

export interface ContactSectionTextStyles {
  titleColor: string;
  fontSize: {
    mobile: string;
    desktop: string;
  };
  fontWeight: string;
  textAlign: string;
  marginBottom: string;
}

// Database interface (multi-language) - Made fields optional for backward compatibility
export interface ContactSectionDataRaw {
  _id: string;
  title?: MultiLanguageText | string;
  subtitle?: MultiLanguageText | string;
  description?: MultiLanguageText | string;
  backgroundImage: string;
  buttonText?: MultiLanguageText | string;
  buttonLink: string;
  buttonStyle: ContactSectionButtonStyle;
  containerHeight: ContactSectionContainerHeight;
  textStyles: ContactSectionTextStyles;
  createdAt: string;
  updatedAt: string;
}

// Client interface (single language)
export interface ContactSectionData {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  buttonText: string;
  buttonLink: string;
  buttonStyle: ContactSectionButtonStyle;
  containerHeight: ContactSectionContainerHeight;
  textStyles: ContactSectionTextStyles;
  createdAt: string;
  updatedAt: string;
}

export interface ContactSectionResponse {
  success: boolean;
  data: ContactSectionDataRaw;
}

// Helper function to extract language-specific data
const extractLanguageData = (rawData: ContactSectionDataRaw, language: string = 'en'): ContactSectionData => {
  const lang = language as keyof MultiLanguageText;
  
  // Helper function to safely get text value
  const getText = (value: MultiLanguageText | string | undefined): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value !== null) {
      return value[lang] || value.en || '';
    }
    return '';
  };

  return {
    _id: rawData._id,
    title: getText(rawData.title) || "Book Your First Driving Lesson And Contact Us",
    subtitle: getText(rawData.subtitle) || "",
    description: getText(rawData.description) || "",
    backgroundImage: rawData.backgroundImage || "/img/contact/contact-bg.png",
    buttonText: getText(rawData.buttonText) || "Contact us",
    buttonLink: rawData.buttonLink || "/contact",
    buttonStyle: rawData.buttonStyle || {
      backgroundColor: "bg-custom-3",
      hoverColor: "hover:bg-custom-3",
      width: "w-[200px]",
      height: "h-[48px]",
      borderRadius: "rounded-[30px]"
    },
    containerHeight: rawData.containerHeight || {
      mobile: "h-[400px]",
      desktop: "md:h-[600px]"
    },
    textStyles: rawData.textStyles || {
      titleColor: "text-white",
      fontSize: {
        mobile: "text-24",
        desktop: "md:text-[40px]"
      },
      fontWeight: "font-bold",
      textAlign: "text-center",
      marginBottom: "mb-3"
    },
    createdAt: rawData.createdAt,
    updatedAt: rawData.updatedAt
  };
};

// Default fallback data
const defaultContactSectionData: ContactSectionData = {
  _id: '',
  title: "Book Your First Driving Lesson And Contact Us",
  subtitle: "",
  description: "",
  backgroundImage: "/img/contact/contact-bg.png",
  buttonText: "Contact us",
  buttonLink: "/contact",
  buttonStyle: {
    backgroundColor: "bg-custom-3",
    hoverColor: "hover:bg-custom-3",
    width: "w-[200px]",
    height: "h-[48px]",
    borderRadius: "rounded-[30px]"
  },
  containerHeight: {
    mobile: "h-[400px]",
    desktop: "md:h-[600px]"
  },
  textStyles: {
    titleColor: "text-white",
    fontSize: {
      mobile: "text-24",
      desktop: "md:text-[40px]"
    },
    fontWeight: "font-bold",
    textAlign: "text-center",
    marginBottom: "mb-3"
  },
  createdAt: '',
  updatedAt: ''
};

export const getContactSectionData = cache(async (language: string = 'en'): Promise<ContactSectionData> => {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    const response = await fetch(`${API_BASE_URL}/api/contact-section?lang=${language}`, {
      cache: 'force-cache',
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Failed to fetch contact section data');
      return defaultContactSectionData;
    }

    const result: ContactSectionResponse = await response.json();
    
    if (result.success && result.data) {
      // Handle both old and new data structures
      if ('title' in result.data || 'buttonText' in result.data) {
        return extractLanguageData(result.data as ContactSectionDataRaw, language);
      } else {
        // Handle API response that doesn't have title/buttonText fields
        const rawData = result.data as any;
        const transformedData: ContactSectionDataRaw = {
          _id: rawData._id || '',
          title: undefined, // Will use default
          subtitle: rawData.subtitle || '',
          description: rawData.description || '',
          backgroundImage: rawData.backgroundImage || '/img/contact/contact-bg.png',
          buttonText: undefined, // Will use default
          buttonLink: rawData.buttonLink || '/contact',
          buttonStyle: rawData.buttonStyle || defaultContactSectionData.buttonStyle,
          containerHeight: rawData.containerHeight || defaultContactSectionData.containerHeight,
          textStyles: rawData.textStyles || defaultContactSectionData.textStyles,
          createdAt: rawData.createdAt || '',
          updatedAt: rawData.updatedAt || ''
        };
        return extractLanguageData(transformedData, language);
      }
    }

    return defaultContactSectionData;
  } catch (error) {
    console.error('Error fetching contact section data:', error);
    return defaultContactSectionData;
  }
});

// Client-side fetch function for React components
export const fetchContactSectionData = async (language: string = 'en'): Promise<ContactSectionData> => {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    const response = await fetch(`${API_BASE_URL}/api/contact-section?lang=${language}`);

    if (!response.ok) {
      console.error('Failed to fetch contact section data');
      return defaultContactSectionData;
    }

    const result: ContactSectionResponse = await response.json();
    
    if (result.success && result.data) {
      // Handle both old and new data structures
      if ('title' in result.data || 'buttonText' in result.data) {
        return extractLanguageData(result.data as ContactSectionDataRaw, language);
      } else {
        // Handle API response that doesn't have title/buttonText fields
        const rawData = result.data as any;
        const transformedData: ContactSectionDataRaw = {
          _id: rawData._id || '',
          title: undefined, // Will use default
          subtitle: rawData.subtitle || '',
          description: rawData.description || '',
          backgroundImage: rawData.backgroundImage || '/img/contact/contact-bg.png',
          buttonText: undefined, // Will use default
          buttonLink: rawData.buttonLink || '/contact',
          buttonStyle: rawData.buttonStyle || defaultContactSectionData.buttonStyle,
          containerHeight: rawData.containerHeight || defaultContactSectionData.containerHeight,
          textStyles: rawData.textStyles || defaultContactSectionData.textStyles,
          createdAt: rawData.createdAt || '',
          updatedAt: rawData.updatedAt || ''
        };
        return extractLanguageData(transformedData, language);
      }
    }

    return defaultContactSectionData;
  } catch (error) {
    console.error('Error fetching contact section data:', error);
    return defaultContactSectionData;
  }
};
