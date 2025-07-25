import React, { useState } from 'react';
import PricingCard from './PricingCard';
import { ProductDialog } from '@/components/dialog/ProductDialog';

type ProductItem = {
  date: string;
  time: string;
  title: string;
  seats: string;
  price: string;
};

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

  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [productData] = useState<ProductItem>({
    date: '2024-03-20 Wednesday',
    time: '17:00 - 20:15',
    title: 'Handledarkurs [Svenska]',
    seats: '5 seats available',
    price: '299 kr',
  });

  const handleBookNow = (title: string) => {
    if (title === 'Handledarkurs') {
      setProductDialogOpen(true);
    } else {
      // Handle other course bookings (redirect to respective pages)
      const routeMap: { [key: string]: string } = {
        Riskettan: '/riskettan',
        'Risk2 (Halkbana)': '/halkbana',
        'Risk1 + Risk2': '/riskettan', // or a combination page
        'Driving lessons': '/contact', // or driving lessons page
      };

      if (routeMap[title]) {
        window.location.href = routeMap[title];
      }
    }
  };

  return (
    <div className="bg-[#F7FAFF] py-8 sm:py-14 px-4 xl:px-0">
      <div className="w-full xl:w-[1320px] mx-auto ">
        <div className="grid gap-4 grid-cols-2  md:grid-cols-3 xl:grid-cols-5  py-8">
          {cards.map((card, index) => (
            <PricingCard
              key={index}
              {...card}
              index={index}
              onBookNow={handleBookNow}
            />
          ))}
        </div>
        <ProductDialog
          open={productDialogOpen}
          onOpenChange={setProductDialogOpen}
          data={productData}
        />
      </div>
    </div>
  );
}
