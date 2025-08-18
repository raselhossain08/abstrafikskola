"use client";

import { useState, useEffect } from 'react';
import Contact from '@/components/common/Contact';
import paymentContentService, { PaymentContent } from '@/services/paymentContentService';

export default function Page() {
  const [content, setContent] = useState<PaymentContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPaymentContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const paymentData = await paymentContentService.getPaymentContent();
        setContent(paymentData);
      } catch (err) {
        console.error('Failed to load payment content:', err);
        setError('Failed to load payment information');
      } finally {
        setLoading(false);
      }
    };

    loadPaymentContent();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#F7FAFF] pt-16 pb-24 px-4">
        <div className="w-full xl:w-[1320px] mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
            <div className="flex justify-center gap-12">
              <div className="w-[425px] h-[399px] bg-gray-200 rounded-[19px]"></div>
              <div className="w-[425px] h-[399px] bg-gray-200 rounded-[19px]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="bg-[#F7FAFF] pt-16 pb-24 px-4">
        <div className="w-full xl:w-[1320px] mx-auto text-center">
          <h1 className="text-red-600 text-2xl font-bold mb-4">Error Loading Payment Information</h1>
          <p className="text-gray-600">{error || 'Unable to load payment content'}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#F7FAFF] pt-16 pb-24 px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <h1 className="text-[#1D1F2C] text-2xl sm:text-[56px] font-bold text-center mb-5 md:mb-0">
            {content.title}
          </h1>

          <p className="w-full text-[#4A4C56] md:w-[648px] mx-auto text-center pb-8">
            {content.description}
          </p>

          <div className="flex justify-center items-center gap-12 md:flex-row flex-col">
            {/* Swish Card */}
            <div className="md:w-[425px] h-[399px] px-[87px] py-[18px] flex flex-col justify-center border border-[#E9E9EA80] text-center rounded-[19px] bg-white">
              <img
                src={content.swish.qrImage.url}
                alt="Swish QR Code"
                className="mb-5 w-[250px]"
              />
              <h4 className="font-medium text-[18px] leading-[26px] text-[#1D1F2C]">
                {content.swish.companyName}
              </h4>
              <h2 className="text-[32px] font-bold text-[#3F8FEE]">
                {content.swish.number}
              </h2>
              <h3 className="text-[16px] font-bold text-[#1D1F2C]">
                Swish number
              </h3>
            </div>

            {/* BankGiro Card */}
            <div className="md:w-[425px] h-[399px] px-[87px] py-[18px] flex flex-col justify-center border border-[#E9E9EA80] text-center rounded-[19px] bg-white">
              <img
                src={content.bankGiro.logo.url}
                alt="Bank Giro Logo"
                className="mb-6 mt-8 w-[250px]"
              />
              <h4 className="font-medium text-[18px] leading-[26px] text-[#1D1F2C]">
                {content.bankGiro.companyName}
              </h4>
              <h2 className="text-[32px] font-bold text-[#3F8FEE]">
                {content.bankGiro.number}
              </h2>
              <div className="bg-[#9fc7f7] h-[1px] w-[181px] mx-auto my-1"></div>
              <h3 className="text-[16px] font-bold text-[#1D1F2C]">
                Bank Giro
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <Contact />
    </>
  );
}
