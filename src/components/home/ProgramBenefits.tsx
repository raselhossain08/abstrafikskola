import { Card, CardContent } from '@/components/ui/card'; // If you're using shadcn
import { cn } from '@/lib/utils';
 // Optional utility for conditional classNames (shadcn)
import { ReactNode } from 'react';

type Benefit = {
  icon: ReactNode;
  title: string;
  description: string;
  active?: boolean;
};

const benefits: Benefit[] = [
  {
    icon: <div className="text-4xl">👨‍🏫</div>,
    title: 'Experienced Teachers',
    description:
      'Our instructors are highly experienced and passionate, ensuring you receive the best guidance throughout your learning journey with our driving school.',
    active: true,
  },
  {
    icon: <div className="text-4xl">📈</div>,
    title: 'Exceptional High Pass Rates',
    description:
      'We have some of the highest pass rates in the region, reflecting the quality of our driving lessons and training programs.',
  },
  {
    icon: <div className="text-4xl">💰</div>,
    title: 'Competitive Prices',
    description:
      'Enjoy top-notch driving lessons at the most competitive prices in the area.',
  },
  {
    icon: <div className="text-4xl">📍</div>,
    title: 'Central Location',
    description:
      'Located in the heart of Södertälje, close to Trafikverket exam centers.',
  },
  {
    icon: <div className="text-4xl">🛡️</div>,
    title: 'Comprehensive Guidance',
    description:
      'We guide you every step of the way to obtaining your driver’s license.',
  },
  {
    icon: <div className="text-4xl">💳</div>,
    title: 'Flexible Payment Options!',
    description:
      'Interest-free installment payments for up to 24 months with Resurs Bank.',
  },
  {
    icon: <div className="text-4xl">🕒</div>,
    title: 'Flexible Opening Hours',
    description: 'Open on weekends and evenings to fit your schedule.',
  },
  {
    icon: <div className="text-4xl">🏁</div>,
    title: 'Intensive Driving Lessons Program',
    description: 'Quick completion for those needing a license fast.',
  },
];

export default function ProgramBenefits() {
  return (
    <section className="bg-[#f7f9fc] py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, idx) => (
          <Card
            key={idx}
            className={cn(
              'text-center p-6 rounded-xl transition-all',
              benefit.active
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-white text-black hover:shadow'
            )}
          >
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="text-5xl">{benefit.icon}</div>
              <h4 className="text-lg font-semibold">{benefit.title}</h4>
              <p className="text-sm">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
