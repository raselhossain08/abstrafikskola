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

interface HeroFeature {
  icon: string;
  title: string;
  text: string;
}

interface HeroContent {
  welcome: string;
  title: string;
  subtitle: string;
  cta: string;
  features: HeroFeature[];
}

const heroTranslations: Record<Language, HeroContent> = {
  en: {
    welcome: 'Welcome to ABS Trafikskola',
    title: 'Learn to Drive with Confidence',
    subtitle: 'Your Journey to Safe Driving Starts Here',
    cta: 'Book Your Lesson',
    features: [
      {
        icon: '/img/hero/icon1.svg',
        title: 'Drive Now, Pay Later!',
        text: 'Drive now, pay later with the help of Resurs Bank - interest-free instalment payments for up to 24 months.',
      },
      {
        icon: '/img/hero/icon2.svg',
        title: 'Top-Notch Instructors!',
        text: 'Best teachers in the branch who are passionate and skilled about their jobs.',
      },
      {
        icon: '/img/hero/icon3.svg',
        title: 'Same Car as Trafikverket!',
        text: 'Practice in the similar types of new car you will use for your driving test - Just like Trafikverket Forarprov!',
      },
      {
        icon: '/img/hero/icon4.svg',
        title: 'Help with Exam Bookings!',
        text: 'Assistance in finding exam booking slots for those who successfully complete all driving stages.',
      },
      {
        icon: '/img/hero/icon5.svg',
        title: 'Open on Weekends!',
        text: 'Flexible weekend hours to fit your busy schedule.',
      },
    ],
  },
  sv: {
    welcome: 'Valkommen till ABS Trafikskola',
    title: 'Lar dig kora med sjalvfortroende',
    subtitle: 'Din resa till saker korning borjar har',
    cta: 'Boka din lektion',
    features: [
      {
        icon: '/img/hero/icon1.svg',
        title: 'Kor nu, betala senare!',
        text: 'Kor nu, betala senare med hjalp av Resurs Bank - rantefria avbetalningar i upp till 24 manader.',
      },
      {
        icon: '/img/hero/icon2.svg',
        title: 'Forstklassiga instruktorer!',
        text: 'Basta lararna i branschen som ar passionerade och skickliga pa sina jobb.',
      },
      {
        icon: '/img/hero/icon3.svg',
        title: 'Samma bil som Trafikverket!',
        text: 'Ova i liknande typer av nya bilar som du kommer att anvanda for ditt korprov - precis som Trafikverket Forarprov!',
      },
      {
        icon: '/img/hero/icon4.svg',
        title: 'Hjalp med provbokningar!',
        text: 'Hjalp med att hitta provbokningstider for dem som framgangsrikt slutfor alla korningssteg.',
      },
      {
        icon: '/img/hero/icon5.svg',
        title: 'Oppet pa helger!',
        text: 'Flexibla helgtimmar for att passa ditt hektiska schema.',
      },
    ],
  },
  ar: {
    welcome: 'مرحباً بكم في ABS Trafikskola',
    title: 'تعلم القيادة بثقة',
    subtitle: 'رحلتك نحو القيادة الآمنة تبدأ هنا',
    cta: 'احجز درسك',
    features: [
      {
        icon: '/img/hero/icon1.svg',
        title: 'قد الآن، ادفع لاحقاً!',
        text: 'قد الآن، ادفع لاحقاً بمساعدة بنك Resurs - أقساط بدون فوائد لمدة تصل إلى 24 شهراً.',
      },
      {
        icon: '/img/hero/icon2.svg',
        title: 'مدربين من الدرجة الأولى!',
        text: 'أفضل المعلمين في المجال الذين لديهم شغف ومهارة في وظائفهم.',
      },
      {
        icon: '/img/hero/icon3.svg',
        title: 'نفس السيارة المستخدمة في Trafikverket!',
        text: 'تدرب في نفس نوع السيارة الجديدة التي ستستخدمها في اختبار القيادة - تماماً مثل Trafikverket Förarprov!',
      },
      {
        icon: '/img/hero/icon4.svg',
        title: 'مساعدة في حجز الامتحانات!',
        text: 'مساعدة في العثور على مواعيد حجز الامتحانات لأولئك الذين يكملون بنجاح جميع مراحل القيادة.',
      },
      {
        icon: '/img/hero/icon5.svg',
        title: 'مفتوح في عطلات نهاية الأسبوع!',
        text: 'ساعات مرنة في عطلة نهاية الأسبوع لتناسب جدولك المزدحم.',
      },
    ],
  },
};

export default function HeroSection2() {
  const { language } = useLanguage();

  const content = heroTranslations[language];
  const heroData = content.features;

  return (
    <div
      className="relative w-full bg-white px-4 xl:px-0 bg-no-repeat bg-cover"
      style={{ backgroundImage: 'url(/img/hero/2.png)' }}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="w-full xl:w-[1320px] mx-auto relative z-10 pb-10">
        <div className="flex py-14 justify-center">
          <div className="w-full sm:w-[648px] flex flex-col items-center justify-center space-y-2">
            <h4 className="font-sansat font-light text-white text-12 sm:text-20 text-center tracking-[5px] uppercase">
              {content.welcome}
            </h4>
            <h1 className="font-bold text-28 sm:text-64 leading-[30px] sm:leading-[68px] tracking-[3px] sm:tracking-[5px] text-center text-white">
              {content.title}
            </h1>
            <h3 className="font-sansat font-semiBold text-14 sm:text-20 tracking-[20%] uppercase leading-[140%] text-white text-center pb-8">
              {content.subtitle}
            </h3>
            <Button className="bg-custom-3 w-[200px] h-[48px] rounded-[30px] font-raleway font-medium text-[18px] leading-[26px] tracking-normal text-white hover:bg-custom-3 hover:text-white mb-8">
              {content.cta}
            </Button>
            <div className="inline-block relative my-5">
              <Image
                src={'/img/hero/icon7.svg'}
                alt="Hero Image"
                width={518}
                height={151}
              />
            </div>
          </div>
        </div>
        <div className="xl:grid grid-cols-5 gap-5 mt-8 pb-20 hidden">
          {heroData.map((feature: HeroFeature, index: number) => (
            <Card key={index} className="border border-[#FFFFFF80] shadow-none">
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
                  {feature.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Carousel
          opts={{
            align: 'center',
          }}
          className="w-full xl:hidden"
        >
          <CarouselContent>
            {heroData.map((feature: HeroFeature, index: number) => (
              <CarouselItem
                key={index}
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
                      {feature.text}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      {/* effects */}
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
