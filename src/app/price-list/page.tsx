'use client';
import Contact from '@/components/common/Contact';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { FaRegClock } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';
import { ProductDialog } from '@/components/dialog/ProductDialog';
import { courseAPI, scheduleAPI, type Course, type Schedule } from '@/lib/api';

type ProductItem = {
  date: string;
  time: string;
  title: string;
  seats: string;
  price: string;
  description?: string;
  courseId?: string;
  scheduleId?: string;
};

export default function PriceListPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [productData, setProductData] = useState<ProductItem>({
    date: '2024-03-20 Wednesday',
    time: '17:00 - 20:15',
    title: 'Course Information',
    seats: '5 seats available',
    price: '299 kr',
    description:
      'Ready to embark on your journey to becoming a confident driver?',
  });

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await courseAPI.getAll({
          limit: 50,
          sortBy: 'category',
          sortOrder: 'asc',
          active: 'true',
        });

        if (response.success && response.data) {
          const validCourses = response.data.filter(
            (course) =>
              course.title &&
              course.price !== undefined &&
              course.price !== null
          );
          setCourses(validCourses);
          console.log('Fetched courses for price list:', validCourses);
        } else {
          throw new Error(response.message || 'Failed to fetch courses');
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err instanceof Error ? err.message : 'Failed to load courses');
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Get unique categories from courses
  const categories = [...new Set(courses.map((course) => course.category))];

  const handleBookOnline = async (course: Course) => {
    try {
      // Fetch schedule data based on course title
      let scheduleData: Schedule | null = null;
      let dialogData: ProductItem;

      try {
        const scheduleResponse = await scheduleAPI.getByTitle(course.title);
        if (
          scheduleResponse.success &&
          scheduleResponse.data &&
          scheduleResponse.data.length > 0
        ) {
          // Use the first available schedule
          scheduleData = scheduleResponse.data[0];

          // Format date and time from schedule
          const scheduleDate = new Date(scheduleData.date);
          const formattedDate = scheduleDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            weekday: 'long',
          });

          const timeRange = `${scheduleData.startTime} - ${scheduleData.endTime}`;
          const availableSeats = scheduleData.availableSlots;

          dialogData = {
            date: formattedDate,
            time: timeRange,
            title: course.title,
            seats: `${availableSeats} seats available`,
            price: `${scheduleData.price} kr`,
            description:
              course.description ||
              'Ready to embark on your journey to becoming a confident driver?',
            courseId: course.courseId,
            scheduleId: scheduleData.scheduleId,
          };
        } else {
          // Fallback if no schedule found
          console.warn(`No schedule found for course: ${course.title}`);
          dialogData = {
            date: '2024-03-20 Wednesday',
            time: '17:00 - 20:15',
            title: course.title,
            seats: '5 seats available',
            price: `${course.price} kr`,
            description:
              course.description ||
              'Ready to embark on your journey to becoming a confident driver?',
            courseId: course.courseId,
            scheduleId: undefined,
          };
        }
      } catch (scheduleError) {
        console.error('Error fetching schedule:', scheduleError);
        // Fallback to course data if schedule fetch fails
        dialogData = {
          date: '2024-03-20 Wednesday',
          time: '17:00 - 20:15',
          title: course.title,
          seats: '5 seats available',
          price: `${course.price} kr`,
          description:
            course.description ||
            'Ready to embark on your journey to becoming a confident driver?',
          courseId: course.courseId,
          scheduleId: undefined,
        };
      }

      setProductData(dialogData);
      setProductDialogOpen(true);
    } catch (error) {
      console.error('Error in handleBookOnline:', error);
      alert('Failed to load course details. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="bg-white py-12 md:py-20 px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <div className="text-center">
            <h2 className="text-24 sm:text-56 font-bold text-[#1D1F2C] mb-8">
              Loading Pricing Plans...
            </h2>
            <div className="grid gap-4 md:grid-cols-2 py-8">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg p-6 shadow-sm animate-pulse"
                >
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white py-12 md:py-20 px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <div className="text-center">
            <h2 className="text-24 sm:text-56 font-bold text-[#1D1F2C] mb-4">
              Pricing Plans
            </h2>
            <p className="text-red-600 mb-4">Failed to load courses: {error}</p>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className=" bg-white py-12 md:py-20 px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <div>
            <h2 className="text-24 sm:text-56 font-bold text-[#1D1F2C] text-center mb-4">
              Pricing Plans
            </h2>

            <div className=" flex flex-col space-y-5  justify-center items-center">
              <Button className="bg-[#EB3D4D] hover:bg-[#EB3D4D] w-[291px] h-[46px] rounded-[100px] font-semibold text-16 leading-[140%] tracking-[0.5%] text-white">
                Our driving lesson is 50 minutes
              </Button>

              <div className="w-full md:w-[872px] text-center">
                <p className="text-16 leading-[140%] tracking-[0.5%] text-[#4A4C56]">
                  Book Risk 1 and Handleadrkurs for private driving online. Call
                  or email us to book Driving Lessons, Risk 2 (Halkbana),
                  Theory, Eye Tests, and Taxi Lessons etc
                </p>
              </div>
            </div>

            {categories.length > 0 ? (
              categories.map((category) => (
                <div className="w-full" key={category}>
                  <div className="flex items-center space-x-4 py-8">
                    <div className="w-full h-[2.5px] bg-[#A7CBF7]"></div>
                    <div className="w-auto whitespace-pre">
                      <h3 className="text-[#3F8FEE] font-bold text-18 sm:text-40">
                        {category}
                      </h3>
                    </div>
                    <div className="w-full h-[2.5px] bg-[#A7CBF7]"></div>
                  </div>

                  <div className="flex flex-wrap justify-between">
                    {/* items in each category */}
                    {courses
                      .filter((course) => course.category === category)
                      .map((course, index) => (
                        <div
                          className="w-full sm:basis-5/12 xl:w-[588px] space-y-5 my-5"
                          key={course._id || index}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex flex-col">
                              <h3 className="text-[#1D1F2C] font-semibold text-20 sm:text-32">
                                {course.title}
                              </h3>
                              {course.duration && (
                                <div className="flex items-center space-x-3 text-[#3F8FEE]">
                                  <FaRegClock />
                                  <p className="text-[#4A4C56] text-16 font-medium">
                                    {course.duration}
                                  </p>
                                </div>
                              )}
                            </div>
                            <h2 className="text-[#3F8FEE] text-20 sm:text-40 font-bold">
                              {course.price}
                              <sup className="text-14 font-medium tracking-[0.5%] relative -top-6">
                                kr
                              </sup>
                            </h2>
                          </div>
                          <p className="text-16 leading-[140%] tracking-[0.5%] text-[#4A4C56]">
                            {course.description ||
                              'Ready to embark on your journey to becoming a confident driver?'}
                          </p>
                          <Button
                            onClick={() => handleBookOnline(course)}
                            className=" border border-[#3F8FEE] rounded-[30px] h-[48px] min-w-[130px] bg-transparent  flex items-center justify-center font-sansat text-14 tracking-[0.5%] leading-[140%] hover:bg-[#3F8FEE] hover:text-white has-[span]:text-blue-600"
                          >
                            <div className="flex items-center space-x-2">
                              <span>Book Online</span>
                            </div>
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  No courses available at the moment.
                </p>
              </div>
            )}

            <div className="flex flex-col space-y-2 my-10">
              <h3 className=" text-[#1D1F2C] font-semibold text-24 ">
                Terms and Conditions
              </h3>
              <p className=" text-16 text-black font-normal">
                <strong className="text-28 font-bold">*</strong>
                Based on monthly installment of 24 months. One time
                administrative charge and monthly invoices charges apply
              </p>
              <div className="flex items-start space-x-2 ">
                <div className=" w-[10px] h-[10px] rounded-full bg-[#3F8FEE] mt-2"></div>
                <p className=" w-11/12">
                  <strong>Full Payment Required:</strong> Full payment must be
                  made at the time of booking.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className=" w-[10px] h-[10px] rounded-full bg-[#3F8FEE] mt-2"></div>
                <p className="w-11/12 font-medium text-18 text-[#4A4C56]">
                  <strong className=" text-[#1D1F2C]">
                    Class Cancellations:
                  </strong>
                  Please cancel classes at least 24 hours in advance on
                  weekdays. For Monday bookings, cancellations must be made by
                  Friday.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className=" w-[10px] h-[10px] rounded-full bg-[#3F8FEE]  mt-2"></div>
                <p className="w-11/12 font-medium text-18 text-[#4A4C56]">
                  <strong className=" text-[#1D1F2C]">
                    Risk 1 and Risk 2 Cancellations:
                  </strong>
                  Cancellations for Risk 1 and Risk 2 must be made at least 2
                  days in advance on weekdays. For Monday Risk 2 bookings,
                  cancellations must be made no later than Thursday.
                </p>
              </div>
              <p>Thank you for your understanding and cooperation.</p>
            </div>
          </div>
        </div>
      </div>
      <Contact />
      <ProductDialog
        open={productDialogOpen}
        onOpenChange={setProductDialogOpen}
        data={productData}
      />
    </>
  );
}
