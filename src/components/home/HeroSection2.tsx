'use client';

import React from 'react';
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
import { useLanguage } from '@/contexts/LanguageContext';
import { useHeroContent } from '@/hooks/useHeroContent';

export default function HeroSection2() {
  const { language } = useLanguage();
  const { content, isLoading, error } = useHeroContent();

  console.log(`🏠 [HeroSection2] Rendering with:`, {
    language,
    hasContent: !!content,
    isLoading,
    error,
    contentId: content?.id,
    backgroundImage: content?.backgroundImage?.url
  });

  // Show loading state only on initial load
  if (isLoading && !content) {
    console.log(`🏠 [HeroSection2] Showing loading state`);
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

  // Show error state if content failed to load
  if (error || !content) {
    console.log(`🏠 [HeroSection2] Showing error state:`, error);
    return (
      <div 
        className="relative w-full bg-white px-4 xl:px-0 bg-no-repeat bg-cover min-h-[600px] flex items-center justify-center"
        style={{ backgroundImage: 'url(/img/hero/2.png)' }}
      >
        <div className="text-white text-center">
          <p>{error || 'Failed to load content'}</p>
        </div>
      </div>
    );
  }

  console.log(`🏠 [HeroSection2] Rendering with content:`, {
    title: content.mainContent.title,
    featuresCount: content.features.length
  });

  return (
    <div
      className={`relative w-full bg-white px-4 xl:px-0 bg-no-repeat bg-cover transition-opacity duration-300 ${
        isLoading && content ? 'opacity-90' : 'opacity-100'
      }`}
      style={{ backgroundImage: `url(${content.backgroundImage.url})` }}
    >
      <div className="w-full xl:w-[1320px] mx-auto relative z-10 pb-10">
        <div className="flex py-14 justify-center">
          <div className="w-full sm:w-[648px] flex flex-col items-center justify-center space-y-2">
            <h4 className="font-sansat font-light text-white text-12 sm:text-20 text-center tracking-[5px] uppercase transition-all duration-300">
              {content.mainContent.welcome}
            </h4>
            <h1 className="font-bold text-28 sm:text-64 leading-[30px] sm:leading-[68px] tracking-[3px] sm:tracking-[5px] text-center text-white transition-all duration-300">
              {content.mainContent.title}
            </h1>
            <h3 className="font-sansat font-semiBold text-14 sm:text-20 tracking-[20%] uppercase leading-[140%] text-white text-center pb-8 transition-all duration-300">
              {content.mainContent.subtitle}
            </h3>
            <Button 
              className={`bg-custom-3 w-[200px] h-[48px] rounded-[30px] font-raleway font-medium text-[18px] leading-[26px] tracking-normal text-white hover:bg-custom-3 hover:text-white mb-8 transition-all duration-300`}
            >
              {content.mainContent.cta}
            </Button>
            <div className="inline-block relative my-5 transition-all duration-300">
              <Image
                src={content.centerIcon.url}
                alt={content.centerIcon.alt}
                width={content.centerIcon.width}
                height={content.centerIcon.height}
                priority
              />
            </div>
          </div>
        </div>
        
        {/* Desktop Grid */}
        <div className="xl:grid grid-cols-5 gap-5 mt-8 pb-20 hidden">
          {content.features.map((feature, index) => (
            <Card 
              key={`${feature.id}-${index}`} 
              className="border border-[#FFFFFF80] shadow-none transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
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
                <h2 className="font-raleway font-semibold text-16 leading-tight tracking-[0.5%] text-center uppercase text-custom-2 mb-3 transition-all duration-300">
                  {feature.title}
                </h2>
                <p className="font-raleway text-12 leading-relaxed text-center text-gray-700 transition-all duration-300">
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
            {content.features.map((feature, index) => (
              <CarouselItem
                key={`${feature.id}-mobile-${index}`}
                className="basis-2/3 sm:basis-4/12 md:basis-3/12"
              >
                <Card className="border border-[#FFFFFF80] shadow-none h-[244px] transition-all duration-300">
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
                    <h2 className="font-raleway font-semibold text-16 leading-tight tracking-[0.5%] text-center uppercase text-custom-2 mb-3 transition-all duration-300">
                      {feature.title}
                    </h2>
                    <p className="font-raleway text-12 leading-relaxed text-center text-gray-700 transition-all duration-300">
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
