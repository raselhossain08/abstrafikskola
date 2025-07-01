import Image from 'next/image';
import React from 'react';
import { FaCheck } from 'react-icons/fa6';

export default function page() {
  return (
    <div>
      <div className="bg-[#F7FAFF] py-16 xl:py-[120px] px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <h1 className="text-24 sm:text-56 font-bold  text-[#1D1F2C] leading-[140%] text-center pb-5">
            Halkbana Schedule and Prices
          </h1>
          <div className="w-full md:w-[872px] mx-auto pb-10">
            <p className=" text-16 leading-[140%] text-center font-normal text-[#4A4C56]">
              Riskettan (Risk 1) training covers crucial aspects of road safety
              and traffic behavior, essential for obtaining your Swedish driving
              license. We offer flexible online schedules to fit your busy life,
              and competitive prices to ensure you get the best value. Enroll
              now and start your journey towards a safer driving experience.
            </p>
          </div>
        </div>
      </div>

      <div className=" bg-white py-16 xl:py-[120px] px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <h1 className="text-24 md:text-35 font-[600]  text-[#1D1F2C] leading-[100%]  pb-5">
            Risk2 Course at ABS Trafikskola Södertälje 🚧❄️
          </h1>
          <p className="text-20 md:text-30 font-[500]  text-[#1D1F2C] leading-[100%]  pb-3">
            Master the challenges of driving in difficult conditions with our
            Risk2 course!
          </p>
          <p className="text-16 font-[400]  text-[#000000] leading-[140%] tracking-[0.5%]   w-11/12 pb-10">
            The Risk2 course for category B at ABS Trafikskola Södertälje is
            centered around understanding and handling the difficulties of
            driving on slippery surfaces and other challenging conditions. The
            aim is to enhance the understanding of the relationship between
            accident risks, speed, road conditions, and the importance of
            protective equipment.
          </p>
          <div className="flex justify-between items-center pb-12 md:flex-row  flex-col-reverse">
            <div className="w-full md:w-[633px]">
              <ul className="space-y-2 text-18 font-medium text-[#4A4C56] mb-8">
                <li className="flex items-start ">
                  <span className=" mr-2 w-2 h-2 rounded-full bg-[#08316A] mt-2" />
                  <p className="w-11/12">
                    <strong> Safe Driving :</strong>
                    <span>
                       Learn the importance of adjusting speed and driving with
                      safety margins.
                    </span>
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mt-2 mr-2 w-2 h-2 rounded-full bg-[#08316A]" />
                  <span></span>
                  <p className="w-11/12">
                    <strong> Risk Awareness</strong>
                    <span>
                       Learn the importance of adjusting speed and driving with
                      safety margins.
                    </span>
                  </p>
                </li>
              </ul>
              <h2 className="text-32 font-medium mb-6 text-[#1D1F2C]">
                Course Content
              </h2>

              <ul className="space-y-2 text-18 font-medium text-[#4A4C56] mb-8">
                <li className="flex items-start ">
                  <span className=" mr-2 w-2 h-2 rounded-full bg-[#08316A] mt-2" />
                  <p className="w-11/12">
                    Practical exercises on slippery surfaces.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mt-2 mr-2 w-2 h-2 rounded-full bg-[#08316A]" />
                  <span></span>
                  <p className="w-11/12">
                    Reflection and discussion on experiences and driving
                    abilities.
                  </p>
                </li>
              </ul>
              <h3 className=" font-bold text-18 text-black">
                Course Duration and Reporting:
              </h3>
              <p className=" font-normal text-16 text-[#4A4C56] tracking-[0.5%] py-3">
                Approximately 3 hours of practical training. No paper
                certificates issued, reporting to Transportstyrelsen within 24
                hours.
              </p>
              <p className=" font-normal text-16 text-[#4A4C56] tracking-[0.5%]">
                For more information, visit
                <span className=" text-[#3F8FEE] ">
                  Transportstyrelsen's website..
                </span>
              </p>
            </div>
            <div className=" w-full md:w-[633px] mb-5 md:mb-0">
              <div className="flex w-full justify-between space-x-5">
                <div className=" flex flex-col justify-between">
                  <Image
                    src="/img/product/1.png"
                    width={300}
                    height={200}
                    alt="p1"
                    className="w-[300px] h-[190px] rounded-[22px] object-cover"
                  />
                  <Image
                    src="/img/product/2.png"
                    width={300}
                    height={200}
                    alt="p1"
                    className="w-[300px] h-[190px] rounded-[22px] object-cover"
                  />
                </div>
                <div className="">
                  <Image
                    src="/img/product/3.png"
                    width={300}
                    height={200}
                    alt="p1"
                    className="w-[300px] h-[407px] rounded-[22px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
