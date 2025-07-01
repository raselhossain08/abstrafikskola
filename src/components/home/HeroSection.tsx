import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '../ui/card';
const heroData = [
  {
    icon: '/img/hero/icon1.svg',
    title: 'Drive Now, Pay Later!',
    text: 'Drive now, pay later with the help of Resurs Bank – interest-free instalment payments for up to 24 months.',
  },
  {
    icon: '/img/hero/icon2.svg',
    title: 'Top-Notch Instructors!',
    text: 'Best teachers in the branch who are passionate and skilled about their jobs.',
  },
  {
    icon: '/img/hero/icon3.svg',
    title: 'Same Car as Trafikverket!',
    text: 'Practice in the similar types of new car you’ll use for your driving test – Just like Trafikverket Förarprov!',
  },
  {
    icon: '/img/hero/icon4.svg',
    title: 'Help with Exam Bookings!',
    text: 'Assistance in finding exam booking slots for those who successfully complete all driving stages.',
  },
  {
    icon: '/img/hero/icon5.svg',
    title: 'Open on Weekends!',
    text: 'Flexible weekend hours to fit your busy schedule.',
  },
];
export default function HeroSection() {
  return (
    <div className="  relative w-full bg-white px-6 xl:px-0">
      <div className="w-full xl:w-[1320px] mx-auto  relative z-10">
        <div className="flex py-14">
          <div className="w-1/2 flex flex-col items-center justify-center space-y-2">
            <h4 className="font-sansat font-light text-gray-500 text-20 text-center tracking-[0.35em] uppercase">
              Welcome to
            </h4>
            <h1 className="font-raleway font-bold text-64 leading-[1.3] tracking-[0.03em] text-center text-custom-1">
              ABS TRAFIKSKOLA
            </h1>
            <h3 className="font-sansation-light font-light text-xl tracking-[0.2em] uppercase leading-[1.4] text-custom-2 text-center">
              Driving License with Confident
            </h3>
            <Button className=" bg-custom-3 hover:opacity-20 w-[200px] h-[48px] rounded-[30px] font-raleway font-medium text-[18px] leading-[26px] tracking-normal text-white hover:bg-custom-3 hover:text-white">
              Book Training
            </Button>
            {/*  */}
            <div className=" inline-block relative w-[518px] h-[151px]">
              <Image
                src={'/img/heroShape.svg'}
                alt="Hero Image"
                width={518}
                height={151}
              />
              <div className="flex items-center h-full  absolute left-0 top-0 ">
                <div className="w-[151px] h-[151px] flex flex-col items-center justify-center  rounded-full  space-y-1">
                  <h3 className="font-raleway font-bold text-16 leading-none tracking-normal text-white">
                    KORLEKTION <span className="text-14 font-medium">FR.</span>
                  </h3>
                  <h3 className="font-raleway font-medium text-14 leading-none tracking-normal text-white">
                    endast <span className="text-16 font-bold">575 kr.</span>
                  </h3>
                </div>
                <div className="flex items-center h-full  pl-4">
                  <h2 className="font-raleway font-[600] text-[18px] leading-[100%] tracking-[0] uppercase text-white w-[305px]">
                    Competitive Price Exceptional Driving Lesson
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 relative justify-end flex items-center pr-8 pt-8">
            <Image
              width={586}
              height={410}
              src="/img/hero/1.png"
              alt=""
              className="w-[586px] h-auto object-cover relative z-10"
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-8 mt-8 pb-20">
          {heroData.map(({ icon, title, text }, index) => (
            <Card key={index} className="border border-[#E5E7EB]  shadow-none ">
              <CardHeader className="w-full flex justify-center items-center ">
                <div className="flex border border-blue-100 rounded-full w-[50px] h-[50px] items-center justify-center">
                  <Image src={icon} alt={title} width={24} height={24} />
                </div>
              </CardHeader>
              <CardContent className="">
                <h2 className="font-raleway font-semibold text-[18px] leading-tight tracking-wide text-center uppercase text-custom-2 mb-3">
                  {title}
                </h2>
                <p className="font-raleway text-[14px] leading-relaxed text-center text-gray-700">
                  {text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {/* effects */}
      <div className=" absolute top-0 left-0 ">
        <img
          src="/effects/1.png"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className=" absolute top-0 left-0 flex justify-center ">
        <img
          src="/effects/2.png"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
    </div>
  );
}
