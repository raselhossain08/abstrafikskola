import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function Contact() {
  return (
    <div
      style={{
        backgroundImage: 'url(/img/contact/contact-bg.png)',
        backgroundSize: 'cover',
      }}
      className="h-[400px] md:h-[600px] flex items-center justify-center"
    >
      <div className="container h-full px-4 lg:px-0">
        <div className="flex items-center justify-center h-full flex-col">
          <h3 className="font-raleway font-bold text-24 md:text-[40px] leading-[31px] md:leading-[42px] tracking-normal text-center text-white mb-3">
            Book Your First Driving <br /> Lesson And Contact Us
          </h3>
          <Link href="/contact">
            <Button className="bg-custom-3 hover:bg-custom-3 w-[200px] h-[48px] rounded-[30px] font-raleway font-medium text-[18px] leading-[26px] tracking-normal text-white mt-4 cursor-pointer">
              Contact us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
