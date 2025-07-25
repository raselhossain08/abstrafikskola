import React, { useState, useEffect } from 'react';
import PricingCard from './PricingCard';
import { ProductDialog } from '@/components/dialog/ProductDialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { courseAPI, type Course } from '@/lib/api';

type ProductItem = {
  date: string;
  time: string;
  title: string;
  seats: string;
  price: string;
  description?: string;
  courseId?: string;
};

export default function PricingSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [productData, setProductData] = useState<ProductItem>({
    date: '2024-03-20 Wednesday',
    time: '17:00 - 20:15',
    title: 'Handledarkurs [Svenska]',
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
        const response = await courseAPI.getAll({
          limit: 20, // Get more courses to show variety
          sortBy: 'createdAt',
          sortOrder: 'desc',
        });

        if (response.success && response.data) {
          setCourses(response.data);
        } else {
          throw new Error(response.message || 'Failed to fetch courses');
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err instanceof Error ? err.message : 'Failed to load courses');
        // Fallback to default courses if API fails
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Transform backend course data to match PricingCard props
  const transformCourseToCard = (course: Course) => ({
    title: course.title,
    price: `${course.price} kr`,
    details:
      course.description ||
      'Ready to embark on your journey to becoming a confident driver?',
    active: false, // You can add logic to determine which course should be highlighted
  });

  // Fallback static cards if no courses from backend
  const fallbackCards = [
    {
      title: 'Handledarkurs',
      price: '299 kr',
      details:
        'Ready to embark on your journey to becoming a confident driver?',
    },
    {
      title: 'Riskettan',
      price: '349 kr',
      details:
        'Ready to embark on your journey to becoming a confident driver?',
      active: true,
    },
    {
      title: 'Risk2 (Halkbana)',
      price: '1890 kr',
      details:
        'Ready to embark on your journey to becoming a confident driver?',
    },
    {
      title: 'Risk1 + Risk2',
      price: '2090 kr',
      details:
        'Ready to embark on your journey to becoming a confident driver?',
    },
  ];

  // Use backend courses if available, otherwise use fallback
  const cards =
    courses.length > 0 ? courses.map(transformCourseToCard) : fallbackCards;

  const handleBookNow = (title: string) => {
    // Find the course data for the clicked course
    const selectedCourse = courses.find((course) => course.title === title);

    // Set the product data for the dialog
    const dialogData: ProductItem = {
      date: '2024-03-20 Wednesday', // You can make this dynamic based on course schedule
      time: '17:00 - 20:15', // You can make this dynamic based on course schedule
      title: title,
      seats: '5 seats available', // You can make this dynamic based on course capacity
      price: selectedCourse
        ? `${selectedCourse.price} kr`
        : getStaticPrice(title),
      description:
        selectedCourse?.description ||
        'Ready to embark on your journey to becoming a confident driver?',
      courseId: selectedCourse?.courseId, // Add courseId for schedule fetching
    };

    setProductData(dialogData);
    setProductDialogOpen(true);
  };

  // Helper function to get static price for fallback courses
  const getStaticPrice = (title: string): string => {
    const priceMap: { [key: string]: string } = {
      Handledarkurs: '299 kr',
      Riskettan: '349 kr',
      'Risk2 (Halkbana)': '1890 kr',
      'Risk1 + Risk2': '2090 kr',
    };
    return priceMap[title] || '299 kr';
  };

  if (loading) {
    return (
      <div className="bg-[#F7FAFF] py-8 sm:py-14 px-4 xl:px-0">
        <div className="w-full xl:w-[1320px] mx-auto">
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-5 py-8">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error && courses.length === 0) {
    return (
      <div className="bg-[#F7FAFF] py-8 sm:py-14 px-4 xl:px-0">
        <div className="w-full xl:w-[1320px] mx-auto">
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Failed to load courses: {error}</p>
            <p className="text-gray-600">Showing default courses instead.</p>
          </div>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-5 py-8">
            {fallbackCards.map((card, index) => (
              <PricingCard
                key={index}
                {...card}
                index={index}
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7FAFF] py-8 sm:py-14 px-4 xl:px-0">
      <div className="w-full xl:w-[1320px] mx-auto">
        {/* Show carousel if more than 4 courses, otherwise show grid */}
        {cards.length > 4 ? (
          <div className="py-8">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {cards.map((card, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 xl:basis-1/5"
                  >
                    <PricingCard
                      {...card}
                      index={index}
                      onBookNow={handleBookNow}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-5 py-8">
            {cards.map((card, index) => (
              <PricingCard
                key={index}
                {...card}
                index={index}
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        )}

        <ProductDialog
          open={productDialogOpen}
          onOpenChange={setProductDialogOpen}
          data={productData}
        />
      </div>
    </div>
  );
}
