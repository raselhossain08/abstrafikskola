'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { scheduleAPI, Schedule } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { ProductDialog } from '@/components/dialog/ProductDialog';
import Contact from '@/components/common/Contact';
import { halkbanaContentService, HalkbanaContent } from '@/services/halkbanaContentService';

// Static metadata will be handled by layout.tsx or metadata.ts file

type HalkbanaItem = {
  _id?: string;
  scheduleId?: string;
  date: string;
  time: string;
  title: string;
  seats: string;
  price: string;
};

export default function HalkbanaPage() {
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  // State for API integration
  const [halkbanaOpen, setHalkbanaOpen] = useState(false);
  const [popupData, setPopupData] = useState<HalkbanaItem | null>(null);
  const [courseSlots, setCourseSlots] = useState<HalkbanaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for halkbana content
  const [halkbanaContent, setHalkbanaContent] = useState<HalkbanaContent | null>(null);
  const [contentLoading, setContentLoading] = useState(true);
  const [contentError, setContentError] = useState<string | null>(null);

  // Fetch halkbana content from API
  useEffect(() => {
    const fetchHalkbanaContent = async () => {
      try {
        setContentLoading(true);
        setContentError(null);
        
        const content = await halkbanaContentService.getHalkbanaContent();
        
        if (content) {
          setHalkbanaContent(content);
        } else {
          setContentError('Failed to load content');
        }
      } catch (err) {
        console.error('Error fetching halkbana content:', err);
        setContentError('Failed to load content');
      } finally {
        setContentLoading(false);
      }
    };

    fetchHalkbanaContent();
  }, []);

  // Fetch course schedules from API
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        setError(null);

        // Search for "Halkbana" schedules using the API
        const response = await scheduleAPI.getByTitle('Halkbana');

        if (response.success && response.data && response.data.length > 0) {
          // Transform API data to match component format
          const transformedSlots: HalkbanaItem[] = response.data.map(
            (schedule: Schedule) => {
              // Format date with day name
              const scheduleDate = new Date(schedule.date);
              const formattedDate = scheduleDate.toLocaleDateString(
                language === 'ar'
                  ? 'ar-SA'
                  : language === 'sv'
                    ? 'sv-SE'
                    : 'en-US',
                {
                  weekday: 'long',
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }
              );

              // Format time range
              const timeRange = `${schedule.startTime} - ${schedule.endTime}`;

              // Calculate available seats
              const availableSeats = schedule.availableSlots;
              const seatsText =
                availableSeats > 0
                  ? `${availableSeats} ${language === 'ar' ? 'مقاعد متاحة' : language === 'sv' ? 'platser tillgängliga' : 'seats available'}`
                  : language === 'ar'
                    ? 'مكتملة'
                    : language === 'sv'
                      ? 'Fullbokad'
                      : 'Fully booked';

              return {
                _id: schedule._id,
                scheduleId: schedule.scheduleId,
                date: formattedDate,
                time: timeRange,
                title: schedule.title,
                seats: seatsText,
                price: `${schedule.price} ${language === 'ar' ? 'كرونة' : 'kr'}`,
              };
            }
          );

          setCourseSlots(transformedSlots);
        } else {
          // Fallback to static data if API has no data
          setCourseSlots([
            {
              date:
                language === 'ar'
                  ? 'الأربعاء 2024-03-20'
                  : language === 'sv'
                    ? '2024-03-20 Onsdag'
                    : '2024-03-20 Wednesday',
              time: '09:00 - 12:00',
              title:
                language === 'ar'
                  ? 'دورة هالكبانا (ريسك 2)'
                  : language === 'sv'
                    ? 'Halkbana (Risk2)'
                    : 'Halkbana (Risk2)',
              seats:
                language === 'ar'
                  ? '8 مقاعد متاحة'
                  : language === 'sv'
                    ? '8 platser tillgängliga'
                    : '8 seats available',
              price: language === 'ar' ? '599 كرونة' : '599 kr',
            },
            {
              date:
                language === 'ar'
                  ? 'السبت 2024-03-23'
                  : language === 'sv'
                    ? '2024-03-23 Lördag'
                    : '2024-03-23 Saturday',
              time: '13:00 - 16:00',
              title:
                language === 'ar'
                  ? 'دورة هالكبانا (ريسك 2)'
                  : language === 'sv'
                    ? 'Halkbana (Risk2)'
                    : 'Halkbana (Risk2)',
              seats:
                language === 'ar'
                  ? '6 مقاعد متاحة'
                  : language === 'sv'
                    ? '6 platser tillgängliga'
                    : '6 seats available',
              price: language === 'ar' ? '599 كرونة' : '599 kr',
            },
          ]);
        }
      } catch (err) {
        console.error('Error fetching schedules:', err);
        setError(null); // Don't show error, just fall back to static data

        // Fallback to static data
        setCourseSlots([
          {
            date:
              language === 'ar'
                ? 'الأربعاء 2024-03-20'
                : language === 'sv'
                  ? '2024-03-20 Onsdag'
                  : '2024-03-20 Wednesday',
            time: '09:00 - 12:00',
            title:
              language === 'ar'
                ? 'دورة هالكبانا (ريسك 2)'
                : language === 'sv'
                  ? 'Halkbana (Risk2)'
                  : 'Halkbana (Risk2)',
            seats:
              language === 'ar'
                ? '8 مقاعد متاحة'
                : language === 'sv'
                  ? '8 platser tillgängliga'
                  : '8 seats available',
            price: language === 'ar' ? '599 كرونة' : '599 kr',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [language]);

  const handleBooking = (data: HalkbanaItem) => {
    setHalkbanaOpen(true);
    setPopupData(data);
    console.log('Booking data:', data);
  };

  // Translation helper function
  const t = (content: any) => {
    if (typeof content === 'object' && content[language]) {
      return content[language];
    }
    return content;
  };

  // Handle RTL for Arabic
  const isRtl = language === 'ar';
  const directionClass = isRtl ? 'rtl' : 'ltr';

  // Show loading state
  if (contentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg">
          {language === 'ar' ? 'جاري التحميل...' : language === 'sv' ? 'Laddar...' : 'Loading...'}
        </span>
      </div>
    );
  }

  // Show error state
  if (contentError || !halkbanaContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {language === 'ar' ? 'خطأ في تحميل المحتوى' : language === 'sv' ? 'Fel vid laddning av innehåll' : 'Error loading content'}
          </p>
          <Button onClick={() => window.location.reload()} variant="outline">
            {language === 'ar' ? 'إعادة المحاولة' : language === 'sv' ? 'Försök igen' : 'Try Again'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={directionClass}>
      <div className="bg-[#F7FAFF] py-[56px] md:py-[120px] px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <h1 className="text-24 sm:text-56 font-bold  text-[#1D1F2C] leading-[140%] text-center pb-5">
            {t(halkbanaContent.hero.title)}
          </h1>
          <div className="w-full sm:w-[872px] mx-auto pb-10">
            <p className=" text-16 leading-[140%] text-center font-normal text-[#4A4C56]">
              {t(halkbanaContent.hero.description)}
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
                  Currently, there are no Halkbana courses scheduled.
                </p>
                <Button
                  onClick={() => window.location.reload()}
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
                        onClick={() => handleBooking(item)}
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
                            onClick={() => handleBooking(item)}
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

      {/* Course Section */}
      <main className="bg-white py-16 xl:py-[120px] px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <h2 className="text-24 md:text-35 font-[600] text-[#1D1F2C] leading-[100%] pb-5">
            {t(halkbanaContent.course.title)}
          </h2>
          <p className="text-20 md:text-30 font-[500] text-[#1D1F2C] leading-[100%] pb-3">
            {t(halkbanaContent.course.subtitle)}
          </p>
          <p className="text-16 font-[400] text-[#000000] leading-[140%] tracking-[0.5%] w-11/12 pb-10">
            {t(halkbanaContent.course.description)}
          </p>
          <div className="flex justify-between items-center pb-12 md:flex-row flex-col-reverse">
            {/* Course Details */}
            <section
              className="w-full md:w-[633px]"
              aria-labelledby="course-heading"
            >
              <h3 id="course-heading" className="sr-only">
                {t(halkbanaContent.course.title)}
              </h3>
              <ul className="space-y-2 text-18 font-medium text-[#4A4C56] mb-8">
                {halkbanaContent.course.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 w-2 h-2 rounded-full bg-[#08316A] mt-2" />
                    <p className="w-11/12">
                      <strong>{t(benefit.title)}: </strong>
                      {t(benefit.description)}
                    </p>
                  </li>
                ))}
              </ul>
              <h3 className="text-32 font-medium mb-6 text-[#1D1F2C]">
                {t(halkbanaContent.course.courseContent.title)}
              </h3>
              <ul className="space-y-2 text-18 font-medium text-[#4A4C56] mb-8">
                {halkbanaContent.course.courseContent.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 w-2 h-2 rounded-full bg-[#08316A] mt-2" />
                    <p className="w-11/12">{t(item)}</p>
                  </li>
                ))}
              </ul>
              <h4 className="font-bold text-18 text-black">
                {t(halkbanaContent.course.duration.title)}:
              </h4>
              <p className="font-normal text-16 text-[#4A4C56] tracking-[0.5%] py-3">
                {t(halkbanaContent.course.duration.description)}
              </p>
              <p className="font-normal text-16 text-[#4A4C56] tracking-[0.5%]">
                {language === 'en'
                  ? 'For more information, visit'
                  : language === 'ar'
                    ? 'لمزيد من المعلومات، قم بزيارة'
                    : 'För mer information, besök'}{' '}
                <a
                  href={halkbanaContent.course.duration.linkUrl}
                  className="text-[#3F8FEE] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(halkbanaContent.course.duration.linkText)}
                </a>
              </p>
            </section>

            {/* Images */}
            <section
              className="w-full md:w-[633px] mb-5 md:mb-0"
              aria-label="Course Images"
            >
              <div className="flex w-full justify-between space-x-5">
                <div className="flex flex-col justify-between">
                  <Image
                    src={halkbanaContent.course.images[0].src}
                    width={halkbanaContent.course.images[0].width}
                    height={halkbanaContent.course.images[0].height}
                    alt={t(halkbanaContent.course.images[0].alt)}
                    className="w-[300px] h-[190px] rounded-[22px] object-cover"
                    loading="lazy"
                  />
                  <Image
                    src={halkbanaContent.course.images[1].src}
                    width={halkbanaContent.course.images[1].width}
                    height={halkbanaContent.course.images[1].height}
                    alt={t(halkbanaContent.course.images[1].alt)}
                    className="w-[300px] h-[190px] rounded-[22px] object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <Image
                    src={halkbanaContent.course.images[2].src}
                    width={halkbanaContent.course.images[2].width}
                    height={halkbanaContent.course.images[2].height}
                    alt={t(halkbanaContent.course.images[2].alt)}
                    className="w-[300px] h-[407px] rounded-[22px] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>



      {/* Contact Section */}
      <Contact />

      {/* Booking Dialog */}
      <ProductDialog
        open={halkbanaOpen}
        onOpenChange={setHalkbanaOpen}
        data={popupData}
      />

      {/* RTL Styles for Arabic */}
      <style jsx>{`
        .rtl {
          direction: rtl;
        }
        .rtl ul {
          padding-right: 1rem;
        }
        .rtl .flex.items-start {
          flex-direction: row-reverse;
        }
        .rtl .mr-2 {
          margin-right: 0;
          margin-left: 0.5rem;
        }
        .rtl .text-center {
          text-align: center;
        }
      `}</style>
    </div>
  );
}
