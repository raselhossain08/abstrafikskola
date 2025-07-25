'use client';
import Contact from '@/components/common/Contact';
import { ProductDialog } from '@/components/dialog/ProductDialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaCalendarAlt, FaRegClock } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import { SlLike } from 'react-icons/sl';
type HandledarkursItem = {
  date: string;
  time: string;
  title: string;
  seats: string;
  price: string;
};

const courseSlots: HandledarkursItem[] = [
  {
    date: '2024-03-20 Wednesday',
    time: '17:00 - 20:15',
    title: 'Handledarkurs [Svenska]',
    seats: '5 seats available',
    price: '299 kr',
  },
  {
    date: '2024-03-24 Sunday',
    time: '10:00 - 13:15',
    title: 'Handledarkurs [Svenska]',
    seats: '5 seats available',
    price: '299 kr',
  },
  {
    date: '2024-03-24 Sunday',
    time: '10:00 - 13:15',
    title: 'Handledarkurs [Svenska]',
    seats: '5 seats available',
    price: '299 kr',
  },
  {
    date: '2024-03-20 Wednesday',
    time: '17:00 - 20:15',
    title: 'Handledarkurs [Svenska]',
    seats: '5 seats available',
    price: '299 kr',
  },
  {
    date: '2024-03-20 Wednesday',
    time: '17:00 - 20:15',
    title: 'Handledarkurs [Svenska]',
    seats: '5 seats available',
    price: '299 kr',
  },
  {
    date: '2024-03-20 Wednesday',
    time: '17:00 - 20:15',
    title: 'Handledarkurs [Svenska]',
    seats: '5 seats available',
    price: '299 kr',
  },
];

export default function page() {
  const [handledarkursOpen, setHandledarkursOpen] = useState(false);
  const [popupData, setPopupData] = useState<HandledarkursItem>(courseSlots[0]);

  const handleSubmit = (data: HandledarkursItem) => {
    setHandledarkursOpen(true);
    setPopupData(data);
    console.log(data);
  };
  return (
    <>
      <div className="bg-[#F7FAFF] py-[56px] md:py-[120px] px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <h1 className="text-24 sm:text-56 font-bold  text-[#1D1F2C] leading-[140%] text-center pb-5">
            Handledarkurs Schedule and Prices
          </h1>
          <div className="w-full sm:w-[872px] mx-auto pb-10">
            <p className=" text-16 leading-[140%] text-center font-normal text-[#4A4C56]">
              Prepare for private driving lessons with our Handledarkurs. This
              mandatory introductory course sets the foundation for safe
              driving. Check out our upcoming schedule and prices, and book your
              session online
            </p>
          </div>
          {/* desktop version */}
          <div className=" w-full">
            {courseSlots.map((item, index) => {
              return (
                <div
                  className="hidden xl:flex items-center justify-between bg-[0px 4px 35px 0px #0000000A] bg-white border border-[#FFFFFF] py-[9px] px-[24px] rounded-[8px] mb-8"
                  style={{ boxShadow: ' 0px 4px 35px 0px #0000001A' }}
                  key={index}
                >
                  <div className="flex items-center space-x-2 w-[242px]">
                    <Image
                      src="/icons/calendar.svg"
                      height={19.5}
                      width={19.5}
                      alt="calender"
                    />
                    <p className=" text-[#4A4C56] font-medium text-16">
                      {item.date}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 w-[124px]">
                    <Image
                      src="/icons/watch.svg"
                      height={19.5}
                      width={19.5}
                      alt="clock"
                    />
                    <p className="text-[#4A4C56] font-medium text-16">
                      {item.time}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 w-[290px]">
                    <h2 className=" text-24 font-bold tracking-[0.5%] text-[#1D1F2C]">
                      {item.title}
                    </h2>
                  </div>
                  <div className="flex items-center bg-[#ECF4FD80] border border-[#ECF4FD] px-[16px] py-[6px] space-x-3 rounded-[30px] text-[#3F8FEE] w-[220px]">
                    <Image
                      src="/icons/like.svg"
                      height={19.5}
                      width={19.5}
                      alt="calender"
                    />
                    <span> &gt; {item.seats}</span>
                  </div>
                  <div className="">
                    <h1 className=" text-40 font-bold  text-[#3F8FEE]">
                      {item.price}
                    </h1>
                  </div>
                  <div className="">
                    <Button
                      className=" border border-[#3F8FEE] rounded-[30px] h-[48px] min-w-[130px] bg-[#3F8FEE]  flex items-center justify-center font-sansat text-14 tracking-[0.5%] leading-[140%] hover:bg-[#3F8FEE] text-white "
                      onClick={() => handleSubmit(item)}
                    >
                      Book
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* mobile version */}
          <div className=" w-full">
            {courseSlots.map((item, index) => {
              return (
                <div
                  className="block xl:hidden bg-[0px 4px 35px 0px #0000000A] bg-white border border-[#FFFFFF] py-[10px] px-[24px] rounded-[8px] mb-8"
                  style={{ boxShadow: ' 0px 4px 35px 0px #0000001A' }}
                  key={index}
                >
                  <div className=" flex items-center justify-between">
                    <div className="w-8/12 space-y-3">
                      <div className="flex items-center space-x-2">
                        <h2 className=" text-16 font-bold tracking-[0.5%] text-[#1D1F2C]">
                          {item.title}
                        </h2>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Image
                          src="/icons/calendar.svg"
                          height={19.5}
                          width={19.5}
                          alt="calender"
                        />
                        <p className=" text-[#4A4C56] font-medium text-12">
                          {item.date}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Image
                          src="/icons/watch.svg"
                          height={19.5}
                          width={19.5}
                          alt="clock"
                        />
                        <p className="text-[#4A4C56] font-medium text-12">
                          {item.time}
                        </p>
                      </div>
                      <div className=" inline-flex items-center bg-[#ECF4FD80] border border-[#ECF4FD] px-[16px] py-[6px] space-x-3 rounded-[30px] text-[#3F8FEE] ">
                        <Image
                          src="/icons/like.svg"
                          height={19.5}
                          width={19.5}
                          alt="calender"
                        />
                        <span className=" text-12"> &gt; {item.seats}</span>
                      </div>
                    </div>
                    <div className=" flex flex-col justify-evenly items-center space-y-8">
                      <div className="">
                        <h1 className=" text-18 font-bold  text-[#3F8FEE]">
                          {item.price}
                        </h1>
                      </div>
                      <div className="">
                        <Button
                          className=" border border-[#3F8FEE] rounded-[30px] h-[32px] min-w-[100px] bg-[#3F8FEE]  flex items-center justify-center font-sansat text-14 tracking-[0.5%] leading-[140%] hover:bg-[#3F8FEE] text-white "
                          onClick={() => handleSubmit(item)}
                        >
                          Book
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className=" bg-white py-[56px] xl:py-[120px] px-4 ">
        <div className="w-full xl:w-[1320px] mx-auto">
          <h1 className="text-[24px] sm:text-35 font-[600]  text-[#1D1F2C]  pb-5 tracking-[0.5%]">
            Welcome to the Introduction Course at ABS Trafikskola Södertälje
            🚗🚦
          </h1>
          <p className="text-20 sm:text-30 font-[500]  text-[#1D1F2C] leading-[100%]  pb-3">
            Start your journey towards a driving license with us! 🌟
          </p>
          <p className="text-16 font-[400]  text-[#000000] leading-[140%] tracking-[0.5%]   w-11/12 pb-10">
            At ABS Trafikskola Södertälje, we offer an Introduction Course that
            is not only a legal requirement for private driving practice but
            also lays a solid foundation for safe and responsible driving.
          </p>
          <div className="flex justify-between items-center pb-12 flex-col-reverse md:flex-row">
            <div className="w-full md:w-[633px]">
              <h3 className="text-20 sm:text-32 font-medium  my-4">
                Why is the Introduction Course Important?
              </h3>
              <div className="flex space-x-4 items-start mb-4">
                <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12 mt-2">
                  <FaCheck />
                </div>
                <div className=" w-11/12 space-y-1">
                  <h3 className="text-16 font-bold sm:text-18 text-[#1D1F2C] tracking-[0.5%] leading-[140%] sm:font-semibold ">
                    For the Student
                  </h3>
                  <p className="text-16 font-normal leading-[140%] tracking-[0.5%] text-black">
                    Understand basic traffic rules, increase awareness of risks
                    on the road, and prepare for real-world driving.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4 items-start mb-2">
                <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12 mt-2">
                  <FaCheck />
                </div>
                <div className=" w-11/12 space-y-1">
                  <h3 className=" text-18 text-[#1D1F2C] tracking-[0.5%] leading-[140%] font-semibold ">
                    For the Instructor 
                  </h3>
                  <p className="text-16 font-normal leading-[140%] tracking-[0.5%] text-black">
                    Update knowledge on current driving laws, learn effective
                    teaching methods, and become certified to instruct
                    privately.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[633px]">
              <div className="flex w-full justify-between gap-8 md:gap-0">
                <div className=" flex flex-col justify-between">
                  <Image
                    src="/img/product/1.png"
                    width={300}
                    height={200}
                    alt="p1"
                    className="w-[300px] h-[190px] rounded-[22px] object-cover"
                  />
                  <Image
                    src="/img/product/2.png"
                    width={300}
                    height={200}
                    alt="p1"
                    className="w-[300px] h-[190px] rounded-[22px] object-cover"
                  />
                </div>
                <div className="">
                  <Image
                    src="/img/product/3.png"
                    width={300}
                    height={200}
                    alt="p1"
                    className="w-[300px] h-[407px] rounded-[22px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pb-12  flex-col md:flex-row">
            <div className="w-full md:w-[633px]">
              <div className="flex w-full justify-between gap-8 md:gap-0">
                <div className="">
                  <Image
                    src="/img/product/4.png"
                    width={300}
                    height={200}
                    alt="p1"
                    className="w-[300px] h-[407px] rounded-[22px] object-cover"
                  />
                </div>
                <div className=" flex flex-col justify-between">
                  <Image
                    src="/img/product/1.png"
                    width={300}
                    height={200}
                    alt="p1"
                    className="w-[300px] h-[190px] rounded-[22px] object-cover"
                  />
                  <Image
                    src="/img/product/2.png"
                    width={300}
                    height={200}
                    alt="p1"
                    className="w-[300px] h-[190px] rounded-[22px] object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-[633px]">
              <h3 className=" text-32 font-medium  my-4">
                What Our Course Offers:
              </h3>
              <div className="flex space-x-4 items-start mb-4">
                <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12 mt-2">
                  <FaCheck />
                </div>
                <div className=" w-11/12 space-y-1">
                  <h3 className=" text-18 text-[#1D1F2C] tracking-[0.5%] leading-[140%] font-semibold ">
                    Experienced Instructors
                  </h3>
                  <p className="text-16 font-normal leading-[140%] tracking-[0.5%] text-black">
                    Our teachers are experts at making learning both fun and
                    effective.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4 items-start mb-2">
                <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12 mt-2">
                  <FaCheck />
                </div>
                <div className=" w-11/12 space-y-1">
                  <h3 className=" text-18 text-[#1D1F2C] tracking-[0.5%] leading-[140%] font-semibold ">
                    Modern Education
                  </h3>
                  <p className="text-16 font-normal leading-[140%] tracking-[0.5%] text-black">
                    We use the latest technology and teaching materials.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-20 sm:text-32 font-medium mb-3 md:mb-6 text-[#1D1F2C]">
            Course Content
          </h2>
          <ul className="space-y-2 text-16 md:text-18 font-bold text-[#4A4C56] mb-8">
            <li className="flex items-center ">
              <span className="mt-1 mr-2 w-2 h-2 rounded-full bg-[#08316A]" />
              <span>Basic Traffic Rules</span>
            </li>
            <li className="flex items-center">
              <span className="mt-1 mr-2 w-2 h-2 rounded-full bg-[#08316A]" />
              <span>Risk Awareness</span>
            </li>
            <li className="flex items-center">
              <span className="mt-1 mr-2 w-2 h-2 rounded-full bg-[#08316A]" />
              <span>Practical Driving Tips</span>
            </li>
            <li className="flex items-center">
              <span className="mt-1 mr-2 w-2 h-2 rounded-full bg-[#08316A]" />
              <span>First Aid and Emergency Preparedness</span>
            </li>
          </ul>

          <div className="space-y-4 ">
            <div>
              <strong className="block text-[#000000] mb-1 text-16 md:text-18 font-bold leading-[26px]">
                Who Should Participate?
              </strong>
              <p className=" text-[#4A4C56] leading-[140%] text-16 font-normal tracking-[0.5%]">
                Anyone planning to learn to drive privately - both students and
                their private instructors. The course is crucial to ensure a
                safe and informed driving experience for all involved.
              </p>
            </div>

            <div>
              <strong className="block text-[#000000] mb-1 text-18 font-bold leading-[26px]">
                Book Your Spot Today!
              </strong>
              <p className=" text-[#4A4C56] leading-[140%] text-16 font-normal tracking-[0.5%]">
                Contact us to secure your place in our next Introduction Course.
                Don’t wait – spaces fill up quickly!
              </p>
            </div>

            <p className=" text-[#4A4C56] leading-[140%] text-16 font-normal tracking-[0.5%]">
              For more information on supervision and practice driving, visit
              Transportstyrelsen’s website.
            </p>

            <p className=" text-[#4A4C56] leading-[140%] text-16 font-normal tracking-[0.5%]">
              Remember, a good start is half the journey! We look forward to
              welcoming you to ABS Trafikskola Södertälje. 🚗🎉
            </p>
          </div>
        </div>
      </div>
      <Contact />
      <ProductDialog
        open={handledarkursOpen}
        onOpenChange={setHandledarkursOpen}
        data={popupData}
      />
    </>
  );
}
