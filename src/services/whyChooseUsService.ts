import { cache } from "react";

export interface WhyChooseUsBenefit {
  _id: string;
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
  active: boolean;
  order: number;
}

export interface WhyChooseUsData {
  _id: string;
  title: string;
  description: string;
  backgroundColor: string;
  benefits: WhyChooseUsBenefit[];
  createdAt: string;
  updatedAt: string;
}

export interface WhyChooseUsResponse {
  success: boolean;
  data: WhyChooseUsData;
}

// Default fallback data
const defaultWhyChooseUsData: WhyChooseUsData = {
  _id: '',
  title: "Why Choose Us",
  description: "70 minutes !Our classes are 70 minutes long, compared to the standard 50-minute classes at most other schools. While others may appear cheaper, our per-minute cost makes us one of the most affordable driving schools in Södertälje, if not in all of Sweden.",
  backgroundColor: "#F7FAFF",
  benefits: [
    {
      _id: '1',
      title: "Experienced Teachers",
      description: "Our instructors are highly experienced and passionate, ensuring you receive the best guidance throughout your learning journey with our driving school.",
      icon: "/icons/home/icon1.svg",
      iconAlt: "Experienced Teachers",
      active: true,
      order: 1
    },
    {
      _id: '2',
      title: "Exceptional High Pass Rates",
      description: "We have some of the highest pass rates in the region, reflecting the quality of our driving lessons and training programs.",
      icon: "/icons/home/icon2.svg",
      iconAlt: "High Pass Rates",
      active: false,
      order: 2
    },
    {
      _id: '3',
      title: "Competitive Prices",
      description: "Enjoy top-notch driving lessons at the most competitive prices in the area.",
      icon: "/icons/home/icon3.svg",
      iconAlt: "Competitive Prices",
      active: false,
      order: 3
    },
    {
      _id: '4',
      title: "Central Location",
      description: "Located in the heart of Södertälje, close to Trafikverket exam centers.",
      icon: "/icons/home/icon4.svg",
      iconAlt: "Central Location",
      active: false,
      order: 4
    },
    {
      _id: '5',
      title: "Comprehensive Guidance",
      description: "We guide you every step of the way to obtaining your driver's license.",
      icon: "/icons/home/icon5.svg",
      iconAlt: "Comprehensive Guidance",
      active: false,
      order: 5
    },
    {
      _id: '6',
      title: "Flexible Payment Options!",
      description: "Interest-free installment payments for up to 24 months with Resurs Bank.",
      icon: "/icons/home/icon6.svg",
      iconAlt: "Flexible Payment Options",
      active: false,
      order: 6
    },
    {
      _id: '7',
      title: "Flexible Opening Hours",
      description: "Open on weekends and evenings to fit your schedule.",
      icon: "/icons/home/icon7.svg",
      iconAlt: "Flexible Opening Hours",
      active: false,
      order: 7
    },
    {
      _id: '8',
      title: "Intensive Driving Lessons Program",
      description: "Quick completion for those needing a license fast.",
      icon: "/icons/home/icon8.svg",
      iconAlt: "Intensive Driving Lessons Program",
      active: false,
      order: 8
    }
  ],
  createdAt: '',
  updatedAt: ''
};

export const getWhyChooseUsData = cache(async (): Promise<WhyChooseUsData> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/why-choose-us`, {
      cache: 'force-cache',
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Failed to fetch why choose us data');
      return defaultWhyChooseUsData;
    }

    const result: WhyChooseUsResponse = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }

    return defaultWhyChooseUsData;
  } catch (error) {
    console.error('Error fetching why choose us data:', error);
    return defaultWhyChooseUsData;
  }
});

// Client-side fetch function for React components
export const fetchWhyChooseUsData = async (): Promise<WhyChooseUsData> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/why-choose-us`);

    if (!response.ok) {
      console.error('Failed to fetch why choose us data');
      return defaultWhyChooseUsData;
    }

    const result: WhyChooseUsResponse = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }

    return defaultWhyChooseUsData;
  } catch (error) {
    console.error('Error fetching why choose us data:', error);
    return defaultWhyChooseUsData;
  }
};
