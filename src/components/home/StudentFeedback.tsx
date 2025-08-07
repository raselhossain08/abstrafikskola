'use client';
import { type CarouselApi } from '@/components/ui/carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { CloudinaryImage } from '@/hooks/useCloudinaryImages';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';

interface Feedback {
  name: string;
  title: string;
  image: string;
  rating: number;
  content: string;
  id: string; // Added unique identifier
}

const feedbacks: Feedback[] = [
  {
    id: '1',
    name: 'Sarah K',
    title: 'Risk2 online Student',
    image: '/img/profile/1.png',
    rating: 5,
    content:
      'I passed my driving test on the first try thanks to DriveWise! The instructors were so patient and knowledgeable.',
  },
  {
    id: '2',
    name: 'John D',
    title: 'Student online Course',
    image: '/img/profile/2.png',
    rating: 5,
    content:
      'Highly recommend DriveWise for anyone learning to drive. They make the process easy and stress-free!',
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    title: 'Student',
    image: '/img/profile/3.png',
    rating: 5,
    content:
      'I passed my driving test on the first try thanks to DriveWise! The instructors were so patient and knowledgeable.',
  },
  {
    id: '4',
    name: 'Michael T',
    title: 'Beginner Driver',
    image: '/img/profile/4.png',
    rating: 5,
    content:
      'The online course materials were incredibly helpful and easy to understand.',
  },
  {
    id: '5',
    name: 'Emma S',
    title: 'International Student',
    image: '/img/profile/5.png',
    rating: 5,
    content:
      'As an international student, I appreciated the multilingual support from the instructors.',
  },
  {
    id: '6',
    name: 'David L',
    title: 'Refresher Course',
    image: '/img/profile/6.png',
    rating: 5,
    content:
      'Great refresher course after not driving for many years. Very professional instructors.',
  },
];

export default function StudentFeedback() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="py-16 px-4 bg-white text-center student-feedback">
      <div className="w-full xl:w-[1320px] mx-auto">
        <h2 className="text-24 sm:text-[48px] font-bold mb-4 text-[#1D1F2C]">
          What Our Students Are Saying
        </h2>
        <div className="w-full md:w-[648px] mx-auto pb-12">
          <p className="text-18 sm:text-[24px] text-[#1D1F2C] mb-2 leading-[140%] font-bold tracking-[0.05%]">
            The Best Trafikskola in Stockholm!
          </p>
          <p className="text-[16px] text-[#1D1F2C] mb-2 leading-[20px] md:leading-[140%] font-normal tracking-[0.05%] text-center">
            Discover the top-rated driving school in Stockholm, renowned for its
            exceptional atmosphere, effective teaching methods, and multilingual
            trainers. Instructors are highly skilled and professional-
            <strong>Anik Akanda</strong>
          </p>
        </div>

        <div className=" ">
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full mb-8 md:px-4"
            setApi={setApi}
          >
            <CarouselContent>
              {feedbacks.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div
                    className={`${
                      current === feedbacks.indexOf(item)
                        ? 'bg-[#ECF4FD] border-[#65A5F1] shadow-[4px_6px_60px_0px_rgba(0,0,0,0.05)]'
                        : 'bg-[#ECF4FD33] border-[#E9E9EA80]'
                    } border p-6  rounded-[20px] transition-all duration-300 h-full`}
                    aria-current={
                      current === feedbacks.indexOf(item) ? 'true' : 'false'
                    }
                  >
                    <div className="flex items-center mb-4">
                      <div className="relative w-[65px] h-[65px] rounded-full overflow-hidden">
                        <Image
                          src={item.image}
                          alt={`Portrait of ${item.name}`}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 64px, 64px"
                        />
                      </div>
                      <div className="ml-3 text-left">
                        <h4 className="font-bold text-[#1D1F2C] text-18 mb-1">
                          {item.name}
                        </h4>
                        <p className="font-normal text-14 leading-[140%]">
                          {item.title}
                        </p>
                      </div>
                      <CloudinaryImage src="/icons/google.svg" alt="Google review" width={32}
                        height={32}
                        className="ml-auto w-[32px] h-[32px]"
                        aria-hidden="true"
                      />
                    </div>

                    <div
                      className="flex mb-2 space-x-1"
                      aria-label={`Rating: ${item.rating} out of 5 stars`}
                    >
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <span key={i} className="text-[#FBBC05] text-18">
                          <FaStar />
                        </span>
                      ))}
                    </div>
                    <p className="font-16 font-normal leading-[140%] text-[#4A4C56] tracking-[0.5%] text-left">
                      {item.content}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              className="text-white bg-[#3F8FEE] hover:bg-[#2D7BD6] absolute top-[50%] left-[-14px] md:left-[0px] "
              aria-label="Previous testimonial"
            />
            <CarouselNext
              className="text-white bg-[#3F8FEE] hover:bg-[#2D7BD6] absolute top-[50%] right-[-14px] md:right-[0px]"
              aria-label="Next testimonial"
            />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
