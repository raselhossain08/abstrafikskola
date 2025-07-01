'use client'
import Contact from '@/components/common/Contact';
import { Handledarkurs } from '@/components/dialog/Handledarkurs';
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
const riskOneSlots: HandledarkursItem[] = [
  {
    date: '2024-06-18 Tuesday',
    time: '17:00 - 20:15',
    title: 'Risk 1 [Swedish]',
    seats: ' 5 places left',
    price: '399 kr',
  },
  {
    date: '2024-06-08 Saturday',
    time: '10:00 - 13:15',
    title: 'Risk 1 [Swedish]',
    seats: ' 5 places left',
    price: '399 kr',
  },
  {
    date: '2024-06-08 Saturday',
    time: '10:00 - 13:15',
    title: 'Risk 1 [Swedish]',
    seats: '5 places left',
    price: '399 kr',
  },
  {
    date: '2024-06-15 Saturday',
    time: '10:00 - 13:15',
    title: 'Risk 1 [English]',
    seats: ' 5 places left',
    price: '399 kr',
  },
  {
    date: '2024-06-18 Tuesday',
    time: '17:00 - 20:15',
    title: 'Risk 1 [Swedish]',
    seats: ' 5 places left',
    price: '399 kr',
  },
  {
    date: '2024-06-08 Saturday',
    time: '10:00 - 13:30',
    title: 'Risk 1 [Swedish/Arabic]',
    seats: '5 places left',
    price: '399 kr',
  },
  {
    date: '2024-06-09 Sunday',
    time: '10:00 - 13:15',
    title: 'Risk 1 [English]',
    seats: '5 places left',
    price: '399 kr',
  },
];

export default function page() {
  const [handledarkursOpen, setHandledarkursOpen] = useState(false);
  const [popupData, setPopupData] = useState<HandledarkursItem>(
    riskOneSlots[0]
  );
  
  const handleSubmit = (data: HandledarkursItem) => {
    setHandledarkursOpen(true);
    setPopupData(data);
  };
  return (
    <>
      <div className="bg-[#F7FAFF] py-[56px] md:py-[120px] px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <h1 className="text-24 sm:text-56 font-bold  text-[#1D1F2C] leading-[140%] text-center pb-5">
            Riskettan Schedule and Prices
          </h1>
          <div className="w-full sm:w-[872px] mx-auto pb-10">
            <p className=" text-16 leading-[140%] text-center font-normal text-[#4A4C56]">
              Riskettan (Risk 1) training covers crucial aspects of road safety
              and traffic behavior, essential for obtaining your Swedish driving
              license. We offer flexible online schedules to fit your busy life,
              and competitive prices to ensure you get the best value. Enroll
              now and start your journey towards a safer driving experience.
            </p>
          </div>
          {/* desktop version */}
          <div className=" w-full">
            {riskOneSlots.map((item, index) => {
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
            {riskOneSlots.map((item, index) => {
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
            Risk1 Course at ABS Traffic School Södertälje 🚧🚦
          </h1>
          <p className="text-20 sm:text-30 font-[500]  text-[#1D1F2C] leading-[100%]  pb-3">
            Prepare for the challenges of the road with our Risk1 course!
          </p>
          <p className="text-16 font-[400]  text-[#000000] leading-[140%] tracking-[0.5%]   w-11/12 pb-10">
            At ABS Trafikskola Södertälje, we offer a Risk1 course which is an
            important step in your driving education. This course is compulsory
            for anyone taking a car driving license and focuses on increasing
            awareness of risks in traffic.
          </p>
          <div className="flex justify-between items-center pb-12 flex-col-reverse md:flex-row">
            <div className="w-full md:w-[633px]">
              <h3 className="text-20 sm:text-32 font-medium  my-4">
                Why Risk1?
              </h3>
              <div className="flex space-x-4 items-start mb-4">
                <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12 mt-2">
                  <FaCheck />
                </div>
                <div className=" w-11/12 space-y-1">
                  <h3 className="text-16 font-bold sm:text-18 text-[#1D1F2C] tracking-[0.5%] leading-[140%] sm:font-semibold ">
                    Increased Safety
                  </h3>
                  <p className="text-16 font-normal leading-[140%] tracking-[0.5%] text-black">
                    Learn to manage and understand risks on the road.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4 items-start mb-2">
                <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12 mt-2">
                  <FaCheck />
                </div>
                <div className=" w-11/12 space-y-1">
                  <h3 className=" text-18 text-[#1D1F2C] tracking-[0.5%] leading-[140%] font-semibold ">
                    Important Knowledge
                  </h3>
                  <p className="text-16 font-normal leading-[140%] tracking-[0.5%] text-black">
                    The course covers important topics such as alcohol, drugs,
                    fatigue and how these affect driving.
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

          <h2 className="text-20 sm:text-32 font-medium mb-3 md:mb-6 text-[#1D1F2C]">
            Course Content
          </h2>
          <ul className="space-y-2 text-16 md:text-18 font-medium text-[#4A4C56] mb-8">
            <li className="flex items-center ">
              <span className="mt-1 mr-2 w-2 h-2 rounded-full bg-[#08316A]" />
              <span>Interactive and engaging training on road safety.</span>
            </li>
            <li className="flex items-center">
              <span className="mt-1 mr-2 w-2 h-2 rounded-full bg-[#08316A]" />
              <span>Discussions and practical exercises.</span>
            </li>
          </ul>

          <div className="space-y-4 ">
            <div>
              <strong className="block text-[#000000] mb-1 text-16 md:text-18 font-bold leading-[26px]">
                Course Length and Certification:
              </strong>
              <p className=" text-[#4A4C56] leading-[140%] text-16 font-normal tracking-[0.5%]">
                Risk training part 1 is approximately 3 hours long theoretical
                training, excluding breaks. After completing the course, we
                report directly to the Swedish Transport Agency online within 24
                hours. Please note that no paper certificate is given to
                participants after the course.
              </p>
            </div>

            <div>
              <p className=" text-[#4A4C56] leading-[140%] text-16 font-normal tracking-[0.5%]">
                For More Information: Visit The Swedish Transport Agency's
                websitefor further information on the content and requirements
                of the Risk1 course.
              </p>
            </div>

            <p className=" text-[#4A4C56] leading-[140%] text-16 font-normal tracking-[0.5%]">
              Get ready for a safer driving experience with our Risk1 course at
              ABS Trafikskola Södertälje.
            </p>
          </div>
        </div>
      </div>
      <Contact />
      <Handledarkurs
        open={handledarkursOpen}
        onOpenChange={setHandledarkursOpen}
        data={popupData}
      />
    </>
  );
}
