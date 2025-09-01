'use client';
import Contact from '@/components/common/Contact';
import { ProductDialog } from '@/components/dialog/ProductDialog';
import { Button } from '@/components/ui/button';
import { scheduleAPI, courseAPI, type Schedule } from '@/lib/api';
import { handledarkursContentService, HandledarkursContent } from '@/services/handledarkursContentService';
import { useLanguage } from '@/contexts/LanguageContext';
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
  const { language } = useLanguage(); // Get current language from context
  const [handledarkursOpen, setHandledarkursOpen] = useState(false);
  const [popupData, setPopupData] = useState<HandledarkursItem | null>(null);
  const [courseSlots, setCourseSlots] = useState<HandledarkursItem[]>([]);
  const [loading, setLoading] = useState(true);

  // State for handledarkurs content
  const [handledarkursContent, setHandledarkursContent] = useState<HandledarkursContent | null>(null);
  const [contentLoading, setContentLoading] = useState(true);
  const [contentError, setContentError] = useState<string | null>(null);

  // Fetch handledarkurs content from API based on current language
  useEffect(() => {
    const fetchHandledarkursContent = async () => {
      try {
        setContentLoading(true);
        setContentError(null);
        
        console.log(`🌐 Fetching handledarkurs content for language: ${language}`);
        const content = await handledarkursContentService.getHandledarkursContent(language);
        
        if (content) {
          console.log(`✅ Content loaded successfully for ${language}`);
          setHandledarkursContent(content);
        } else {
          console.error(`❌ Failed to load content for ${language}`);
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
  }, [language]); // Re-fetch when language changes

  useEffect(() => {
    fetchHandledarkursCourses();
  }, []);

  const fetchHandledarkursCourses = async () => {
    try {
      setLoading(true);

      // First try to search by Handledarkurs category, then fallback to other searches
      let response;
      
      // Try Handledarkurs category first (exact match)
      response = await courseAPI.getByCategory('Handledarkurs');
      console.log('🔍 Handledarkurs Category API response:', response);
      
      if (!response.success || !response.data || response.data.length === 0) {
        // Try handledarkurs lowercase as fallback
        console.log('❌ No Handledarkurs courses found, trying lowercase handledarkurs');
        response = await courseAPI.getByCategory('handledarkurs');
        console.log('🔍 handledarkurs Category API response:', response);
      }
      
      if (!response.success || !response.data || response.data.length === 0) {
        // Final fallback to title search
        console.log('❌ No category courses found, falling back to title search');
        response = await scheduleAPI.getByTitle('Handledarkurs');
        console.log('🔍 Title search API response:', response);
      }

      if (response.success && response.data && response.data.length > 0) {
        // Transform the course data to match our component interface
        const transformedCourses = response.data.map((item: any) => {
          let scheduleDate, formattedDate, timeRange, availableSeats;
          
          // Check if this is schedule data or course data with schedule info
          if (item.date && item.startTime && item.endTime) {
            // This is schedule data
            scheduleDate = new Date(item.date);
            formattedDate = formatScheduleDate(item.date);
            timeRange = `${item.startTime} - ${item.endTime}`;
            availableSeats = item.availableSlots || item.availableSeats || item.totalSeats || 15;
          } else {
            // This is course data, use default values
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            formattedDate = formatScheduleDate(tomorrow.toISOString());
            timeRange = '09:00 - 17:00';
            availableSeats = item.maxStudents || item.totalSeats || 15;
          }

          return {
            scheduleId: item.scheduleId || item._id,
            date: formattedDate,
            time: timeRange,
            title: item.title || item.course?.title || 'Handledarkurs',
            seats: `${availableSeats} seats available`,
            price: `${item.price || 1500} kr`,
            maxStudents: item.maxStudents || item.totalSeats || 15,
            currentBookings: item.currentBookings || item.bookedSeats || 0,
            startTime: item.startTime || '09:00',
            endTime: item.endTime || '17:00',
            venue: item.venue || 'ABS Trafikskola Södertälje',
            instructor: item.instructor || item.teacherName || 'Certified Instructor',
            status: item.status !== false,
            course: {
              title: item.title || item.course?.title || 'Handledarkurs',
              category: 'Handledarkurs',
              language: item.language || 'Svenska',
            },
          };
        });

        setCourseSlots(transformedCourses);
        console.log(`✅ Loaded ${transformedCourses.length} handledarkurs courses`);
      } else {
        console.log('❌ No handledarkurs courses found, falling back to title search');
        
        // Fallback to the original method if category API doesn't return results
        const fallbackResponse = await scheduleAPI.getByTitle('Handledarkurs');
        
        if (fallbackResponse.success && fallbackResponse.data && fallbackResponse.data.length > 0) {
          const transformedCourses = fallbackResponse.data.map((schedule: Schedule) => {
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
      }
    } catch (err) {
      console.error('Error fetching handledarkurs courses:', err);
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

  // Translation helper function - now content is already in selected language
  const t = (content: any) => {
    // Since we're fetching language-specific content from API,
    // the content is already in the selected language
    if (typeof content === 'string') {
      return content;
    }
    // Fallback for multi-language objects (backward compatibility)
    if (typeof content === 'object' && content) {
      return content[language] || content.en || content;
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
                  Loading Handledarkurs courses...
                </p>
              </div>
            </div>
          )}

          {/* No Courses Available */}
          {!loading && courseSlots.length === 0 && (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <h3 className="text-24 font-bold text-[#1D1F2C] mb-2">
                  No Handledarkurs Courses Available
                </h3>
                <p className="text-[#4A4C56] text-16 mb-4">
                  Currently, there are no Handledarkurs category courses scheduled.
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
      <main className="bg-white py-16 xl:py-[120px] px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <h2 className="text-24 md:text-35 font-[600] text-[#1D1F2C] leading-[100%] pb-5">
            {t(handledarkursContent.course.welcomeTitle)}
          </h2>
          <p className="text-20 md:text-30 font-[500] text-[#1D1F2C] leading-[100%] pb-3">
            {t(handledarkursContent.course.subtitle)}
          </p>
          <p className="text-16 font-[400] text-[#000000] leading-[140%] tracking-[0.5%] w-11/12 pb-10">
            {t(handledarkursContent.course.description)}
          </p>
          <div className="flex justify-between items-center pb-12 md:flex-row flex-col-reverse">
            {/* Course Details */}
            <section
              className="w-full md:w-[633px]"
              aria-labelledby="course-heading"
            >
              <h3 id="course-heading" className="sr-only">
                {t(handledarkursContent.course.welcomeTitle)}
              </h3>
              {handledarkursContent.course.benefits && handledarkursContent.course.benefits.length > 0 && (
                <ul className="space-y-2 text-18 font-medium text-[#4A4C56] mb-8">
                  {handledarkursContent.course.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 w-2 h-2 rounded-full bg-[#08316A] mt-2" />
                      <p className="w-11/12">
                        <strong>{t(benefit.title) || `Benefit ${index + 1}`}: </strong>
                        {t(benefit.description) || ''}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <h3 className="text-32 font-medium mb-6 text-[#1D1F2C]">
                {handledarkursContent.course.courseContent?.title ? t(handledarkursContent.course.courseContent.title) : 'Course Content'}
              </h3>
              {handledarkursContent.course.courseContent?.items && handledarkursContent.course.courseContent.items.length > 0 && (
                <ul className="space-y-2 text-18 font-medium text-[#4A4C56] mb-8">
                  {handledarkursContent.course.courseContent.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 w-2 h-2 rounded-full bg-[#08316A] mt-2" />
                      <p className="w-11/12">{t(item) || `Course item ${index + 1}`}</p>
                    </li>
                  ))}
                </ul>
              )}
              <div className="space-y-4">
                {handledarkursContent.course.additionalInfo && handledarkursContent.course.additionalInfo.length > 0 && (
                  <>
                    {handledarkursContent.course.additionalInfo.map((info, index) => (
                      <p key={index} className="font-normal text-16 text-[#4A4C56] tracking-[0.5%]">
                        {t(info)}
                      </p>
                    ))}
                  </>
                )}
              </div>
            </section>

            {/* Images */}
            <section
              className="w-full md:w-[633px] mb-5 md:mb-0"
              aria-label="Course Images"
            >
              {handledarkursContent.course.images && handledarkursContent.course.images.length >= 3 ? (
                <div className="flex w-full justify-between space-x-5">
                  <div className="flex flex-col justify-between">
                    <Image
                      src={handledarkursContent.course.images[0].src}
                      width={handledarkursContent.course.images[0].width}
                      height={handledarkursContent.course.images[0].height}
                      alt={t(handledarkursContent.course.images[0].alt) || 'Course image'}
                      className="w-[300px] h-[190px] rounded-[22px] object-cover"
                      loading="lazy"
                    />
                    <Image
                      src={handledarkursContent.course.images[1].src}
                      width={handledarkursContent.course.images[1].width}
                      height={handledarkursContent.course.images[1].height}
                      alt={t(handledarkursContent.course.images[1].alt) || 'Course image'}
                      className="w-[300px] h-[190px] rounded-[22px] object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <Image
                      src={handledarkursContent.course.images[2].src}
                      width={handledarkursContent.course.images[2].width}
                      height={handledarkursContent.course.images[2].height}
                      alt={t(handledarkursContent.course.images[2].alt) || 'Course image'}
                      className="w-[300px] h-[407px] rounded-[22px] object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[407px] bg-gray-200 rounded-[22px]">
                  <p className="text-gray-500">Course images loading...</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
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
