'use client';
import React, { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { CloudinaryImage } from '@/hooks/useCloudinaryImages';
type Benefit = {
  icon: ReactNode;
  title: string;
  description: string;
  active?: boolean;
};

const benefits: Benefit[] = [
  {
    icon: (
      <div>
        <CloudinaryImage
          src="/icons/home/icon1.svg"
          alt="Experienced Teachers"
          width={59}
          height={43}
          className="w-[50px] h-auto"
        />
      </div>
    ),
    title: 'Experienced Teachers',
    description:
      'Our instructors are highly experienced and passionate, ensuring you receive the best guidance throughout your learning journey with our driving school.',
    active: true,
  },
  {
    icon: (
      <div>
        <CloudinaryImage
          src="/icons/home/icon2.svg"
          alt="High Pass Rates"
          width={59}
          height={43}
          className="w-[59px] h-auto"
        />
      </div>
    ),
    title: 'Exceptional High Pass Rates',
    description:
      'We have some of the highest pass rates in the region, reflecting the quality of our driving lessons and training programs.',
  },
  {
    icon: (
      <div>
        <CloudinaryImage
          src="/icons/home/icon3.svg"
          alt="Competitive Prices"
          width={59}
          height={43}
          className="w-[50px] h-auto"
        />
      </div>
    ),
    title: 'Competitive Prices',
    description:
      'Enjoy top-notch driving lessons at the most competitive prices in the area.',
  },
  {
    icon: (
      <div>
        <CloudinaryImage src="/icons/home/icon4.svg" alt="" width={59}
          height={43}
          className="w-[50px] h-auto"
        />
      </div>
    ),
    title: 'Central Location',
    description:
      'Located in the heart of Södertälje, close to Trafikverket exam centers.',
  },
  {
    icon: (
      <div>
        <CloudinaryImage src="/icons/home/icon5.svg" alt="" width={59}
          height={43}
          className="w-[50px] h-auto"
        />
      </div>
    ),
    title: 'Comprehensive Guidance',
    description:
      'We guide you every step of the way to obtaining your driver’s license.',
  },
  {
    icon: (
      <div>
        <CloudinaryImage src="/icons/home/icon6.svg" alt="" width={59}
          height={43}
          className="w-[50px] h-auto"
        />
      </div>
    ),
    title: 'Flexible Payment Options!',
    description:
      'Interest-free installment payments for up to 24 months with Resurs Bank.',
  },
  {
    icon: (
      <div>
        <CloudinaryImage src="/icons/home/icon7.svg" alt="" width={59}
          height={43}
          className="w-[50px] h-auto"
        />
      </div>
    ),
    title: 'Flexible Opening Hours',
    description: 'Open on weekends and evenings to fit your schedule.',
  },
  {
    icon: (
      <div>
        <CloudinaryImage src="/icons/home/icon8.svg" alt="" width={59}
          height={43}
          className="w-[50px] h-auto"
        />
      </div>
    ),
    title: 'Intensive Driving Lessons Program',
    description: 'Quick completion for those needing a license fast.',
  },
];
export default function WhyChooseUs() {
  return (
    <div className="bg-[#F7FAFF] w-full py-14 md:py-24 px-4 xl:px-0 font-raleway">
      <div className="w-full xl:w-[1320px] mx-auto ">
        <div className="w-full md:w-[648px] mx-auto space-y-4 mb-12">
          <h1 className="text-[#1D1F2C] font-[700] text-24 sm:text-48 text-center">
            Why Choose Us
          </h1>
          <p className=" text-[#4A4C56] text-16 font-[400] text-center">
            70 minutes !Our classes are 70 minutes long, compared to the
            standard 50-minute classes at most other schools. While others may
            appear cheaper, our per-minute cost makes us one of the most
            affordable driving schools in Södertälje, if not in all of Sweden.
          </p>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {benefits.map((benefit, idx) => (
            <Card
              key={idx}
              className={cn(
                'text-center rounded-[16px] transition-all',
                benefit.active
                  ? 'bg-[#65A5F1] text-white border border-[#65A5F1]'
                  : 'bg-white  border border-[#E9E9EA80]'
              )}
            >
              <CardContent className="flex flex-col items-center space-y-4">
                <div
                  className={cn(
                    '  w-[100px] h-[100px] rounded-full flex items-center justify-center',
                    benefit.active ? 'bg-white ' : 'border border-[#C3DCFA] '
                  )}
                >
                  {benefit.icon}
                </div>
                <h4
                  className={cn(
                    'text-center  font-[700] text-16 sm:text-[24px]',
                    benefit.active ? ' text-white ' : 'text-[#1D1F2C]  '
                  )}
                >
                  {benefit.title}
                </h4>
                <p
                  className={cn(
                    'text-center  font-[400] text-[14px]',
                    benefit.active ? ' text-white ' : 'text-[#4A4C56]  '
                  )}
                >
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
