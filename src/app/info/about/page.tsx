import Contact from '@/components/common/Contact';
import Image from 'next/image';
import React from 'react';
import { FaCheck } from 'react-icons/fa';

export default function page() {
  return (
    <>
      <div className="bg-white pt-16 pb-24 px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <div className="flex items-end md:flex-row flex-col-reverse w-full">
            <div className="w-full md:w-1/2  md:pr-8">
              <h1 className=" text-[#1D1F2C] text-24 md:text-[50px] font-bold text-left mb-5">
                History of ABS Trafikskola Södertälje
              </h1>
              <div className="mb-5 text-16 tracking-[0.5%] text-[#4A4C56]">
                <div className="flex items-center space-x-3 mb-3">
                  <div className=" border-[1.5px] w-[28px] h-[28px] border-[#1474FC] rounded-full flex items-center justify-center text-12 text-[#1474FC]">
                    <FaCheck />
                  </div>
                  <h2 className=" text-[#4A4C56] font-[600] text-18 md:text-24 ">
                    Established in 2016
                  </h2>
                </div>
                <p className="">
                  ABS Trafikskola Södertälje was founded in 2016 by Alber Albirt
                  and Bchara Moussa. The name "ABS" stands for the initials of
                  the founders: 'A' for Alber and 'B' for Bchara. To avoid
                  confusion with the Swedish legal entity form "AB," they added
                  an 'S,' which signifies "Alber and Bchara's."
                </p>
              </div>

              <div className="mb-5 text-16 tracking-[0.5%] text-[#4A4C56]">
                <div className="flex items-center space-x-3 mb-3">
                  <div className=" border-[1.5px] w-[28px] h-[28px] border-[#1474FC] rounded-full flex items-center justify-center text-12 text-[#1474FC]">
                    <FaCheck />
                  </div>
                  <h2 className=" text-[#4A4C56] font-[600] text-24 ">
                    Commitment to Excellence
                  </h2>
                </div>
                <p>
                  Since our establishment, we have been dedicated to providing
                  top-notch driving instruction and safety training to the
                  community of Södertälje. Our commitment to high standards and
                  continuous improvement has made us one of the most respected
                  driving schools in the region.
                </p>
              </div>

              <div className="mb-5 text-16 tracking-[0.5%] text-[#4A4C56]">
                <div className="flex items-center space-x-3 mb-3">
                  <div className=" border-[1.5px] w-[28px] h-[28px] border-[#1474FC] rounded-full flex items-center justify-center text-12 text-[#1474FC]">
                    <FaCheck />
                  </div>
                  <h2 className=" text-[#4A4C56] font-[600] text-24 ">
                    Community Engagement
                  </h2>
                </div>
                <p>
                  We believe in giving back to the community. ABS Trafikskola
                  has been actively involved in various local initiatives aimed
                  at promoting road safety and awareness. Our community programs
                  are designed to educate young drivers and instill safe driving
                  habits from an early age.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-full">
              <div className="flex justify-end items-end h-full">
                <Image
                  src="/img/about-us/1.png"
                  alt=""
                  width={667}
                  height={426}
                  className=" md:block hidden"
                />
                <Image
                  src="/img/about-us/3.png"
                  alt=""
                  width={667}
                  height={500}
                  className=" md:hidden  block mb-10"
                />
              </div>
            </div>
          </div>

          <div className="mb-5 text-16 tracking-[0.5%] text-[#4A4C56]">
            <div className="flex items-center space-x-3 mb-3">
              <div className=" border-[1.5px] w-[28px] h-[28px] border-[#1474FC] rounded-full flex items-center justify-center text-12 text-[#1474FC]">
                <FaCheck />
              </div>
              <h2 className=" text-[#4A4C56] font-[600] text-24 ">
                Innovative Training Methods
              </h2>
            </div>
            <p>
              Throughout our history, we have embraced innovative training
              methods and technologies to enhance the learning experience. From
              the latest simulation tools to interactive classroom sessions, we
              ensure our students receive the best possible education.
            </p>
          </div>

          <div className="mb-5 text-16 tracking-[0.5%] text-[#4A4C56]">
            <div className="flex items-center space-x-3 mb-3">
              <div className=" border-[1.5px] w-[28px] h-[28px] border-[#1474FC] rounded-full flex items-center justify-center text-12 text-[#1474FC]">
                <FaCheck />
              </div>
              <h2 className=" text-[#4A4C56] font-[600] text-24 ">
                High Pass Rates
              </h2>
            </div>
            <p>
              Our focus on quality instruction and personalized learning has
              resulted in consistently high pass rates. We take pride in the
              success of our students and their positive feedback, which drives
              us to maintain our high standards.
            </p>
          </div>
          <div className="mb-5 text-16 tracking-[0.5%] text-[#4A4C56]">
            <div className="flex items-center space-x-3 mb-3">
              <div className=" border-[1.5px] w-[28px] h-[28px] border-[#1474FC] rounded-full flex items-center justify-center text-12 text-[#1474FC]">
                <FaCheck />
              </div>
              <h2 className=" text-[#4A4C56] font-[600] text-24 ">
                Future Vision
              </h2>
            </div>
            <p>
              As we look to the future, ABS Trafikskola Södertälje remains
              committed to evolving with the changing landscape of driver
              education. We continue to seek new ways to improve our services
              and ensure that our students are well-prepared for the challenges
              of modern driving.
            </p>
          </div>

          <div className=" flex items-end md:flex-row flex-col">
            <div className="w-full md:w-1/2 h-full">
              <div className="flex  items-end h-full">
                <Image
                  src="/img/about-us/2.png"
                  alt=""
                  width={608}
                  height={500}
                  className=" md:block hidden"
                />
                <Image
                  src="/img/about-us/4.png"
                  alt=""
                  width={608}
                  height={500}
                  className=" md:hidden block my-8"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 pr-8">
              <h1 className=" text-[#1D1F2C] text-24 md:text-[50px] font-bold text-left mb-5">
                What We Do
              </h1>
              <div className="mb-5">
                <div className="flex items-center space-x-3 mb-3">
                  <div className=" border-[1.5px] w-[28px] h-[28px] border-[#1474FC] rounded-full flex items-center justify-center text-12 text-[#1474FC]">
                    <FaCheck />
                  </div>
                  <h2 className=" text-[#4A4C56] font-[600] text-18 md:text-24 ">
                    Driving Lessons
                  </h2>
                </div>
                <p>
                  At ABS Trafikskola, we provide high-quality driving lessons
                  tailored to meet the needs of each student. Our experienced
                  instructors focus on building confidence and developing the
                  skills necessary for safe driving. Whether you're a beginner
                  or looking to brush up on your driving skills, we have the
                  right program for you.
                </p>
              </div>

              <div className="mb-5">
                <div className="flex items-center space-x-3 mb-3">
                  <div className=" border-[1.5px] w-[28px] h-[28px] border-[#1474FC] rounded-full flex items-center justify-center text-12 text-[#1474FC]">
                    <FaCheck />
                  </div>
                  <h2 className=" text-[#4A4C56] font-[600] text-18 md:text-24 ">
                    Risk 1 and Risk 2 Training
                  </h2>
                </div>
                <p>
                  We offer comprehensive Risk 1 and Risk 2 (Halkbana) courses
                  that cover all mandatory aspects of driver safety education.
                  These courses are crucial for understanding the risks
                  associated with driving and how to handle hazardous
                  conditions.
                </p>
              </div>

              <div className="mb-5">
                <div className="flex items-center space-x-3 mb-3">
                  <div className=" border-[1.5px] w-[28px] h-[28px] border-[#1474FC] rounded-full flex items-center justify-center text-12 text-[#1474FC]">
                    <FaCheck />
                  </div>
                  <h2 className=" text-[#4A4C56] font-[600] text-18 md:text-24 ">
                    Introduktion Utbildning (Handleadrkurs)
                  </h2>
                </div>
                <p>
                  Our introductory course for private driving lessons is
                  designed to provide the foundational knowledge required for
                  safe driving. This mandatory course ensures that both the
                  learner and the supervising driver are well-prepared for the
                  road.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-5 text-16 tracking-[0.5%] text-[#4A4C56]">
            <div className="flex items-center space-x-3 mb-3">
              <div className=" border-[1.5px] w-[28px] h-[28px] border-[#1474FC] rounded-full flex items-center justify-center text-12 text-[#1474FC]">
                <FaCheck />
              </div>
              <h2 className=" text-[#4A4C56] font-[600] text-18 md:text-24">
                Theory Lessons
              </h2>
            </div>
            <p>
              We provide thorough theory lessons to prepare you for the written
              driving test. Our instructors cover all essential topics and offer
              insights that help you understand and retain the information
              effectively.
            </p>
          </div>

          <div className="mb-5 text-16 tracking-[0.5%] text-[#4A4C56]">
            <div className="flex items-center space-x-3 mb-3">
              <div className=" border-[1.5px] w-[28px] h-[28px] border-[#1474FC] rounded-full flex items-center justify-center text-12 text-[#1474FC]">
                <FaCheck />
              </div>
              <h2 className=" text-[#4A4C56] font-[600] text-18 md:text-24 ">
                Eye Tests for Learner's Permit
              </h2>
            </div>
            <p>
              Get your eye test done conveniently at our school to ensure you
              meet the vision requirements for obtaining a learner's permit.
            </p>
          </div>
          <div className="mb-5 text-16 tracking-[0.5%] text-[#4A4C56]">
            <div className="flex items-center space-x-3 mb-3">
              <div className=" border-[1.5px] w-[28px] h-[28px] border-[#1474FC] rounded-full flex items-center justify-center text-12 text-[#1474FC]">
                <FaCheck />
              </div>
              <h2 className=" text-[#4A4C56] font-[600] text-18 md:text-24">
                Taxi Driving Lessons
              </h2>
            </div>
            <p>
              For those aspiring to become professional taxi drivers, we offer
              specialized training programs that cover all necessary skills and
              knowledge.
            </p>
          </div>
        </div>
      </div>
      <Contact />
    </>
  );
}
