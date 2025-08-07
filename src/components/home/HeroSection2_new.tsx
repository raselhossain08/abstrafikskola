import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '../ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

const staticHeroData = [
  {
    icon: '/img/hero/icon1.svg',
    title: 'Drive Now, Pay Later!',
    text: 'Drive now, pay later with the help of Resurs Bank - interest-free instalment payments for up to 24 months.',
  },
  {
    icon: '/img/hero/icon2.svg',
    title: 'Top-Notch Instructors!',
    text: 'Best teachers in the branch who are passionate and skilled about their jobs.',
  },
  {
    icon: '/img/hero/icon3.svg',
    title: 'Same Car as Trafikverket!',
    text: 'Practice in the similar types of new car you will use for your driving test - Just like Trafikverket Forarprov!',
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

export default function HeroSection2() {
  // Use static data directly since we removed i18n
  const heroData = staticHeroData;

  return (
    <div
      className="  relative w-full bg-white px-4 xl:px-0  bg-no-repeat bg-cover"
      style={{ backgroundImage: 'url(/img/hero/2.png)' }}
    >
      <div className="w-full xl:w-[1320px] mx-auto  relative z-10 pb-10">
        <div className="flex py-14 justify-center">
          <div className="w-full sm:w-[648px] flex flex-col items-center justify-center space-y-2">
            <h4 className="font-sansat font-light text-white text-12  sm:text-20 text-center tracking-[5px] uppercase">
              Welcome To Our School
            </h4>
            <h1 className=" font-bold  text-28 sm:text-64  leading-[30px] sm:leading-[68px] tracking-[3px] sm:tracking-[5px] text-center text-white">
              Learn to Drive with Confidence
            </h1>
            <h3 className="font-sansat font-semiBold text-14 sm:text-20 tracking-[20%] uppercase leading-[140%] text-white text-center pb-8">
              Professional Driving School in Södertälje
            </h3>
            <Button className=" bg-custom-3 w-[200px] h-[48px] rounded-[30px] font-raleway font-medium text-[18px] leading-[26px] tracking-normal text-white hover:bg-custom-3 hover:text-white mb-8">
              Book Now
            </Button>
            {/*  */}
            <div className=" inline-block relative  my-5">
              <Image
                src={'/img/hero/icon7.svg'}
                alt="Hero Image"
                width={518}
                height={151}
              />
            </div>
          </div>
        </div>
        <div className="xl:grid grid-cols-5 gap-5 mt-8 pb-20 hidden ">
          {heroData.map(({ icon, title, text }, index) => (
            <Card
              key={index}
              className="border border-[#FFFFFF80]  shadow-none "
            >
              <CardHeader className="w-full flex justify-center items-center ">
                <div className="flex border border-[#070707] rounded-full w-[50px] h-[50px] items-center justify-center">
                  <Image
                    src={icon}
                    alt={title}
                    width={24}
                    height={24}
                    className=" saturate-0"
                  />
                </div>
              </CardHeader>
              <CardContent className="">
                <h2 className="font-raleway font-semibold text-16 leading-tight tracking-[0.5%] text-center uppercase text-custom-2 mb-3">
                  {title}
                </h2>
                <p className="font-raleway text-12 leading-relaxed text-center text-gray-700">
                  {text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Carousel
          opts={{
            align: 'center',
          }}
          className="w-full xl:hidden "
        >
          <CarouselContent>
            {heroData.map(({ icon, title, text }, index) => (
              <CarouselItem
                key={index}
                className="basis-2/3 sm:basis-4/12 md:basis-3/12"
              >
                <Card
                  key={index}
                  className="border border-[#FFFFFF80]  shadow-none h-[244px] "
                >
                  <CardHeader className="w-full flex justify-center items-center ">
                    <div className="flex border border-[#070707] rounded-full w-[50px] h-[50px] items-center justify-center">
                      <Image
                        src={icon}
                        alt={title}
                        width={24}
                        height={24}
                        className=" saturate-0"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="">
                    <h2 className="font-raleway font-semibold text-16 leading-tight tracking-[0.5%] text-center uppercase text-custom-2 mb-3">
                      {title}
                    </h2>
                    <p className="font-raleway text-12 leading-relaxed text-center text-gray-700">
                      {text}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
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
