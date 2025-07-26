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

const content = {
  hero: {
    title: {
      en: 'Halkbana Schedule and Prices',
      ar: 'جدول وأسعار دورة هالكبانا',
      sv: 'Halkbana Schema och Priser',
    },
    description: {
      en: 'Riskettan (Risk 1) training covers crucial aspects of road safety and traffic behavior, essential for obtaining your Swedish driving license. We offer flexible online schedules to fit your busy life, and competitive prices to ensure you get the best value. Enroll now and start your journey towards a safer driving experience.',
      ar: 'تغطي دورة ريسكيتان (الريسك 1) جوانب حاسمة لسلامة الطرق وسلوك المرور، وهي ضرورية للحصول على رخصة القيادة السويدية. نقدم جداول زمنية مرنة عبر الإنترنت تناسب حياتك المزدحمة، وأسعارًا تنافسية لضمان الحصول على أفضل قيمة. سجل الآن وابدأ رحلتك نحو تجربة قيادة أكثر أمانًا.',
      sv: 'Riskettan (Risk 1) utbildning täcker viktiga aspekter av trafiksäkerhet och trafikbeteende, som är nödvändiga för att få ditt svenska körkort. Vi erbjuder flexibla online-scheman som passar ditt hektiska liv och konkurrenskraftiga priser för att säkerställa bästa värde. Anmäl dig nu och börja din resa mot en säkrare körupplevelse.',
    },
  },
  course: {
    title: {
      en: 'Risk2 Course at ABS Trafikskola Södertälje 🚧❄️',
      ar: 'دورة ريسك 2 في مدرسة ABS لتعليم القيادة سودرتاليا 🚧❄️',
      sv: 'Risk2-kurs på ABS Trafikskola Södertälje 🚧❄️',
    },
    subtitle: {
      en: 'Master the challenges of driving in difficult conditions with our Risk2 course!',
      ar: 'إتقان تحديات القيادة في الظروف الصعبة مع دورة ريسك 2 لدينا!',
      sv: 'Bemästra utmaningarna med att köra i svåra förhållanden med vår Risk2-kurs!',
    },
    description: {
      en: 'The Risk2 course for category B at ABS Trafikskola Södertälje is centered around understanding and handling the difficulties of driving on slippery surfaces and other challenging conditions. The aim is to enhance the understanding of the relationship between accident risks, speed, road conditions, and the importance of protective equipment.',
      ar: 'تركز دورة ريسك 2 للفئة B في مدرسة ABS لتعليم القيادة سودرتاليا على فهم ومعالجة صعوبات القيادة على الأسطح الزلقة وغيرها من الظروف الصعبة. الهدف هو تعزيز فهم العلاقة بين مخاطر الحوادث، السرعة، ظروف الطريق، وأهمية المعدات الواقية.',
      sv: 'Risk2-kursen för kategori B på ABS Trafikskola Södertälje fokuserar på att förstå och hantera svårigheterna med att köra på hala ytor och andra utmanande förhållanden. Målet är att öka förståelsen för sambandet mellan olycksrisker, hastighet, vägförhållanden och vikten av skyddsutrustning.',
    },
    benefits: [
      {
        title: {
          en: 'Safe Driving',
          ar: 'القيادة الآمنة',
          sv: 'Säker körning',
        },
        description: {
          en: 'Learn the importance of adjusting speed and driving with safety margins.',
          ar: 'تعلم أهمية ضبط السرعة والقيادة بهوامش أمان.',
          sv: 'Lär dig vikten av att anpassa hastigheten och köra med säkerhetsmarginaler.',
        },
      },
      {
        title: {
          en: 'Risk Awareness',
          ar: 'الوعي بالمخاطر',
          sv: 'Riskmedvetenhet',
        },
        description: {
          en: 'Understand the risks associated with driving and how to mitigate them.',
          ar: 'فهم المخاطر المرتبطة بالقيادة وكيفية التخفيف منها.',
          sv: 'Förstå riskerna med körning och hur man kan minska dem.',
        },
      },
    ],
    courseContent: {
      title: {
        en: 'Course Content',
        ar: 'محتوى الدورة',
        sv: 'Kursinnehåll',
      },
      items: [
        {
          en: 'Practical exercises on slippery surfaces.',
          ar: 'تمارين عملية على الأسطح الزلقة.',
          sv: 'Praktiska övningar på hala ytor.',
        },
        {
          en: 'Reflection and discussion on experiences and driving abilities.',
          ar: 'التفكير والنقاش حول الخبرات وقدرات القيادة.',
          sv: 'Reflektion och diskussion om erfarenheter och körförmåga.',
        },
      ],
    },
    duration: {
      title: {
        en: 'Course Duration and Reporting',
        ar: 'مدة الدورة والتقرير',
        sv: 'Kurslängd och rapportering',
      },
      description: {
        en: 'Approximately 3 hours of practical training. No paper certificates issued, reporting to Transportstyrelsen within 24 hours.',
        ar: 'حوالي 3 ساعات من التدريب العملي. لا يتم إصدار شهادات ورقية، يتم الإبلاغ إلى Transportstyrelsen خلال 24 ساعة.',
        sv: 'Cirka 3 timmars praktisk träning. Inga papperscertifikat utfärdas, rapportering till Transportstyrelsen inom 24 timmar.',
      },
      linkText: {
        en: "Transportstyrelsen's website",
        ar: 'موقع Transportstyrelsen',
        sv: 'Transportstyrelsens webbplats',
      },
      linkUrl: 'https://www.transportstyrelsen.se',
    },
    images: [
      {
        src: '/img/product/1.png',
        width: 300,
        height: 190,
        alt: {
          en: 'Risk2 Course Image 1',
          ar: 'صورة دورة ريسك 2 1',
          sv: 'Risk2-kurs Bild 1',
        },
      },
      {
        src: '/img/product/2.png',
        width: 300,
        height: 190,
        alt: {
          en: 'Risk2 Course Image 2',
          ar: 'صورة دورة ريسك 2 2',
          sv: 'Risk2-kurs Bild 2',
        },
      },
      {
        src: '/img/product/3.png',
        width: 300,
        height: 407,
        alt: {
          en: 'Risk2 Course Image 3',
          ar: 'صورة دورة ريسك 2 3',
          sv: 'Risk2-kurs Bild 3',
        },
      },
    ],
  },
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

  // Fetch course schedules from API
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        setError(null);

        // Search for "Halkbana" or "Risk2" schedules
        const response = await scheduleAPI.getByTitle('Halkbana');

        if (response.success && response.data) {
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
              const availableSeats =
                schedule.availableSlots ||
                schedule.maxStudents - schedule.currentBookings;
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
          // Fallback to static data if API fails or no data
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
        setError(
          language === 'ar'
            ? 'فشل في تحميل جداول الدورات'
            : language === 'sv'
              ? 'Kunde inte ladda kursscheman'
              : 'Failed to load course schedules'
        );
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

  return (
    <div className={directionClass}>
      {/* Hero Section */}
      <header className="bg-[#F7FAFF] py-16 xl:py-[120px] px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <h1 className="text-24 sm:text-56 font-bold text-[#1D1F2C] leading-[140%] text-center pb-5">
            {t(content.hero.title)}
          </h1>
          <div className="w-full md:w-[872px] mx-auto pb-10">
            <p className="text-16 leading-[140%] text-center font-normal text-[#4A4C56]">
              {t(content.hero.description)}
            </p>
          </div>
        </div>
      </header>

      {/* Course Section */}
      <main className="bg-white py-16 xl:py-[120px] px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <h2 className="text-24 md:text-35 font-[600] text-[#1D1F2C] leading-[100%] pb-5">
            {t(content.course.title)}
          </h2>
          <p className="text-20 md:text-30 font-[500] text-[#1D1F2C] leading-[100%] pb-3">
            {t(content.course.subtitle)}
          </p>
          <p className="text-16 font-[400] text-[#000000] leading-[140%] tracking-[0.5%] w-11/12 pb-10">
            {t(content.course.description)}
          </p>
          <div className="flex justify-between items-center pb-12 md:flex-row flex-col-reverse">
            {/* Course Details */}
            <section
              className="w-full md:w-[633px]"
              aria-labelledby="course-heading"
            >
              <h3 id="course-heading" className="sr-only">
                {t(content.course.title)}
              </h3>
              <ul className="space-y-2 text-18 font-medium text-[#4A4C56] mb-8">
                {content.course.benefits.map((benefit, index) => (
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
                {t(content.course.courseContent.title)}
              </h3>
              <ul className="space-y-2 text-18 font-medium text-[#4A4C56] mb-8">
                {content.course.courseContent.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 w-2 h-2 rounded-full bg-[#08316A] mt-2" />
                    <p className="w-11/12">{t(item)}</p>
                  </li>
                ))}
              </ul>
              <h4 className="font-bold text-18 text-black">
                {t(content.course.duration.title)}:
              </h4>
              <p className="font-normal text-16 text-[#4A4C56] tracking-[0.5%] py-3">
                {t(content.course.duration.description)}
              </p>
              <p className="font-normal text-16 text-[#4A4C56] tracking-[0.5%]">
                {language === 'en'
                  ? 'For more information, visit'
                  : language === 'ar'
                    ? 'لمزيد من المعلومات، قم بزيارة'
                    : 'För mer information, besök'}{' '}
                <a
                  href={content.course.duration.linkUrl}
                  className="text-[#3F8FEE] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(content.course.duration.linkText)}
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
                    src={content.course.images[0].src}
                    width={content.course.images[0].width}
                    height={content.course.images[0].height}
                    alt={t(content.course.images[0].alt)}
                    className="w-[300px] h-[190px] rounded-[22px] object-cover"
                    loading="lazy"
                  />
                  <Image
                    src={content.course.images[1].src}
                    width={content.course.images[1].width}
                    height={content.course.images[1].height}
                    alt={t(content.course.images[1].alt)}
                    className="w-[300px] h-[190px] rounded-[22px] object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <Image
                    src={content.course.images[2].src}
                    width={content.course.images[2].width}
                    height={content.course.images[2].height}
                    alt={t(content.course.images[2].alt)}
                    className="w-[300px] h-[407px] rounded-[22px] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Course Schedule Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 py-16 px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            {language === 'ar'
              ? 'المواعيد المتاحة لدورة هالكبانا'
              : language === 'sv'
                ? 'Tillgängliga tider för Halkbana'
                : 'Available Halkbana Course Times'}
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-lg text-gray-600 dark:text-gray-300">
                {language === 'ar'
                  ? 'جاري التحميل...'
                  : language === 'sv'
                    ? 'Laddar...'
                    : 'Loading...'}
              </span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="px-6 py-2"
              >
                {language === 'ar'
                  ? 'إعادة المحاولة'
                  : language === 'sv'
                    ? 'Försök igen'
                    : 'Try Again'}
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {courseSlots.map((slot, index) => (
                <div
                  key={slot._id || index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-600"
                >
                  <div className="mb-4">
                    <p className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {slot.date}
                    </p>
                    <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">
                      {slot.time}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      {language === 'ar'
                        ? 'العنوان:'
                        : language === 'sv'
                          ? 'Titel:'
                          : 'Title:'}
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {slot.title}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {language === 'ar'
                          ? 'المقاعد:'
                          : language === 'sv'
                            ? 'Platser:'
                            : 'Seats:'}
                      </p>
                      <p className="font-medium text-green-600 dark:text-green-400">
                        {slot.seats}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {language === 'ar'
                          ? 'السعر:'
                          : language === 'sv'
                            ? 'Pris:'
                            : 'Price:'}
                      </p>
                      <p className="font-bold text-xl text-purple-600 dark:text-purple-400">
                        {slot.price}
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleBooking(slot)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                    disabled={slot.seats.includes(
                      language === 'ar'
                        ? 'مكتملة'
                        : language === 'sv'
                          ? 'Fullbokad'
                          : 'Fully booked'
                    )}
                  >
                    {isAuthenticated
                      ? language === 'ar'
                        ? 'احجز الآن'
                        : language === 'sv'
                          ? 'Boka nu'
                          : 'Book Now'
                      : language === 'ar'
                        ? 'سجل الدخول للحجز'
                        : language === 'sv'
                          ? 'Logga in för att boka'
                          : 'Login to Book'}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

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
