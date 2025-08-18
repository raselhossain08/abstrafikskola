'use client';
import Contact from '@/components/common/Contact';
import { ProductDialog } from '@/components/dialog/ProductDialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaRegClock } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import { SlLike } from 'react-icons/sl';
import { scheduleAPI, risk1Risk2API, type Schedule } from '@/lib/api';
import { risk1Risk2ContentService, type Risk1Risk2ContentData } from '@/services/risk1Risk2ContentService';

type Risk1Risk2Item = {
  _id?: string;
  scheduleId?: string;
  date: string;
  time: string;
  title: string;
  seats: string;
  price: string;
  maxStudents?: number;
  currentBookings?: number;
  startTime?: string;
  endTime?: string;
  venue?: string;
  instructor?: string;
  status?: boolean;
  course?: {
    title: string;
    category: string;
    language: string;
  };
};

export default function page() {
  const [handledarkursOpen, setHandledarkursOpen] = useState(false);
  const [popupData, setPopupData] = useState<Risk1Risk2Item | null>(null);
  const [courseSlots, setCourseSlots] = useState<Risk1Risk2Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageContent, setPageContent] = useState<Risk1Risk2ContentData | null>(null);
  const [contentLoading, setContentLoading] = useState(true);

  useEffect(() => {
    fetchRiskCourses();
    fetchPageContent();
  }, []);

  const fetchPageContent = async () => {
    try {
      setContentLoading(true);
      const content = await risk1Risk2ContentService.getRisk1Risk2Content();
      setPageContent(content);
    } catch (error) {
      console.error('Failed to fetch page content:', error);
    } finally {
      setContentLoading(false);
    }
  };

  const fetchRiskCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use the new Risk1Risk2 API service
      const response = await risk1Risk2API.getCombinedCourses();

      if (response.success && response.data && response.data.length > 0) {
        // Transform data for display
        const transformedCourses = response.data.map((schedule: any) => {
          const scheduleDate = new Date(schedule.date);
          const formattedDate = scheduleDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });

          return {
            _id: schedule._id,
            scheduleId: schedule.scheduleId,
            date: formattedDate,
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
              category: schedule.courseType === 'risk1' ? 'Riskettan' : 'Halkbana',
              language: 'Svenska',
            },
          };
        });

        setCourseSlots(transformedCourses);
      } else {
        // Fallback: try individual API calls if combined service fails
        console.log('Combined API failed, trying individual calls...');
        
        const risk1Response = await scheduleAPI.getByTitle('Riskettan');
        let allCourses: Risk1Risk2Item[] = [];

        if (risk1Response.success && risk1Response.data) {
          const risk1Courses = risk1Response.data.map((schedule: Schedule) => {
            const scheduleDate = new Date(schedule.date);
            const formattedDate = scheduleDate.toLocaleDateString('en-US', {
              weekday: 'long', 
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            });

            return {
              _id: schedule._id,
              scheduleId: schedule.scheduleId,
              date: formattedDate,
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
                category: 'Riskettan',
                language: 'Svenska',
              },
            };
          });

          allCourses = [...allCourses, ...risk1Courses];
        }

        setCourseSlots(allCourses);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses');
      setCourseSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (data: Risk1Risk2Item) => {
    setHandledarkursOpen(true);
    setPopupData(data);
    console.log(data);
  };
  return (
    <>
      <div className="bg-[#F7FAFF] py-[56px] md:py-[120px] px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <h1 className="text-24 sm:text-56 font-bold  text-[#1D1F2C] leading-[140%] text-center pb-5">
            {contentLoading ? 'Risk1 + Risk2 Schedule and Prices' : pageContent?.sectionTitle}
          </h1>
          <div className="w-full sm:w-[872px] mx-auto pb-10">
            <p className=" text-16 leading-[140%] text-center font-normal text-[#4A4C56]">
              {contentLoading 
                ? 'Complete your risk education with our Risk1 and Risk2 courses. These mandatory courses cover essential traffic safety knowledge for all new drivers. Check out our upcoming schedule and prices, and book your sessions online.'
                : pageContent?.sectionDescription
              }
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

          {/* Error State */}
          {error && (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <h3 className="text-24 font-bold text-red-600 mb-2">
                  Error Loading Courses
                </h3>
                <p className="text-[#4A4C56] text-16 mb-4">{error}</p>
                <Button
                  onClick={fetchRiskCourses}
                  className="border border-[#3F8FEE] rounded-[30px] h-[48px] bg-[#3F8FEE] text-white hover:bg-[#3F8FEE]"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {/* No Courses Available */}
          {!loading && !error && courseSlots.length === 0 && (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <h3 className="text-24 font-bold text-[#1D1F2C] mb-2">
                  No Risk Courses Available
                </h3>
                <p className="text-[#4A4C56] text-16 mb-4">
                  Currently, there are no Risk1 or Risk2 courses scheduled.
                </p>
                <Button
                  onClick={fetchRiskCourses}
                  className="border border-[#3F8FEE] rounded-[30px] h-[48px] bg-[#3F8FEE] text-white hover:bg-[#3F8FEE]"
                >
                  Refresh
                </Button>
              </div>
            </div>
          )}

          {/* desktop version */}
          {!loading && !error && courseSlots.length > 0 && (
            <div className=" w-full">
              {courseSlots.map((item, index) => {
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
          )}

          {/* mobile version */}
          {!loading && !error && courseSlots.length > 0 && (
            <div className=" w-full">
              {courseSlots.map((item, index) => {
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
          )}
        </div>
      </div>
      <div className=" bg-white py-[56px] xl:py-[120px] px-4 ">
        <div className="w-full xl:w-[1320px] mx-auto">
          <h1 className="text-[24px] sm:text-35 font-[600]  text-[#1D1F2C]  pb-5 tracking-[0.5%]">
            Risk1 + Risk2 Courses at ABS Trafikskola Södertälje 🚗🚦
          </h1>
          <p className="text-20 sm:text-30 font-[500]  text-[#1D1F2C] leading-[100%]  pb-3">
            Complete your risk education with our comprehensive courses! 🌟
          </p>
          <p className="text-16 font-[400]  text-[#000000] leading-[140%] tracking-[0.5%]   w-11/12 pb-10">
            At ABS Trafikskola Södertälje, we offer both Risk1 and Risk2 courses
            that are mandatory requirements for obtaining your Swedish driving
            license. These courses provide essential knowledge about road safety
            and traffic behavior.
          </p>
          <div className="flex justify-between items-center pb-12 flex-col-reverse md:flex-row">
            <div className="w-full md:w-[633px]">
              <h3 className="text-20 sm:text-32 font-medium  my-4">
                {pageContent?.whyImportant?.title || 'Why are Risk1 + Risk2 Important?'}
              </h3>
              {pageContent?.whyImportant?.sections?.map((section, index) => (
                <div key={index} className="flex space-x-4 items-start mb-4">
                  <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12 mt-2">
                    <FaCheck />
                  </div>
                  <div className=" w-11/12 space-y-1">
                    <h3 className="text-16 font-bold sm:text-18 text-[#1D1F2C] tracking-[0.5%] leading-[140%] sm:font-semibold ">
                      {section.title}
                    </h3>
                    <p className="text-16 font-normal leading-[140%] tracking-[0.5%] text-black">
                      {section.description}
                    </p>
                  </div>
                </div>
              )) || (
                <div className="flex space-x-4 items-start mb-4">
                  <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12 mt-2">
                    <FaCheck />
                  </div>
                  <div className=" w-11/12 space-y-1">
                    <h3 className="text-16 font-bold sm:text-18 text-[#1D1F2C] tracking-[0.5%] leading-[140%] sm:font-semibold ">
                      Risk1 Course
                    </h3>
                    <p className="text-16 font-normal leading-[140%] tracking-[0.5%] text-black">
                      Covers alcohol, drugs, fatigue and how these affect driving
                      ability. Essential foundation for understanding traffic
                      risks.
                    </p>
                  </div>
                </div>
              )}

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
                {pageContent?.courseOffers?.title || 'What Our Course Offers:'}
              </h3>
              {pageContent?.courseOffers?.features?.map((feature, index) => (
                <div key={index} className="flex space-x-4 items-start mb-4">
                  <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12 mt-2">
                    <FaCheck />
                  </div>
                  <div className=" w-11/12 space-y-1">
                    <h3 className=" text-18 text-[#1D1F2C] tracking-[0.5%] leading-[140%] font-semibold ">
                      {feature.title}
                    </h3>
                    <p className="text-16 font-normal leading-[140%] tracking-[0.5%] text-black">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )) || (
                <>
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
                </>
              )}
            </div>
          </div>

          <h2 className="text-20 sm:text-32 font-medium mb-3 md:mb-6 text-[#1D1F2C]">
            {pageContent?.courseContent?.title || 'Course Content'}
          </h2>
          <ul className="space-y-2 text-16 md:text-18 font-bold text-[#4A4C56] mb-8">
            {pageContent?.courseContent?.items?.map((item, index) => (
              <li key={index} className="flex items-center ">
                <span className="mt-1 mr-2 w-2 h-2 rounded-full bg-[#08316A]" />
                <span>{item.title}</span>
              </li>
            )) || (
              <>
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
              </>
            )}
          </ul>

          <div className="space-y-4 ">
            {pageContent?.additionalInfo?.map((section, index) => (
              <div key={index}>
                <strong className="block text-[#000000] mb-1 text-16 md:text-18 font-bold leading-[26px]">
                  {section.title}
                </strong>
                <p className=" text-[#4A4C56] leading-[140%] text-16 font-normal tracking-[0.5%]">
                  {section.description}
                </p>
              </div>
            )) || (
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
            )}

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
