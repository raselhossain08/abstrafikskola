import { Card, CardContent } from '@/components/ui/card';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type PricingCardProps = {
  title: string;
  price: string;
  details: string;
  active?: boolean;
  index?: number;
  url?: string;
  onCardSelect?: (selectedCard: string, index?: number) => void;
  isSelectable?: boolean;
  selectedCard?: string;
};

export default function PricingCard({
  title,
  price,
  details,
  active,
  index,
  url,
}: PricingCardProps) {
  const router = useRouter();
  const [isSelected, setIsSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Handle card selection toggle
  const handleCardSelect = () => {
    setIsSelected(!isSelected);
    
    // Optional: Add analytics or console logging
    if (!isSelected) {
      console.log(`Card selected: ${title}`);
    } else {
      console.log(`Card deselected: ${title}`);
    }
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card selection when clicking button
    if (url) {
      router.push(url);
    }
  };
  return (
    <Card
      className={clsx(
        'md:max-h-[290px] text-left px-1 py-8 border rounded-[16px] transition-all duration-300 cursor-pointer transform',
        // Selection logic - independent of props
        isSelected 
          ? 'bg-[#3F8FEE] text-white shadow-lg ring-2 ring-blue-300 ring-opacity-50'
          : 'bg-white border-[#C3DCFA] text-[#2D66A9]',
        // Hover effects
        isHovered && !isSelected  && 'hover:border-[#3F8FEE] hover:shadow-md hover:scale-105',
        // Layout
        index === 2 ? ' col-span-2 md:col-span-1' : ''
      )}
      onClick={handleCardSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className=" flex flex-col justify-between h-full px-3 sm:px-6">
        <div className="space-y-2 sm:space-y-5">
          <h3 className="font-raleway font-semibold text-16 sm:text-[20px] leading-[26px]">
            {title}
          </h3>
          <p
            className={clsx(
              'font-raleway font-bold text-20 sm:text-[32px] leading-[100%]',
              (isSelected) ? 'text-[#fff]' : 'text-[#3F8FEE]'
            )}
          >
            {price}
          </p>
          <p
            className={clsx(
              'font-raleway font-normal text-14 sm:text-[14px] leading-[140%] pb-4',
              (isSelected ) ? 'text-white/80' : 'text-[#4A4C56]'
            )}
          >
            {details}
          </p>
        </div>
        <button
          onClick={handleBookNow}
          disabled={!url}
          className={clsx(
            'font-raleway font-medium text-[16px] leading-[140%] border border-[#3F8FEE] px-4 py-[6px] rounded-full transition w-full',
            (isSelected || active)
              ? 'bg-white text-[#3F8FEE] hover:bg-gray-100'
              : 'text-[#3F8FEE] hover:bg-blue-50',
            !url && 'opacity-50 cursor-not-allowed'
          )}
        >
          Book Now
        </button>
      </CardContent>
    </Card>
  );
}
