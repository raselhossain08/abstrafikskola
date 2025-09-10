'use client';

import Contact from '@/components/common/Contact';
import Gallery from '@/components/home/Gallery';
import HeroSection2 from '@/components/home/HeroSection2';
import IntensiveDrivingProgram from '@/components/home/IntensiveDrivingProgram';
import PricingSection from '@/components/home/PricingSection';
import StudentFeedback from '@/components/home/StudentFeedback';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Image from 'next/image';

export default function Home() {
  return (
    <div className=' lt'>
      <HeroSection2 />
      <PricingSection />
      <IntensiveDrivingProgram />
      <WhyChooseUs />
      <StudentFeedback />
      <Gallery />
      <Contact />
    </div>
  );
}
