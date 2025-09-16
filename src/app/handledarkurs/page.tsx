'use client';
import Contact from '@/components/common/Contact';
import { ProductDialog } from '@/components/dialog/ProductDialog';
import { Button } from '@/components/ui/button';
import { handledarkursContentService, HandledarkursContent } from '@/services/handledarkursContentService';
import { useLanguage } from '@/contexts/LanguageContext';
import { fetchCoursesByCategory, CategoryCourseItem } from '@/lib/categoryAPI';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa6';

type HandledarkursItem = CategoryCourseItem;

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

  // Fetch handledarkurs courses using category API
  useEffect(() => {
    const loadHandledarkursCourses = async () => {
      try {
        setLoading(true);
        console.log('🔍 Loading Handledarkurs category courses...');

        // Try to fetch Handledarkurs category courses
        const result = await fetchCoursesByCategory('Handledarkurs');
        
        if (result.success && result.data.length > 0) {
          setCourseSlots(result.data);
          console.log(`✅ Loaded ${result.data.length} Handledarkurs courses`);
        } else {
          // No courses found, so set to empty array
          console.log('⚠️ No Handledarkurs courses found from API.');
          setCourseSlots([]);
        }
        
      } catch (err) {
        console.error('❌ Error loading Handledarkurs courses:', err);
        setCourseSlots([]);
      } finally {
        setLoading(false);
      }
    };

    loadHandledarkursCourses();
  }, [language]);

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
                  No Handledarkurs Courses Available
                </h3>
                <p className="text-gray-600 mb-4">
                  There are currently no Handledarkurs courses scheduled. Please check
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
            </div>
          )}

          {/* Schedule Info */}


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
