'use client';
import Contact from '@/components/common/Contact';
import { ProductDialog } from '@/components/dialog/ProductDialog';
import { Button } from '@/components/ui/button';
import { scheduleAPI, type Schedule } from '@/lib/api';
import { handledarkursContentService, HandledarkursContent } from '@/services/handledarkursContentService';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa6';
type HandledarkursItem = {
  scheduleId: string;
  date: string;
  time: string;
  title: string;
  seats: string;
  price: string;
  maxStudents: number;
  currentBookings: number;
  startTime: string;
  endTime: string;
  venue?: string;
  instructor?: string;
  status: boolean;
  course?: {
    title: string;
    category: string;
    language: string;
  };
};

export default function page() {
  const [handledarkursOpen, setHandledarkursOpen] = useState(false);
  const [popupData, setPopupData] = useState<HandledarkursItem | null>(null);
  const [courseSlots, setCourseSlots] = useState<HandledarkursItem[]>([]);
  const [loading, setLoading] = useState(true);

  // State for handledarkurs content
  const [handledarkursContent, setHandledarkursContent] = useState<HandledarkursContent | null>(null);
  const [contentLoading, setContentLoading] = useState(true);
  const [contentError, setContentError] = useState<string | null>(null);

  // Fetch handledarkurs content from API
  useEffect(() => {
    const fetchHandledarkursContent = async () => {
      try {
        setContentLoading(true);
        setContentError(null);
        
        const content = await handledarkursContentService.getHandledarkursContent();
        
        if (content) {
          setHandledarkursContent(content);
        } else {
          setContentError('Failed to load content');
        }
      } catch (err) {
        console.error('Error fetching handledarkurs content:', err);
        setContentError('Failed to load content');
      } finally {
        setContentLoading(false);
      }
    };

    fetchHandledarkursContent();
  }, []);

  useEffect(() => {
    fetchHandledarkursCourses();
  }, []);

  const fetchHandledarkursCourses = async () => {
    try {
      setLoading(true);

      // Use the API utility to get schedules by course title
      const response = await scheduleAPI.getByTitle('Handledarkurs');

      if (response.success && response.data && response.data.length > 0) {
        // Transform the schedule data to match our component interface
        const transformedCourses = response.data.map((schedule: Schedule) => {
          return {
            scheduleId: schedule.scheduleId,
            date: formatScheduleDate(schedule.date),
            time: `${schedule.startTime} - ${schedule.endTime}`,
            title: schedule.title,
            seats: `${schedule.availableSlots} seats available`,
            price: `${schedule.price} kr`,
            maxStudents: schedule.maxStudents,
            currentBookings: schedule.currentBookings,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            venue: schedule.venue,
            instructor: schedule.instructor,
            status: schedule.isAvailable,
            course: {
              title: schedule.title,
              category: 'Handledarkurs',
              language: 'Svenska',
            },
          };
        });

        setCourseSlots(transformedCourses);
      } else {
        setCourseSlots([]);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setCourseSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const formatScheduleDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleSubmit = (data: HandledarkursItem) => {
    setHandledarkursOpen(true);
    setPopupData(data);
    console.log(data);
  };

  // Translation helper function (defaulting to English)
  const t = (content: any) => {
    if (typeof content === 'object' && content.en) {
      return content.en;
    }
    return content;
  };

  // Show loading state
  if (contentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg">Loading...</span>
      </div>
    );
  }

  // Show error state
  if (contentError || !handledarkursContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading content</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#F7FAFF] py-[56px] md:py-[120px] px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <h1 className="text-24 sm:text-56 font-bold  text-[#1D1F2C] leading-[140%] text-center pb-5">
            {t(handledarkursContent.hero.title)}
          </h1>
          <div className="w-full sm:w-[872px] mx-auto pb-10">
            <p className=" text-16 leading-[140%] text-center font-normal text-[#4A4C56]">
              {t(handledarkursContent.hero.description)}
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3F8FEE] mx-auto mb-3"></div>
                <p className="text-[#4A4C56] font-medium text-16">
                  Loading courses...
                </p>
              </div>
            </div>
          )}

          {/* No Courses Available */}
          {!loading && courseSlots.length === 0 && (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <h3 className="text-24 font-bold text-[#1D1F2C] mb-2">
                  No Courses Available
                </h3>
                <p className="text-[#4A4C56] text-16 mb-4">
                  Currently, there are no Handledarkurs courses scheduled.
                </p>
                <Button
                  onClick={fetchHandledarkursCourses}
                  className="border border-[#3F8FEE] rounded-[30px] h-[48px] bg-[#3F8FEE] text-white hover:bg-[#3F8FEE]"
                >
                  Refresh
                </Button>
              </div>
            </div>
          )}

          {/* desktop version */}
          {!loading && courseSlots.length > 0 && (
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
          )}

          {/* mobile version */}
          {!loading && courseSlots.length > 0 && (
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
          )}
        </div>
      </div>
      <div className=" bg-white py-[56px] xl:py-[120px] px-4 ">
        <div className="w-full xl:w-[1320px] mx-auto">
          <h1 className="text-[24px] sm:text-35 font-[600]  text-[#1D1F2C]  pb-5 tracking-[0.5%]">
            {t(handledarkursContent.course.welcomeTitle)}
          </h1>
          <p className="text-20 sm:text-30 font-[500]  text-[#1D1F2C] leading-[100%]  pb-3">
            {t(handledarkursContent.course.subtitle)}
          </p>
          <p className="text-16 font-[400]  text-[#000000] leading-[140%] tracking-[0.5%]   w-11/12 pb-10">
            {t(handledarkursContent.course.description)}
          </p>
          <div className="flex justify-between items-center pb-12 flex-col-reverse md:flex-row">
            <div className="w-full md:w-[633px]">
              <h3 className="text-20 sm:text-32 font-medium  my-4">
                {t(handledarkursContent.course.whyImportantTitle)}
              </h3>
              {handledarkursContent.course.benefits.map((benefit, index) => (
                <div key={index} className="flex space-x-4 items-start mb-4">
                  <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12 mt-2">
                    <FaCheck />
                  </div>
                  <div className=" w-11/12 space-y-1">
                    <h3 className="text-16 font-bold sm:text-18 text-[#1D1F2C] tracking-[0.5%] leading-[140%] sm:font-semibold ">
                      {t(benefit.title)}
                    </h3>
                    <p className="text-16 font-normal leading-[140%] tracking-[0.5%] text-black">
                      {t(benefit.description)}
                    </p>
                  </div>
                </div>
              ))}

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
                  {handledarkursContent.course.images.slice(0, 2).map((image, index) => (
                    <Image
                      key={index}
                      src={image.src}
                      width={image.width}
                      height={image.height}
                      alt={image.alt}
                      className="w-[300px] h-[190px] rounded-[22px] object-cover"
                    />
                  ))}
                </div>
                <div className="">
                  {handledarkursContent.course.images.slice(2, 3).map((image, index) => (
                    <Image
                      key={index + 2}
                      src={image.src}
                      width={image.width}
                      height={image.height}
                      alt={image.alt}
                      className="w-[300px] h-[407px] rounded-[22px] object-cover"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pb-12  flex-col md:flex-row">
            <div className="w-full md:w-[633px]">
              <div className="flex w-full justify-between gap-8 md:gap-0">
                <div className="">
                  {handledarkursContent.course.images.slice(3, 4).map((image, index) => (
                    <Image
                      key={index + 3}
                      src={image.src}
                      width={image.width}
                      height={image.height}
                      alt={image.alt}
                      className="w-[300px] h-[407px] rounded-[22px] object-cover"
                    />
                  ))}
                </div>
                <div className=" flex flex-col justify-between">
                  {handledarkursContent.course.images.slice(0, 2).map((image, index) => (
                    <Image
                      key={index}
                      src={image.src}
                      width={image.width}
                      height={image.height}
                      alt={image.alt}
                      className="w-[300px] h-[190px] rounded-[22px] object-cover"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full md:w-[633px]">
              <h3 className=" text-32 font-medium  my-4">
                {t(handledarkursContent.course.whatOffersTitle)}
              </h3>
              {handledarkursContent.course.features.map((feature, index) => (
                <div key={index} className="flex space-x-4 items-start mb-4">
                  <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12 mt-2">
                    <FaCheck />
                  </div>
                  <div className=" w-11/12 space-y-1">
                    <h3 className=" text-18 text-[#1D1F2C] tracking-[0.5%] leading-[140%] font-semibold ">
                      {t(feature.title)}
                    </h3>
                    <p className="text-16 font-normal leading-[140%] tracking-[0.5%] text-black">
                      {t(feature.description)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-20 sm:text-32 font-medium mb-3 md:mb-6 text-[#1D1F2C]">
            {t(handledarkursContent.course.courseContent.title)}
          </h2>
          <ul className="space-y-2 text-16 md:text-18 font-bold text-[#4A4C56] mb-8">
            {handledarkursContent.course.courseContent.items.map((item, index) => (
              <li key={index} className="flex items-center ">
                <span className="mt-1 mr-2 w-2 h-2 rounded-full bg-[#08316A]" />
                <span>{t(item)}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-4 ">
            <div>
              <strong className="block text-[#000000] mb-1 text-16 md:text-18 font-bold leading-[26px]">
                Who Should Participate?
              </strong>
              <p className=" text-[#4A4C56] leading-[140%] text-16 font-normal tracking-[0.5%]">
                {t(handledarkursContent.course.additionalInfo[0])}
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
      {popupData && (
        <ProductDialog
          open={handledarkursOpen}
          onOpenChange={setHandledarkursOpen}
          data={popupData}
        />
      )}
    </>
  );
}
