'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '../ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { useLanguage, type Language } from '@/contexts/LanguageContext';

// Hero Feature Interface matching API structure
interface HeroFeature {
  _id?: string;
  icon: string;
  title: string;
  description: string;
}

// Hero Section Interface matching API structure
interface HeroSection {
  backgroundImage: string;
  effectImages: string[];
  header: {
    welcomeText: string;
    mainTitle: string;
    subtitle: string;
  };
  ctaButton: {
    text: string;
  };
  dividerImage: string;
  features: HeroFeature[];
}

interface ApiResponse {
  success: boolean;
  data?: {
    heroSection: HeroSection;
    views: number;
    isActive: boolean;
  };
  message?: string;
}

export default function HeroSection2() {
  const { language } = useLanguage();
  const [heroData, setHeroData] = useState<HeroSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch home content from API
  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${API_BASE_URL}/home-content`);
        const data: ApiResponse = await response.json();
        
        if (data.success && data.data) {
          setHeroData(data.data.heroSection);
        } else {
          setError('Failed to load content');
          console.error('API Error:', data.message);
        }
      } catch (err) {
        setError('Failed to connect to server');
        console.error('Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeContent();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="relative w-full bg-gray-100 px-4 xl:px-0 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-custom-3 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !heroData) {
    return (
      <div className="relative w-full bg-gray-100 px-4 xl:px-0 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl text-red-500 mb-4">⚠️</div>
          <p className="text-lg text-gray-600 mb-4">{error || 'No content available'}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-custom-3 hover:bg-custom-3/90"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full bg-white px-4 xl:px-0 bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="w-full xl:w-[1320px] mx-auto relative z-10 pb-10">
        <div className="flex py-14 justify-center">
          <div className="w-full sm:w-[648px] flex flex-col items-center justify-center space-y-2">
            <h4 className="font-sansat font-light text-white text-12 sm:text-20 text-center tracking-[5px] uppercase">
              {heroData.header.welcomeText}
            </h4>
            <h1 className="font-bold text-28 sm:text-64 leading-[30px] sm:leading-[68px] tracking-[3px] sm:tracking-[5px] text-center text-white">
              {heroData.header.mainTitle}
            </h1>
            <h3 className="font-sansat font-semiBold text-14 sm:text-20 tracking-[20%] uppercase leading-[140%] text-white text-center pb-8">
              {heroData.header.subtitle}
            </h3>
            <Button className="bg-custom-3 w-[200px] h-[48px] rounded-[30px] font-raleway font-medium text-[18px] leading-[26px] tracking-normal text-white hover:bg-custom-3 hover:text-white mb-8">
              {heroData.ctaButton.text}
            </Button>
            <div className="inline-block relative my-5">
              <Image
                src={heroData.dividerImage}
                alt="Hero Image"
                width={518}
                height={151}
              />
            </div>
          </div>
        </div>
        
        {/* Desktop Features Grid */}
        <div className="xl:grid grid-cols-5 gap-5 mt-8 pb-20 hidden">
          {heroData.features.map((feature: HeroFeature, index: number) => (
            <Card key={feature._id || index} className="border border-[#FFFFFF80] shadow-none">
              <CardHeader className="w-full flex justify-center items-center">
                <div className="flex border border-[#070707] rounded-full w-[50px] h-[50px] items-center justify-center">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={24}
                    height={24}
                    className="saturate-0"
                  />
                </div>
              </CardHeader>
              <CardContent className="">
                <h2 className="font-raleway font-semibold text-16 leading-tight tracking-[0.5%] text-center uppercase text-custom-2 mb-3">
                  {feature.title}
                </h2>
                <p className="font-raleway text-12 leading-relaxed text-center text-gray-700">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Mobile Carousel */}
        <Carousel
          opts={{
            align: 'center',
          }}
          className="w-full xl:hidden"
        >
          <CarouselContent>
            {heroData.features.map((feature: HeroFeature, index: number) => (
              <CarouselItem
                key={feature._id || index}
                className="basis-2/3 sm:basis-4/12 md:basis-3/12"
              >
                <Card className="border border-[#FFFFFF80] shadow-none h-[244px]">
                  <CardHeader className="w-full flex justify-center items-center">
                    <div className="flex border border-[#070707] rounded-full w-[50px] h-[50px] items-center justify-center">
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={24}
                        height={24}
                        className="saturate-0"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="">
                    <h2 className="font-raleway font-semibold text-16 leading-tight tracking-[0.5%] text-center uppercase text-custom-2 mb-3">
                      {feature.title}
                    </h2>
                    <p className="font-raleway text-12 leading-relaxed text-center text-gray-700">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      
      {/* Effect Images from API */}
      {heroData.effectImages.map((effectImg, index) => (
        <div key={index} className={`absolute top-0 left-0 ${index === 1 ? 'flex justify-center' : ''}`}>
          <img
            src={effectImg}
            alt={`Hero Background Effect ${index + 1}`}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
      ))}
    </div>
  );
}
