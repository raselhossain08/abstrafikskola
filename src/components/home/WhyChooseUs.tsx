'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { fetchWhyChooseUsData, WhyChooseUsData } from '@/services/whyChooseUsService';

export default function WhyChooseUs() {
  const [whyChooseUsData, setWhyChooseUsData] = useState<WhyChooseUsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchWhyChooseUsData();
        setWhyChooseUsData(data);
      } catch (error) {
        console.error('Error loading why choose us data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#F7FAFF] w-full py-14 md:py-24 px-4 xl:px-0 font-raleway">
        <div className="w-full xl:w-[1320px] mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!whyChooseUsData) {
    return null;
  }

  // Sort benefits by order
  const sortedBenefits = [...whyChooseUsData.benefits].sort((a, b) => a.order - b.order);

  return (
    <div 
      className="w-full py-14 md:py-24 px-4 xl:px-0 font-raleway"
      style={{ backgroundColor: whyChooseUsData.backgroundColor }}
    >
      <div className="w-full xl:w-[1320px] mx-auto">
        <div className="w-full md:w-[648px] mx-auto space-y-4 mb-12">
          <h1 className="text-[#1D1F2C] font-[700] text-24 sm:text-48 text-center">
            {whyChooseUsData.title}
          </h1>
          <p className="text-[#4A4C56] text-16 font-[400] text-center">
            {whyChooseUsData.description}
          </p>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedBenefits.map((benefit) => (
            <Card
              key={benefit._id}
              className={cn(
                'text-center rounded-[16px] transition-all',
                benefit.active
                  ? 'bg-[#65A5F1] text-white border border-[#65A5F1]'
                  : 'bg-white border border-[#E9E9EA80]'
              )}
            >
              <CardContent className="flex flex-col items-center space-y-4">
                <div
                  className={cn(
                    'w-[100px] h-[100px] rounded-full flex items-center justify-center',
                    benefit.active ? 'bg-white' : 'border border-[#C3DCFA]'
                  )}
                >
                  <div>
                    <Image
                      src={benefit.icon}
                      alt={benefit.iconAlt}
                      width={59}
                      height={43}
                      className="w-[50px] h-auto"
                    />
                  </div>
                </div>
                <h4
                  className={cn(
                    'text-center font-[700] text-16 sm:text-[24px]',
                    benefit.active ? 'text-white' : 'text-[#1D1F2C]'
                  )}
                >
                  {benefit.title}
                </h4>
                <p
                  className={cn(
                    'text-center font-[400] text-[14px]',
                    benefit.active ? 'text-white' : 'text-[#4A4C56]'
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
