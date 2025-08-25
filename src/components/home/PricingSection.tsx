'use client';
import React, { useState, useEffect } from 'react';
import PricingCard from './PricingCard';
import { pricingSectionService, type PricingSectionData } from '@/services/pricingSectionService';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PricingSection() {
  const { language } = useLanguage();
  const [pricingData, setPricingData] = useState<PricingSectionData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch pricing data from API
  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        setLoading(true);
        const data = await pricingSectionService.getPricingSection(language);
        setPricingData(data);
      } catch (error) {
        console.error('Error fetching pricing data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPricingData();
  }, [language]);

  // Show loading state
  if (loading) {
    return (
      <div className="bg-[#F7FAFF] py-8 sm:py-14 px-4 xl:px-0">
        <div className="w-full xl:w-[1320px] mx-auto">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg text-gray-600">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  const cards = pricingData?.cards || [];
  return (
    <div 
      className="py-8 sm:py-14 px-4 xl:px-0" 
      style={{ backgroundColor: pricingData?.backgroundColor || '#F7FAFF' }}
    >
      <div className="w-full xl:w-[1320px] mx-auto ">
        <div className="grid gap-4 grid-cols-2  md:grid-cols-3 xl:grid-cols-5  py-8">
          {cards.map((card, index) => (
            <PricingCard key={card._id || index} {...card} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
