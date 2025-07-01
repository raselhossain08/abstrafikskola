import Contact from '@/components/common/Contact';
import ContactForm from '@/components/common/ContactForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import React from 'react';
import { FaCheck } from 'react-icons/fa6';

export default function page() {
  return (
    <>
      <div
        style={{ backgroundImage: 'url(/img/contact/2.png)' }}
        className=" h-[400px] hidden md:flex items-center justify-center flex-col px-4 bg-no-repeat  bg-right"
      >
        <h2 className="text-48 font-bold text-[#3F8FEE]">Contact Us</h2>
        <p className=" text-white font-normal text-16 text-center">
          A driving school in Södertälje with most affordable prices
        </p>
      </div>
      <div
        style={{ backgroundImage: 'url(/img/contact/mobile.png)' }}
        className=" h-[400px] md:hidden flex items-center justify-center flex-col px-4 bg-no-repeat  bg-right"
      >
        <h2 className="text-24 sm:text-48 font-bold text-[#3F8FEE]">
          Contact Us
        </h2>
        <p className=" text-white font-normal text-16 text-center">
          A driving school in Södertälje with most affordable prices
        </p>
      </div>
      <div className="bg-white py-20 px-4">
        <div className=" w-full xl:w-[1320px] mx-auto">
          <div className="w-full flex justify-between items-center md:flex-row flex-col">
            <div className="w-full xl:w-[588px] ">
              <h1 className=" text-[#1D1F2C] font-semibold text-18 sm:text-32 pb-4 md:pb-8">
                Contact
              </h1>
              <p className=" text-[#4A4C56] font-normal text-16 leading-[140%] tracking-[0.5%]">
                Proin gravida nibh vel velit auctor aliquet. Aenean
                sollicitudin, lorem quis bibendum auctor, nisi elit consequat.
              </p>
              <div className="flex items-center space-x-3 mb-4 mt-4">
                <div className="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#ECF4FD33] border-[#ECF4FD] border">
                  <img src="/icons/social/facebook.svg" alt="facebook" />
                </div>
                <div className=" space-y-1">
                  <h3 className=" text-[#1D1F2C] font-[600] text-16 sm:text-18 leading-[26px]">
                    Call Us
                  </h3>
                  <p className=" text-[#4A4C56] font-[400] text-16 leading-[140%] tracking-[0.5%]">
                    08 550 66666 ,
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#ECF4FD33] border-[#ECF4FD] border">
                  <img src="/icons/social/whatsapp.svg" alt="whatsapp" />
                </div>
                <div className=" space-y-1">
                  <h3 className=" text-[#1D1F2C] font-[600] text-16 sm:text-18 leading-[26px]">
                    WhatsApp/SMS
                  </h3>
                  <p className=" text-[#4A4C56] font-[400] text-16 leading-[140%] tracking-[0.5%]">
                    073 938 8424
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#ECF4FD33] border-[#ECF4FD] border">
                  <img src="/icons/social/sms.svg" alt="sms" />
                </div>
                <div className="space-y-1">
                  <h3 className=" text-[#1D1F2C] font-[600] text-16 sm:text-18 leading-[26px]">
                    Send Us Mail
                  </h3>
                  <p className=" text-[#4A4C56] font-[400] text-16 leading-[140%] tracking-[0.5%]">
                    info@abstraflkskola.se
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#ECF4FD33] border-[#ECF4FD] border">
                  <img src="/icons/social/location.svg" alt="location" />
                </div>
                <div className="space-y-1">
                  <h3 className=" text-[#1D1F2C] font-[600] text-16 sm:text-18 leading-[26px]">
                    Find the Studio
                  </h3>
                  <p className=" text-[#4A4C56] font-[400] text-16 leading-[140%] tracking-[0.5%]">
                    Dalgatan 1 1, 15133 Södertälje
                  </p>
                </div>
              </div>

              <div className=" bg-[#ECF4FD] inline-flex items-center justify-center px-[16px] py-[10px] rounded-[30px] mb-4">
                <h3 className=" text-[#3F8FEE] font-semibold text-16 sm:text-18">
                  Tel/Reception : Mon-Fri 09.00-17.00
                </h3>
              </div>
              <div className=" bg-[#ECF4FD] inline-flex items-center justify-center px-[16px] py-[10px] rounded-[30px] mb-4">
                <h3 className=" text-[#3F8FEE] font-semibold text-16 sm:text-18">
                  Driving lessons/Courses : 7 days a week 07.00-19.30
                </h3>
              </div>
              <div className="mb-3">
                <div className="flex items-start space-x-3 mb-3">
                  <div className=" border-[1.5px] w-[28px] h-[28px] border-[#1474FC] rounded-full flex items-center justify-center text-12 text-[#1474FC]">
                    <FaCheck />
                  </div>
                  <p className=" text-16 font-normal leading-[140%] text-[#4A4C56] w-10/12 tracking-[0.5%]">
                    We are open seven days a week for driving lessons, risk1,
                    risk2 and introduktionsutbildning.
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-start space-x-3 mb-3">
                  <div className=" border-[1.5px] w-[28px] h-[28px] border-[#1474FC] rounded-full flex items-center justify-center text-12 text-[#1474FC]">
                    <FaCheck />
                  </div>
                  <p className=" text-16 font-normal leading-[140%] text-[#4A4C56] w-10/12 tracking-[0.5%]">
                    Our reception and telephone hours are open Monday to Friday
                    09.00 - 17.00.
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-start space-x-3 mb-3">
                  <div className=" border-[1.5px] w-[28px] h-[28px] border-[#1474FC] rounded-full flex items-center justify-center text-12 text-[#1474FC]">
                    <FaCheck />
                  </div>
                  <p className=" text-16 font-normal leading-[140%] text-[#4A4C56] w-10/12 tracking-[0.5%]">
                    If you have any questions or queries, please call us, email
                    us or stop by our driving school.
                  </p>
                </div>
              </div>
              <div className="map mb-20 sm:mb-0">
                <Image alt="" src="/img/map.png" width={591} height={279} />
              </div>
            </div>
            <div className="w-full xl:w-[632px] rounded-[16px] border border-[#ECF4FD] px-[24px] py-[26px] bg-[#F7FAFF]">
              <h3 className=" text-[#1D1F2C] font-bold sm:font-semibold text-18 sm:text-32 text-center  mb-4">
                Get In Touch With Us
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
