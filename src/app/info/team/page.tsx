import Contact from '@/components/common/Contact';
import React from 'react';

export default function page() {
  return (
    <>
      <div className="bg-[#F7FAFF] pt-16 pb-24 px-4">
        <div className=" w-full xl:w-[1320px] mx-auto">
          <h1 className=" text-[#1D1F2C] text-24 sm:text-[56px] font-bold sm:text-center">
            Team Are Helping You
          </h1>
          <div className="flex justify-center items-center gap-16 pt-12 md:flex-row flex-col">
            <div className=" w-full sm:w-1/2 xl:w-[624px] ">
              <img src="/img/team/1.png" alt="" className=" mb-5 w-full" />
              <h1 className="font-bold text-20 sm:text-[32px]  text-black">
                Sangit Alam
              </h1>
              <h3 className="text-[18px] font-medium text-[#4A4C56]">
                Trafikskolechef, Utbildningsledare
              </h3>
            </div>

            <div className="w-full sm:w-1/2 xl:w-[624px] ">
              <img src="/img/team/2.png" alt="" className=" mb-5 w-full" />
              <h1 className="font-bold text-20  sm:text-[32px]  text-black">
                Mrad Sarkes
              </h1>
              <h3 className="text-[18px] font-medium text-[#4A4C56]">
                Trafiklärare
              </h3>
            </div>
          </div>
        </div>
      </div>

      <Contact />
    </>
  );
}
