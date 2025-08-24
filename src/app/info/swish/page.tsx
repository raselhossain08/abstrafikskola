"use client";

import Contact from '@/components/common/Contact';
import React, { useState, useEffect } from 'react';
import paymentContentService, { PaymentContent } from '@/services/paymentContentService';
import { useLanguage } from '@/contexts/LanguageContext';
import Head from 'next/head';

export default function SwishPage() {
  const { language } = useLanguage();
  const [paymentContent, setPaymentContent] = useState<PaymentContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPaymentContent = async () => {
      try {
        setLoading(true);
        setError(null);
        // Set the service language and fetch content
        paymentContentService.setLanguage(language);
        const content = await paymentContentService.getPaymentContent(language);
        setPaymentContent(content);
        console.log('✅ Payment content loaded:', content);
      } catch (error) {
        console.error('❌ Error loading payment content:', error);
        setError('Failed to load payment information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadPaymentContent();
  }, [language]); // Reload when language changes

  if (loading) {
    return (
      <>
        <div className="bg-[#F7FAFF] pt-16 pb-24 px-4">
          <div className="w-full xl:w-[1320px] mx-auto">
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3F8FEE]"></div>
            </div>
          </div>
        </div>
        <Contact />
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="bg-[#F7FAFF] pt-16 pb-24 px-4">
          <div className="w-full xl:w-[1320px] mx-auto">
            <div className="flex justify-center items-center h-96">
              <div className="text-center">
                <div className="text-red-500 text-lg mb-4">⚠️ {error}</div>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-[#3F8FEE] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
        <Contact />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{paymentContent?.seo?.title || 'Payment Methods - Swish & Bank Giro - ABS Trafikskola'}</title>
        <meta name="description" content={paymentContent?.seo?.description || 'Pay for your driving lessons using Swish or Bank Giro. Secure and convenient payment options available.'} />
        <meta name="keywords" content={paymentContent?.seo?.keywords?.join(', ') || 'payment, swish, bank giro, driving lessons'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="bg-[#F7FAFF] pt-16 pb-24  px-4">
        <div className=" w-full  xl:w-[1320px] mx-auto">
          <h1 className=" text-[#1D1F2C] text-20 sm:text-[56px] font-bold text-center mb-5 md:mb-0">
            {paymentContent?.title || 'Swish/BG'}
          </h1>
          <p className="w-full text-[#4A4C56] md:w-[648px] mx-auto text-center pb-8">
            {paymentContent?.description || 'Please use the following swish or bank giro number to pay ABS Trafikskola AB. Please put your name and personnumber in message with payment.'}
          </p>
          <div className="flex justify-center items-center gap-12 md:flex-row flex-col">
            <div className="md:w-[425px] h-[399px] px-[87px] py-[18px] flex flex-col justify-center border border-[#E9E9EA80] text-center rounded-[19px] bg-white">
              <img
                src={paymentContent?.swish?.qrImage?.url || "/img/switch/qr.svg"}
                alt="Swish QR Code"
                className=" mb-5 w-[250px]"
              />
              <h4 className="font-medium text-[18px] leading-[26px] text-[#1D1F2C]">
                {paymentContent?.swish?.companyName || 'ABS Trafikskola AB'}
              </h4>
              <h2 className=" text-[32px] font-bold text-[#3F8FEE]">
                {paymentContent?.swish?.number || '1234323788'}
              </h2>
              <h3 className="text-[16px] font-bold text-[#1D1F2C]">
                {language === 'sv' ? 'Swish nummer' : language === 'ar' ? 'رقم سويش' : 'Swish number'}
              </h3>
            </div>

            <div className="md:w-[425px] h-[399px] px-[87px] py-[18px] flex flex-col justify-center border border-[#E9E9EA80] text-center rounded-[19px] bg-white">
              <img
                src={paymentContent?.bankGiro?.logo?.url || "/img/switch/bankgirot.svg"}
                alt="Bank Giro Logo"
                className=" mb-26 mt-8 w-[250px]"
              />
              <h4 className="font-medium text-[18px] leading-[26px] text-[#1D1F2C] ">
                {paymentContent?.bankGiro?.companyName || 'ABS Trafikskola AB'}
              </h4>
              <h2 className=" text-[32px] font-bold text-[#3F8FEE]">
                {paymentContent?.bankGiro?.number || '5158-3573'}
              </h2>
              <div className="bg-[#9fc7f7] h-[1px] w-[181px] mx-auto my-1"></div>
              <h3 className="text-[16px] font-bold text-[#1D1F2C]">
                {language === 'sv' ? 'Bank Giro' : language === 'ar' ? 'جيرو البنك' : 'Bank Giro'}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <Contact />
    </>
  );
}
