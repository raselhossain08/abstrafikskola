'use client';
import React, { useState, useEffect } from 'react';
import { FaCheck, FaCar, FaUserTie, FaRoute, FaClock } from 'react-icons/fa';
import { scheduleAPI, type Schedule } from '@/lib/api';
import Contact from '@/components/common/Contact';
import { useLanguage } from '@/contexts/LanguageContext';

interface TaxiItem {
  _id?: string;
  scheduleId?: string;
  date: string;
  time: string;
  title: string;
  seats: string;
  price: string;
}

export default function TaxiPage() {
  const [courseSlots, setCourseSlots] = useState<TaxiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  // Fetch course schedules from API
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        setError(null);

        // Search for "Taxi" schedules using the API
        const response = await scheduleAPI.getByTitle('Taxi');

        if (response.success && response.data && response.data.length > 0) {
          // Transform API data to match component format
          const transformedSlots: TaxiItem[] = response.data.map(
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
                  ? 'الثلاثاء 2024-03-19'
                  : language === 'sv'
                    ? '2024-03-19 Tisdag'
                    : '2024-03-19 Tuesday',
              time: '10:00 - 13:00',
              title:
                language === 'ar'
                  ? 'دورة قيادة التاكسي'
                  : language === 'sv'
                    ? 'Taxikurs'
                    : 'Taxi Course',
              seats:
                language === 'ar'
                  ? '6 مقاعد متاحة'
                  : language === 'sv'
                    ? '6 platser tillgängliga'
                    : '6 seats available',
              price: language === 'ar' ? '2500 كرونة' : '2500 kr',
            },
            {
              date:
                language === 'ar'
                  ? 'الجمعة 2024-03-22'
                  : language === 'sv'
                    ? '2024-03-22 Fredag'
                    : '2024-03-22 Friday',
              time: '14:00 - 17:00',
              title:
                language === 'ar'
                  ? 'دورة قيادة التاكسي'
                  : language === 'sv'
                    ? 'Taxikurs'
                    : 'Taxi Course',
              seats:
                language === 'ar'
                  ? '4 مقاعد متاحة'
                  : language === 'sv'
                    ? '4 platser tillgängliga'
                    : '4 seats available',
              price: language === 'ar' ? '2500 كرونة' : '2500 kr',
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
                ? 'الثلاثاء 2024-03-19'
                : language === 'sv'
                  ? '2024-03-19 Tisdag'
                  : '2024-03-19 Tuesday',
            time: '10:00 - 13:00',
            title:
              language === 'ar'
                ? 'دورة قيادة التاكسي'
                : language === 'sv'
                  ? 'Taxikurs'
                  : 'Taxi Course',
            seats:
              language === 'ar'
                ? '6 مقاعد متاحة'
                : language === 'sv'
                  ? '6 platser tillgängliga'
                  : '6 seats available',
            price: language === 'ar' ? '2500 كرونة' : '2500 kr',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [language]);

  const courseFeatures = [
    {
      icon: <FaUserTie className="text-blue-500" />,
      title: language === 'ar' ? 'تدريب احترافي' : language === 'sv' ? 'Professionell utbildning' : 'Professional Training',
      description: language === 'ar' ? 'تدريب شامل من مدربين معتمدين' : language === 'sv' ? 'Omfattande utbildning från certifierade instruktörer' : 'Comprehensive training from certified instructors'
    },
    {
      icon: <FaRoute className="text-blue-500" />,
      title: language === 'ar' ? 'معرفة الطرق' : language === 'sv' ? 'Vägkunskap' : 'Route Knowledge',
      description: language === 'ar' ? 'تعلم أفضل الطرق في المدينة' : language === 'sv' ? 'Lär dig de bästa rutterna i staden' : 'Learn the best routes in the city'
    },
    {
      icon: <FaCar className="text-blue-500" />,
      title: language === 'ar' ? 'مهارات القيادة المتقدمة' : language === 'sv' ? 'Avancerade körtekniker' : 'Advanced Driving Skills',
      description: language === 'ar' ? 'تقنيات قيادة متقدمة للسائقين المحترفين' : language === 'sv' ? 'Avancerade körtekniker för professionella förare' : 'Advanced driving techniques for professional drivers'
    },
    {
      icon: <FaClock className="text-blue-500" />,
      title: language === 'ar' ? 'مرونة في المواعيد' : language === 'sv' ? 'Flexibla tider' : 'Flexible Timing',
      description: language === 'ar' ? 'جدولة مرنة تناسب احتياجاتك' : language === 'sv' ? 'Flexibel schemaläggning som passar dina behov' : 'Flexible scheduling to fit your needs'
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {language === 'ar' ? 'جاري التحميل...' : language === 'sv' ? 'Laddar...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div 
        className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20"
        dir={language === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === 'ar' ? 'دورة قيادة التاكسي' : language === 'sv' ? 'Taxikurs' : 'Taxi Driving Course'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'احصل على رخصة قيادة التاكسي المهنية مع تدريب شامل ومعتمد'
              : language === 'sv' 
                ? 'Få din professionella taxilicens med omfattande och certifierad utbildning'
                : 'Get your professional taxi license with comprehensive and certified training'
            }
          </p>
        </div>
      </div>

      {/* Course Features */}
      <div className="py-16 bg-gray-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            {language === 'ar' ? 'ما ستتعلمه' : language === 'sv' ? 'Vad du kommer att lära dig' : 'What You\'ll Learn'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courseFeatures.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Available Courses */}
      <div className="py-16 bg-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            {language === 'ar' ? 'الدورات المتاحة' : language === 'sv' ? 'Tillgängliga kurser' : 'Available Courses'}
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseSlots.map((slot, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {slot.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-1">
                      📅 {slot.date}
                    </p>
                    <p className="text-gray-600 text-sm mb-2">
                      🕐 {slot.time}
                    </p>
                    <p className="text-green-600 text-sm font-medium">
                      ✅ {slot.seats}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      {slot.price}
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    {language === 'ar' ? 'احجز الآن' : language === 'sv' ? 'Boka nu' : 'Book Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {courseSlots.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {language === 'ar' 
                  ? 'لا توجد دورات متاحة حالياً. يرجى المحاولة مرة أخرى لاحقاً.'
                  : language === 'sv' 
                    ? 'Inga kurser tillgängliga för tillfället. Försök igen senare.'
                    : 'No courses available at the moment. Please try again later.'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Course Benefits */}
      <div className="py-16 bg-blue-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
              {language === 'ar' ? 'لماذا تختار دورتنا؟' : language === 'sv' ? 'Varför välja vår kurs?' : 'Why Choose Our Course?'}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    {language === 'ar' 
                      ? 'مدربون معتمدون مع خبرة واسعة في قيادة التاكسي'
                      : language === 'sv' 
                        ? 'Certifierade instruktörer med omfattande erfarenhet av taxikörning'
                        : 'Certified instructors with extensive taxi driving experience'
                    }
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    {language === 'ar' 
                      ? 'تدريب شامل على قوانين المرور وأنظمة التاكسي'
                      : language === 'sv' 
                        ? 'Omfattande utbildning i trafikregler och taxisystem'
                        : 'Comprehensive training on traffic laws and taxi regulations'
                    }
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    {language === 'ar' 
                      ? 'دعم كامل حتى الحصول على الرخصة'
                      : language === 'sv' 
                        ? 'Fullständigt stöd tills du får din licens'
                        : 'Full support until you get your license'
                    }
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    {language === 'ar' 
                      ? 'تدريب عملي في بيئة حقيقية'
                      : language === 'sv' 
                        ? 'Praktisk träning i verklig miljö'
                        : 'Practical training in real environment'
                    }
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    {language === 'ar' 
                      ? 'أسعار تنافسية وخطط دفع مرنة'
                      : language === 'sv' 
                        ? 'Konkurrenskraftiga priser och flexibla betalningsplaner'
                        : 'Competitive pricing and flexible payment plans'
                    }
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    {language === 'ar' 
                      ? 'معدل نجاح عالي في الاختبارات'
                      : language === 'sv' 
                        ? 'Hög framgångsgrad på proven'
                        : 'High success rate in examinations'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <Contact />
    </>
  );
}
