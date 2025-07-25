import { Card, CardContent } from '@/components/ui/card';
import clsx from 'clsx';

type PricingCardProps = {
  title: string;
  price: string;
  details: string;
  active?: boolean;
  index?: number;
  onBookNow?: (title: string) => void;
};

export default function PricingCard({
  title,
  price,
  details,
  active,
  index,
  onBookNow,
}: PricingCardProps) {
  return (
    <Card
      className={clsx(
        'h-[290px] text-left px-1 py-8 border rounded-[16px] transition-all duration-200',
        active
          ? 'bg-[#3F8FEE] text-white'
          : 'bg-white border-[#C3DCFA] text-[#2D66A9]',
        index === 2 ? ' col-span-2 md:col-span-1' : ''
      )}
    >
      <CardContent className="flex flex-col justify-between h-full px-3 sm:px-6 py-0">
        <div className="space-y-2 sm:space-y-4 flex-grow">
          <h3 className="font-raleway font-semibold text-16 sm:text-[20px] leading-[26px]">
            {title}
          </h3>
          <p
            className={clsx(
              'font-raleway font-bold text-20 sm:text-[32px] leading-[100%]',
              active ? 'text-[#fff]' : 'text-[#3F8FEE]'
            )}
          >
            {price}
          </p>
          <p
            className={clsx(
              'font-raleway font-normal text-14 sm:text-[14px] ',
              active ? 'text-white/80' : 'text-[#4A4C56]'
            )}
          >
            {details}
          </p>
        </div>
        <div className="mt-4">
          <button
            onClick={() => onBookNow?.(title)}
            className={clsx(
              'font-raleway font-medium text-[16px] leading-[140%] border border-[#3F8FEE] px-4 py-[6px] rounded-full transition w-full',
              active
                ? 'bg-white text-[#3F8FEE] hover:bg-gray-100'
                : 'text-[#3F8FEE] hover:bg-blue-50'
            )}
          >
            Book Now
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
