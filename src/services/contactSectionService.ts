import { cache } from "react";

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
  data: ContactSectionData;
}

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

export const getContactSectionData = cache(async (): Promise<ContactSectionData> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact-section`, {
      cache: 'force-cache',
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Failed to fetch contact section data');
      return defaultContactSectionData;
    }

    const result: ContactSectionResponse = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }

    return defaultContactSectionData;
  } catch (error) {
    console.error('Error fetching contact section data:', error);
    return defaultContactSectionData;
  }
});

// Client-side fetch function for React components
export const fetchContactSectionData = async (): Promise<ContactSectionData> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact-section`);

    if (!response.ok) {
      console.error('Failed to fetch contact section data');
      return defaultContactSectionData;
    }

    const result: ContactSectionResponse = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }

    return defaultContactSectionData;
  } catch (error) {
    console.error('Error fetching contact section data:', error);
    return defaultContactSectionData;
  }
};
