import Contact from '@/components/common/Contact';
import React from 'react';

export default function page() {
  return (
    <>
      <div className="bg-[#F7FAFF] pt-16 pb-24  px-4">
        <div className=" w-full  xl:w-[1320px] mx-auto">
          <h1 className=" text-[#1D1F2C] text-20 sm:text-[56px] font-bold text-center mb-5 md:mb-0">
            Swish/BG
          </h1>
          <p className="w-full text-[#4A4C56] md:w-[648px] mx-auto text-center pb-8">
            Please use the following swish or bank giro number to pay ABS
            Trafikskola AB. Please put your name and personnumber in message
            with payment.
          </p>
          <div className="flex justify-center items-center gap-12 md:flex-row flex-col">
            <div className="md:w-[425px] h-[399px] px-[87px] py-[18px] flex flex-col justify-center border border-[#E9E9EA80] text-center rounded-[19px] bg-white">
              <img
                src="/img/switch/qr.svg"
                alt=""
                className=" mb-5 w-[250px]"
              />
              <h4 className="font-medium text-[18px] leading-[26px] text-[#1D1F2C]">
                ABS Trafikskola AB
              </h4>
              <h2 className=" text-[32px] font-bold text-[#3F8FEE]">
                1234323788
              </h2>
              <h3 className="text-[16px] font-bold text-[#1D1F2C]">
                Swish number
              </h3>
            </div>

            <div className="md:w-[425px] h-[399px] px-[87px] py-[18px] flex flex-col justify-center border border-[#E9E9EA80] text-center rounded-[19px] bg-white">
              <img
                src="/img/switch/bankgirot.svg"
                alt=""
                className=" mb-26 mt-8 w-[250px]"
              />
              <h4 className="font-medium text-[18px] leading-[26px] text-[#1D1F2C] ">
                ABS Trafikskola AB
              </h4>
              <h2 className=" text-[32px] font-bold text-[#3F8FEE]">
                5158-3573
              </h2>
              <div className="bg-[#9fc7f7] h-[1px] w-[181px] mx-auto my-1"></div>
              <h3 className="text-[16px] font-bold text-[#1D1F2C]">
                Bank Giro
              </h3>
            </div>
          </div>
        </div>
      </div>
      <Contact />
    </>
  );
}
