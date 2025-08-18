'use client';
import Contact from '@/components/common/Contact';
import { ProductDialog } from '@/components/dialog/ProductDialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaRegClock } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import { SlLike } from 'react-icons/sl';
import { scheduleAPI, type Schedule } from '@/lib/api';
// Removed API import - using static data instead
type ProductItem = {
  _id?: string;
  scheduleId?: string;
  date: string;
  time: string;
  title: string;
  seats: string;
  price: string;
};

export default function RiskettanPage() {
  const [handledarkursOpen, setHandledarkursOpen] = useState(false);
  const [popupData, setPopupData] = useState<ProductItem | null>(null);

  // State for API integration
  const [riskOneSlots, setRiskOneSlots] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Static data for page content
  const pageContent = {
    pageContent: {
      title: "Riskettan Schedule and Prices",
      description: "Riskettan (Risk 1) training covers crucial aspects of road safety and traffic behavior, essential for obtaining your Swedish driving license. We offer flexible online schedules to fit your busy life, and competitive prices to ensure you get the best value. Enroll now and start your journey towards a safer driving experience.",
      mainTitle: "Risk1 Course at ABS Traffic School Södertälje 🚧🚦",
      subtitle: "Prepare for the challenges of the road with our Risk1 course!",
      introText: "At ABS Trafikskola Södertälje, we offer a Risk1 course which is an important step in your driving education. This course is compulsory for anyone taking a car driving license and focuses on increasing awareness of risks in traffic."
    },
    whyRisk1: {
      title: "Why Risk1?",
      benefits: [
        {
          title: "Increased Safety",
          description: "Learn to manage and understand risks on the road."
        },
        {
          title: "Important Knowledge", 
          description: "The course covers important topics such as alcohol, drugs, fatigue and how these affect driving."
        }
      ]
    },
    courseContent: {
      title: "Course Content",
      items: [
        { title: "Interactive and engaging training on road safety." },
        { title: "Discussions and practical exercises." }
      ]
    },
    additionalInfo: [
      {
        title: "Course Length and Certification:",
        description: "Risk training part 1 is approximately 3 hours long theoretical training, excluding breaks. After completing the course, we report directly to the Swedish Transport Agency online within 24 hours. Please note that no paper certificate is given to participants after the course."
      },
      {
        title: "For More Information:",
        description: "Visit The Swedish Transport Agency's website for further information on the content and requirements of the Risk1 course."
      },
      {
        title: "Get Ready:",
        description: "Get ready for a safer driving experience with our Risk1 course at ABS Trafikskola Södertälje."
      }
    ]
  };

  // Fetch course schedules from API
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        setError(null);

        // Page content is now static - no need to fetch

        // Search for "Riskettan" schedules
        const response = await scheduleAPI.getByTitle('Riskettan');

        if (response.success && response.data) {
          // Transform API data to match component format
          const transformedSlots: ProductItem[] = response.data.map(
            (schedule: Schedule) => {
              // Format date with day name
              const scheduleDate = new Date(schedule.date);
              const formattedDate = scheduleDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              });

              // Format time range
              const timeRange = `${schedule.startTime} - ${schedule.endTime}`;

              // Calculate available seats
              const availableSeats =
                schedule.availableSlots ||
                schedule.maxStudents - schedule.currentBookings;
              const seatsText =
                availableSeats > 0
                  ? `${availableSeats} places left`
                  : 'Fully booked';

              return {
                _id: schedule._id,
                scheduleId: schedule.scheduleId,
                date: formattedDate,
                time: timeRange,
                title: schedule.title,
                seats: seatsText,
                price: `${schedule.price} kr`,
              };
            }
          );

          setRiskOneSlots(transformedSlots);
        } else {
          // No data found from API
          setRiskOneSlots([]);
          console.log('No Riskettan courses found in database');
        }
      } catch (err) {
        console.error('Error fetching schedules:', err);
        setError('No courses at the moment');
        // Set empty array instead of fallback data
        setRiskOneSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const handleSubmit = (data: ProductItem) => {
    setHandledarkursOpen(true);
    setPopupData(data);
  };
  return (
    <>
      <div className="bg-[#F7FAFF] py-[56px] md:py-[120px] px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <h1 className="text-24 sm:text-56 font-bold  text-[#1D1F2C] leading-[140%] text-center pb-5">
            {pageContent.pageContent.title}
          </h1>
          <div className="w-full sm:w-[872px] mx-auto pb-10">
            <p className=" text-16 leading-[140%] text-center font-normal text-[#4A4C56]">
              {pageContent.pageContent.description}
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-lg text-gray-600">
                Loading schedules...
              </span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="px-6 py-2"
              >
                Try Again
              </Button>
            </div>
          ) : riskOneSlots.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Riskettan Courses Available
              </h3>
              <p className="text-gray-600 mb-4">
                There are currently no Riskettan courses scheduled. Please check
                back later or contact us for more information.
              </p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="px-6 py-2"
              >
                Refresh
              </Button>
            </div>
          ) : (
            <>
              {/* desktop version */}
              <div className=" w-full">
                {riskOneSlots.map((item, index) => {
                  return (
                    <div
                      className="hidden xl:flex items-center justify-between bg-[0px 4px 35px 0px #0000000A] bg-white border border-[#FFFFFF] py-[9px] px-[24px] rounded-[8px] mb-8"
                      style={{ boxShadow: ' 0px 4px 35px 0px #0000001A' }}
                      key={item._id || index}
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
                      key={item._id || index}
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
            </>
          )}
        </div>
      </div>
      <div className=" bg-white py-[56px] xl:py-[120px] px-4 ">
        <div className="w-full xl:w-[1320px] mx-auto">
          <h1 className="text-[24px] sm:text-35 font-[600]  text-[#1D1F2C]  pb-5 tracking-[0.5%]">
            {pageContent.pageContent.mainTitle}
          </h1>
          <p className="text-20 sm:text-30 font-[500]  text-[#1D1F2C] leading-[100%]  pb-3">
            {pageContent.pageContent.subtitle}
          </p>
          <p className="text-16 font-[400]  text-[#000000] leading-[140%] tracking-[0.5%]   w-11/12 pb-10">
            {pageContent.pageContent.introText}
          </p>
          <div className="flex justify-between items-center pb-12 flex-col-reverse md:flex-row">
            <div className="w-full md:w-[633px]">
              <h3 className="text-20 sm:text-32 font-medium  my-4">
                {pageContent.whyRisk1.title}
              </h3>
              {pageContent.whyRisk1.benefits.map((benefit, index) => (
                <div key={index} className="flex space-x-4 items-start mb-4">
                  <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12 mt-2">
                    <FaCheck />
                  </div>
                  <div className=" w-11/12 space-y-1">
                    <h3 className="text-16 font-bold sm:text-18 text-[#1D1F2C] tracking-[0.5%] leading-[140%] sm:font-semibold ">
                      {benefit.title}
                    </h3>
                    <p className="text-16 font-normal leading-[140%] tracking-[0.5%] text-black">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
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
            {pageContent.courseContent.title}
          </h2>
          <ul className="space-y-2 text-16 md:text-18 font-medium text-[#4A4C56] mb-8">
            {pageContent.courseContent.items.map((item, index) => (
              <li key={index} className="flex items-center ">
                <span className="mt-1 mr-2 w-2 h-2 rounded-full bg-[#08316A]" />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-4 ">
            {pageContent.additionalInfo.map((info, index) => (
              <div key={index}>
                <strong className="block text-[#000000] mb-1 text-16 md:text-18 font-bold leading-[26px]">
                  {info.title}
                </strong>
                <p className=" text-[#4A4C56] leading-[140%] text-16 font-normal tracking-[0.5%]">
                  {info.description}
                </p>
              </div>
            ))}
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
