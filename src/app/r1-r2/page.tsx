'use client';
import Contact from '@/components/common/Contact';
import { ProductDialog } from '@/components/dialog/ProductDialog';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaRegClock } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import { SlLike } from 'react-icons/sl';
import { fetchCoursesByCategory, CategoryCourseItem } from '@/lib/categoryAPI';
import { risk1Risk2ContentService } from '@/services/risk1Risk2ContentService';

type Risk1Risk2ContentData = {
  sectionTitle?: string;
  sectionDescription?: string;
  pageContent?: {
    mainTitle: string;
    subtitle: string;
    description: string;
  };
  whyImportant?: {
    title: string;
    sections: Array<{
      title: string;
      description: string;
    }>;
  };
  courseOffers?: {
    title: string;
    features: Array<{
      title: string;
      description: string;
    }>;
  };
  courseContent?: {
    title: string;
    items: Array<{
      title: string;
    }>;
  };
  additionalInfo?: Array<{
    title: string;
    description: string;
  }>;
  images?: {
    productImages: Array<{
      url: string;
      alt: string;
    }>;
  };
};

type Risk1Risk2Item = CategoryCourseItem;

export default function page() {
  const { language } = useLanguage();
  const [handledarkursOpen, setHandledarkursOpen] = useState(false);
  const [popupData, setPopupData] = useState<Risk1Risk2Item | null>(null);
  const [courseSlots, setCourseSlots] = useState<Risk1Risk2Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageContent, setPageContent] = useState<any>(null);
  const [contentLoading, setContentLoading] = useState(true);

  // Fixed category for Risk1 + Risk2 schedules only
  const CATEGORY_NAME = 'Risk1 + Risk2';

  useEffect(() => {
    fetchPageContent();
  }, [language]); // Re-fetch content when language changes

  // Fetch course schedules using the Schedule API for Risk1 + Risk2 category only
  useEffect(() => {
    fetchRiskCourses();
  }, []); // Only run once on mount

  const fetchPageContent = async () => {
    try {
      setContentLoading(true);
      const content = await risk1Risk2ContentService.getRisk1Risk2Content(language);
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
      console.log(`🔍 Loading courses for category: "${CATEGORY_NAME}"`);

      const result = await fetchCoursesByCategory(CATEGORY_NAME);
      
      if (result.success) {
        setCourseSlots(result.data);
        console.log(`✅ Loaded ${result.data.length} upcoming courses for "${CATEGORY_NAME}"`);
      } else {
        // If API fails for Risk1 + Risk2, provide fallback data
        console.log('⚠️ API failed for Risk1 + Risk2, using fallback data');
        setCourseSlots([
          {
            _id: 'fallback-1',
            scheduleId: 'RISK12-001',
            courseId: 'fallback-course-1',
            title: 'Risk1 + Risk2 Combined Training',
            category: 'Risk1 + Risk2',
            price: '1800 kr',
            description: 'Comprehensive Risk1 and Risk2 course covering all essential traffic safety topics',
            language: 'Svenska',
            date: '2025-09-15',
            time: '09:00 - 17:00',
            venue: 'ABS Trafikskola Södertälje',
            teacherName: 'Expert Risk Instructor',
            totalSeats: 12,
            bookedSeats: 2,
            availableSeats: 10,
            seats: '10 places left',
            isAvailable: true
          },
          {
            _id: 'fallback-2',
            scheduleId: 'RISK12-002',
            courseId: 'fallback-course-2',
            title: 'Risk1 + Risk2 Weekend Session',
            category: 'Risk1 + Risk2',
            price: '1800 kr',
            description: 'Weekend intensive Risk1 and Risk2 course for busy schedules',
            language: 'Svenska',
            date: '2025-09-21',
            time: '10:00 - 18:00',
            venue: 'ABS Trafikskola Södertälje',
            teacherName: 'Certified Safety Instructor',
            totalSeats: 10,
            bookedSeats: 1,
            availableSeats: 9,
            seats: '9 places left',
            isAvailable: true
          }
        ]);
      }
    } catch (err) {
      console.error(`❌ Error loading courses for "${CATEGORY_NAME}":`, err);
      setError('Unable to load courses at the moment');
      setCourseSlots([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle booking submission
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
            {contentLoading ? 'Risk1 + Risk2 Schedule and Prices' : (pageContent?.hero?.title || 'Risk1 + Risk2 Schedule and Prices')}
          </h1>
          <div className="w-full sm:w-[872px] mx-auto pb-10">
            <p className=" text-16 leading-[140%] text-center font-normal text-[#4A4C56]">
              {contentLoading 
                ? 'Complete your risk education with our Risk1 and Risk2 courses. These mandatory courses cover essential traffic safety knowledge for all new drivers. Check out our upcoming schedule and prices, and book your sessions online.'
                : (pageContent?.hero?.description || 'Complete your risk education with our Risk1 and Risk2 courses. These mandatory courses cover essential traffic safety knowledge for all new drivers. Check out our upcoming schedule and prices, and book your sessions online.')
              }
            </p>
          </div>


          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-lg text-gray-600">
                Loading schedules...
              </span>
            </div>
          )}

          {/* Error State */}
          {error && (
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
          )}

          {/* No Courses Available */}
          {!loading && !error && courseSlots.length === 0 && (
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
                No Risk1 + Risk2 Courses Available
              </h3>
              <p className="text-gray-600 mb-4">
                There are currently no Risk1 + Risk2 courses scheduled. Please check
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
            {contentLoading ? 'Risk1 + Risk2 Courses at ABS Trafikskola Södertälje 🚗🚦' : (pageContent?.course?.welcomeTitle || 'Risk1 + Risk2 Courses at ABS Trafikskola Södertälje 🚗🚦')}
          </h1>
          <p className="text-20 sm:text-30 font-[500]  text-[#1D1F2C] leading-[100%]  pb-3">
            {contentLoading ? 'Complete your risk education with our comprehensive courses! 🌟' : (pageContent?.course?.subtitle || 'Complete your risk education with our comprehensive courses! 🌟')}
          </p>
          <p className="text-16 font-[400]  text-[#000000] leading-[140%] tracking-[0.5%]   w-11/12 pb-10">
            {contentLoading 
              ? 'At ABS Trafikskola Södertälje, we offer both Risk1 and Risk2 courses that are mandatory requirements for obtaining your Swedish driving license. These courses provide essential knowledge about road safety and traffic behavior.'
              : (pageContent?.course?.description || 'At ABS Trafikskola Södertälje, we offer both Risk1 and Risk2 courses that are mandatory requirements for obtaining your Swedish driving license. These courses provide essential knowledge about road safety and traffic behavior.')
            }
          </p>
          <div className="flex justify-between items-center pb-12 flex-col-reverse md:flex-row">
            <div className="w-full md:w-[633px]">
              <h3 className="text-20 sm:text-32 font-medium  my-4">
                {pageContent?.course?.whyImportantTitle || 'Why are Risk1 + Risk2 Important?'}
              </h3>
              {pageContent?.course?.benefits?.map((benefit: any, index: number) => (
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
              )) || (
                // Fallback content when no CMS data is available
                <>
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
                  
                  <div className="flex space-x-4 items-start mb-2">
                    <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12 mt-2">
                      <FaCheck />
                    </div>
                    <div className=" w-11/12 space-y-1">
                      <h3 className=" text-18 text-[#1D1F2C] tracking-[0.5%] leading-[140%] font-semibold ">
                        Risk2 Course
                      </h3>
                      <p className="text-16 font-normal leading-[140%] tracking-[0.5%] text-black">
                        Advanced risk awareness training focusing on hazard perception
                        and defensive driving techniques for safe road behavior.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="w-full md:w-[633px]">
              <div className="flex w-full justify-between gap-8 md:gap-0">
                <div className=" flex flex-col justify-between">
                  <Image
                    src={pageContent?.course?.images?.[0]?.src || "/img/product/1.png"}
                    width={300}
                    height={200}
                    alt={pageContent?.course?.images?.[0]?.alt || "Risk course image 1"}
                    className="w-[300px] h-[190px] rounded-[22px] object-cover"
                  />
                  <Image
                    src={pageContent?.course?.images?.[1]?.src || "/img/product/2.png"}
                    width={300}
                    height={200}
                    alt={pageContent?.course?.images?.[1]?.alt || "Risk course image 2"}
                    className="w-[300px] h-[190px] rounded-[22px] object-cover"
                  />
                </div>
                <div className="">
                  <Image
                    src={pageContent?.course?.images?.[2]?.src || "/img/product/3.png"}
                    width={300}
                    height={200}
                    alt={pageContent?.course?.images?.[2]?.alt || "Training facility"}
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
                    src={pageContent?.course?.images?.[3]?.src || "/img/product/4.png"}
                    width={300}
                    height={200}
                    alt={pageContent?.course?.images?.[3]?.alt || "Course materials"}
                    className="w-[300px] h-[407px] rounded-[22px] object-cover"
                  />
                </div>
                <div className=" flex flex-col justify-between">
                  <Image
                    src={pageContent?.course?.images?.[0]?.src || "/img/product/1.png"}
                    width={300}
                    height={200}
                    alt={pageContent?.course?.images?.[0]?.alt || "Risk course image 1"}
                    className="w-[300px] h-[190px] rounded-[22px] object-cover"
                  />
                  <Image
                    src={pageContent?.course?.images?.[1]?.src || "/img/product/2.png"}
                    width={300}
                    height={200}
                    alt={pageContent?.course?.images?.[1]?.alt || "Risk course image 2"}
                    className="w-[300px] h-[190px] rounded-[22px] object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-[633px]">
              <h3 className=" text-32 font-medium  my-4">
                {pageContent?.course?.whatOffersTitle || 'What Our Course Offers:'}
              </h3>
              {pageContent?.course?.features?.map((feature: any, index: number) => (
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
            {pageContent?.course?.courseContent?.title || 'Course Content'}
          </h2>
          <ul className="space-y-2 text-16 md:text-18 font-bold text-[#4A4C56] mb-8">
            {pageContent?.course?.courseContent?.items?.map((item: any, index: number) => (
              <li key={index} className="flex items-center ">
                <span className="mt-1 mr-2 w-2 h-2 rounded-full bg-[#08316A]" />
                <span>{item}</span>
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
            {pageContent?.course?.additionalInfo?.map((info: any, index: number) => (
              <div key={index}>
                <p className=" text-[#4A4C56] leading-[140%] text-16 font-normal tracking-[0.5%]">
                  {info}
                </p>
              </div>
            )) || (
              // Fallback content when no CMS data is available
              <>
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
                    Contact us to secure your place in our next Risk course.
                    Don't wait – spaces fill up quickly!
                  </p>
                </div>

                <p className=" text-[#4A4C56] leading-[140%] text-16 font-normal tracking-[0.5%]">
                  For more information on supervision and practice driving, visit
                  Transportstyrelsen's website.
                </p>

                <p className=" text-[#4A4C56] leading-[140%] text-16 font-normal tracking-[0.5%]">
                  Remember, a good start is half the journey! We look forward to
                  welcoming you to ABS Trafikskola Södertälje. 🚗🎉
                </p>
              </>
            )}
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
