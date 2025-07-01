import React from 'react';
import PricingCard from './PricingCard';

export default function PricingSection() {
  const cards = [
    {
      title: 'Handledarkurs',
      price: '299 kr',
      details:
        'Ready to embark on your journey to becoming a confident driver?',
    },
    {
      title: 'Riskettan',
      price: '349 kr',
      details:
        'Ready to embark on your journey to becoming a confident driver?',
      active: true,
    },
    {
      title: 'Risk2 (Halkbana)',
      price: '1890 kr',
      details:
        'Ready to embark on your journey to becoming a confident driver?',
    },
    {
      title: 'Risk1 + Risk2',
      price: '2090 kr',
      details:
        'Ready to embark on your journey to becoming a confident driver?',
    },
    {
      title: 'Driving lessons',
      price: '595 kr',
      details:
        'Ready to embark on your journey to becoming a confident driver?',
    },
  ];
  return (
    <div className="bg-[#F7FAFF] py-8 sm:py-14 px-4 xl:px-0">
      <div className="w-full xl:w-[1320px] mx-auto ">
        <div className="grid gap-4 grid-cols-2  md:grid-cols-3 xl:grid-cols-5  py-8">
          {cards.map((card, index) => (
            <PricingCard key={index} {...card} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
