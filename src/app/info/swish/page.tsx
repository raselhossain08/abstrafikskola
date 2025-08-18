import React from 'react';
import Image from 'next/image';

export default function SwishPage() {
  return (
    <div className="bg-white pt-16 pb-24 px-4">
      <div className="w-full xl:w-[1320px] mx-auto">
        <div className="text-center">
          <h1 className="text-[#1D1F2C] text-24 md:text-[50px] font-bold mb-8">
            Swish Payment
          </h1>
          <div className="max-w-md mx-auto">
            <p className="text-16 text-[#4A4C56] mb-8">
              Pay quickly and securely with Swish
            </p>
            <div className="bg-gray-50 p-8 rounded-lg">
              <Image
                src="/icons/swish-logo.svg"
                alt="Swish Logo"
                width={100}
                height={100}
                className="mx-auto mb-4"
              />
              <p className="text-14 text-[#4A4C56]">
                Swish payment information will be available here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
