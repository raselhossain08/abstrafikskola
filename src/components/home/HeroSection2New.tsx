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
import heroContentService, { type HeroContent } from '@/services/heroContentService';

export default function HeroSection2() {
  const { language } = useLanguage();
  const [content, setContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const data = await heroContentService.getHeroContent(language);
        setContent(data);
      } catch (error) {
        console.error('Error loading hero content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [language]);

  // Show loading state
  if (loading || !content) {
    return (
      <div 
        className="relative w-full bg-white px-4 xl:px-0 bg-no-repeat bg-cover min-h-[600px] flex items-center justify-center"
        style={{ backgroundImage: 'url(/img/hero/2.png)' }}
      >
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full bg-white px-4 xl:px-0 bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${content.backgroundImage.url})` }}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="w-full xl:w-[1320px] mx-auto relative z-10 pb-10">
        <div className="flex py-14 justify-center">
          <div className="w-full sm:w-[648px] flex flex-col items-center justify-center space-y-2">
            <h4 className="font-sansat font-light text-white text-12 sm:text-20 text-center tracking-[5px] uppercase">
              {content.mainContent.welcome}
            </h4>
            <h1 className="font-bold text-28 sm:text-64 leading-[30px] sm:leading-[68px] tracking-[3px] sm:tracking-[5px] text-center text-white">
              {content.mainContent.title}
            </h1>
            <h3 className="font-sansat font-semiBold text-14 sm:text-20 tracking-[20%] uppercase leading-[140%] text-white text-center pb-8">
              {content.mainContent.subtitle}
            </h3>
            <Button 
              className={`w-[200px] h-[48px] rounded-[30px] font-raleway font-medium text-[18px] leading-[26px] tracking-normal text-white mb-8 ${
                content.buttonStyle.variant === 'primary' ? 'bg-custom-3 hover:bg-custom-3' :
                content.buttonStyle.variant === 'secondary' ? 'bg-custom-2 hover:bg-custom-2' :
                'bg-transparent border border-white hover:bg-white hover:text-black'
              } hover:text-white`}
            >
              {content.mainContent.cta}
            </Button>
            <div className="inline-block relative my-5">
              <Image
                src={content.centerIcon.url}
                alt={content.centerIcon.alt}
                width={content.centerIcon.width}
                height={content.centerIcon.height}
              />
            </div>
          </div>
        </div>
        
        {/* Desktop Grid */}
        <div className="xl:grid grid-cols-5 gap-5 mt-8 pb-20 hidden">
          {content.features.map((feature) => (
            <Card key={feature.id} className="border border-[#FFFFFF80] shadow-none">
              <CardHeader className="w-full flex justify-center items-center">
                <div className="flex border border-[#070707] rounded-full w-[50px] h-[50px] items-center justify-center">
                  <Image
                    src={feature.icon.url}
                    alt={feature.icon.alt}
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
                  {feature.text}
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
            {content.features.map((feature) => (
              <CarouselItem
                key={feature.id}
                className="basis-2/3 sm:basis-4/12 md:basis-3/12"
              >
                <Card className="border border-[#FFFFFF80] shadow-none h-[244px]">
                  <CardHeader className="w-full flex justify-center items-center">
                    <div className="flex border border-[#070707] rounded-full w-[50px] h-[50px] items-center justify-center">
                      <Image
                        src={feature.icon.url}
                        alt={feature.icon.alt}
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
                      {feature.text}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      
      {/* Effects */}
      <div className="absolute top-0 left-0">
        <img
          src="/effects/1.png"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="absolute top-0 left-0 flex justify-center">
        <img
          src="/effects/2.png"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
    </div>
  );
}
