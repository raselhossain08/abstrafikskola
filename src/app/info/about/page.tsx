import Contact from '@/components/common/Contact';
import Image from 'next/image';
import React from 'react';
import { FaCheck } from 'react-icons/fa';

// Temporary interface until service is fixed
interface SimpleSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

// API call function
async function getAboutContent() {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    const response = await fetch(`${API_BASE_URL}/about-content`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching about content:', error);
    return null;
  }
}

export default async function page() {
  try {
    const aboutContent = await getAboutContent();
    
    if (!aboutContent) {
      return (
        <div className="bg-white pt-16 pb-24 px-4">
          <div className="w-full xl:w-[1320px] mx-auto text-center">
            <h1 className="text-[#1D1F2C] text-24 md:text-[50px] font-bold mb-5">
              Content Loading Error
            </h1>
            <p>Please try again later.</p>
          </div>
        </div>
      );
    }

    return (
    <>
      <div className="bg-white pt-16 pb-24 px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <div className="flex items-end md:flex-row flex-col-reverse w-full">
            <div className="w-full md:w-1/2  md:pr-8">
              <h1 className=" text-[#1D1F2C] text-24 md:text-[50px] font-bold text-left mb-5">
                {aboutContent.history.title}
              </h1>
              {aboutContent.history.sections
                .sort((a: SimpleSection, b: SimpleSection) => a.order - b.order)
                .map((section: SimpleSection, index: number) => (
                <div key={section.id || index} className="mb-5 text-16 tracking-[0.5%] text-[#4A4C56]">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className=" border-[1.5px] w-[28px] h-[28px] border-[#1474FC] rounded-full flex items-center justify-center text-12 text-[#1474FC]">
                      <FaCheck />
                    </div>
                    <h2 className=" text-[#4A4C56] font-[600] text-18 md:text-24 ">
                      {section.title}
                    </h2>
                  </div>
                  <p className="">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
            <div className="w-full md:w-1/2 h-full">
              <div className="flex justify-end items-end h-full">
                <Image 
                  src={aboutContent.history.images?.desktop?.url || "/img/about-us/1.png"} 
                  alt={aboutContent.history.images?.desktop?.alt || "Our history"} 
                  width={667}
                  height={426}
                  className=" md:block hidden"
                />
                <Image 
                  src={aboutContent.history.images?.mobile?.url || "/img/about-us/3.png"} 
                  alt={aboutContent.history.images?.mobile?.alt || "Our history"} 
                  width={667}
                  height={500}
                  className=" md:hidden  block mb-10"
                />
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className=" flex items-end md:flex-row flex-col mt-16">
            <div className="w-full md:w-1/2 h-full">
              <div className="flex  items-end h-full">
                <Image 
                  src={aboutContent.services.images?.desktop?.url || "/img/about-us/2.png"} 
                  alt={aboutContent.services.images?.desktop?.alt || "Our services"} 
                  width={608}
                  height={500}
                  className=" md:block hidden"
                />
                <Image 
                  src={aboutContent.services.images?.mobile?.url || "/img/about-us/4.png"} 
                  alt={aboutContent.services.images?.mobile?.alt || "Our services"} 
                  width={608}
                  height={500}
                  className=" md:hidden block my-8"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pl-8">
              <h1 className=" text-[#1D1F2C] text-24 md:text-[50px] font-bold text-left mb-5">
                {aboutContent.services.title}
              </h1>
              {aboutContent.services.sections
                .sort((a: SimpleSection, b: SimpleSection) => a.order - b.order)
                .map((section: SimpleSection, index: number) => (
                <div key={section.id || index} className="mb-5 text-16 tracking-[0.5%] text-[#4A4C56]">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className=" border-[1.5px] w-[28px] h-[28px] border-[#1474FC] rounded-full flex items-center justify-center text-12 text-[#1474FC]">
                      <FaCheck />
                    </div>
                    <h2 className=" text-[#4A4C56] font-[600] text-18 md:text-24 ">
                      {section.title}
                    </h2>
                  </div>
                  <p>
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Contact />
    </>
  );
  } catch (error) {
    console.error('Error loading about content:', error);
    return (
      <div className="bg-white pt-16 pb-24 px-4">
        <div className="w-full xl:w-[1320px] mx-auto text-center">
          <h1 className="text-[#1D1F2C] text-24 md:text-[50px] font-bold mb-5">
            Content Loading Error
          </h1>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }
}
