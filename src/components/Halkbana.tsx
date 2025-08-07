import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import { FaCheck } from 'react-icons/fa6';
import { CloudinaryImage } from '@/hooks/useCloudinaryImages';

export default function Habana() {
  return (
    <div>
      <div className="bg-[#F7FAFF] py-[120px]">
        <div className=" w-[1320px] mx-auto">
          <h1 className="text-56 font-bold  text-[#1D1F2C] leading-[140%] text-center pb-5">
            Halkbana Schedule and Prices
          </h1>
          <div className="w-[872px] mx-auto pb-10">
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

      <div className=" bg-white py-[120px]">
        <div className=" w-[1320px] mx-auto">
          <h1 className="text-35 font-[600]  text-[#1D1F2C] leading-[100%]  pb-5">
            Risk2 Course at ABS Trafikskola Södertälje 🚧❄️
          </h1>
          <p className="text-30 font-[500]  text-[#1D1F2C] leading-[100%]  pb-3">
            Master the challenges of driving in difficult conditions with our
            Risk2 course!
          </p>
          <p className="text-16 font-[400]  text-[#000000] leading-[140%] tracking-[0.5%]  pb-3 w-11/12 pb-10">
            The Risk2 course for category B at ABS Trafikskola Södertälje is
            centered around understanding and handling the difficulties of
            driving on slippery surfaces and other challenging conditions. The
            aim is to enhance the understanding of the relationship between
            accident risks, speed, road conditions, and the importance of
            protective equipment.
          </p>
          <div className="flex justify-between items-center pb-12">
            <div className="w-[633px]">
              <ul className="space-y-2 text-18 font-bold text-[#4A4C56] mb-8">
                <li className="flex items-start ">
                  <span className="mt-1 mr-2 w-2 h-2 rounded-full bg-[#08316A]" />
                  <strong> Safe Driving :</strong>
                  <span>
                     Learn the importance of adjusting speed and driving with
                    safety margins.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="mt-1 mr-2 w-2 h-2 rounded-full bg-[#08316A]" />
                  <span>Risk Awareness</span>
                </li>
                <li className="flex items-center">
                  <span className="mt-1 mr-2 w-2 h-2 rounded-full bg-[#08316A]" />
                  <span>Practical Driving Tips</span>
                </li>
                <li className="flex items-center">
                  <span className="mt-1 mr-2 w-2 h-2 rounded-full bg-[#08316A]" />
                  <span>First Aid and Emergency Preparedness</span>
                </li>
              </ul>
              <div className="flex space-x-4 items-start mb-4">
                <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12 mt-2">
                  <FaCheck />
                </div>
                <div className=" w-11/12 space-y-1">
                  <h3 className=" text-18 text-[#1D1F2C] tracking-[0.5%] leading-[140%] font-semibold ">
                    For the Student
                  </h3>
                  <p className="text-16 font-normal leading-[140%] tracking-[0.5%] text-black">
                    Understand basic traffic rules, increase awareness of risks
                    on the road, and prepare for real-world driving.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4 items-start mb-2">
                <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12 mt-2">
                  <FaCheck />
                </div>
                <div className=" w-11/12 space-y-1">
                  <h3 className=" text-18 text-[#1D1F2C] tracking-[0.5%] leading-[140%] font-semibold ">
                    For the Instructor 
                  </h3>
                  <p className="text-16 font-normal leading-[140%] tracking-[0.5%] text-black">
                    Update knowledge on current driving laws, learn effective
                    teaching methods, and become certified to instruct
                    privately.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[633px]">
              <div className="flex w-full justify-between">
                <div className=" flex flex-col justify-between">
                  <CloudinaryImage
                    src="/img/product/1.png"
                    width={300}
                    height={200}
                    alt="p1"
                    className="w-[300px] h-[190px] rounded-[22px] object-cover"
                  />
                  <CloudinaryImage
                    src="/img/product/2.png"
                    width={300}
                    height={200}
                    alt="p1"
                    className="w-[300px] h-[190px] rounded-[22px] object-cover"
                  />
                </div>
                <div className="">
                  <CloudinaryImage
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

          <h2 className="text-32 font-medium mb-6 text-[#1D1F2C]">
            Course Content
          </h2>

          <div className="space-y-4 ">
            <div>
              <strong className="block text-[#000000] mb-1 text-18 font-bold leading-[26px]">
                Who Should Participate?
              </strong>
              <p className=" text-[#4A4C56] leading-[140%] text-16 font-normal tracking-[0.5%]">
                Anyone planning to learn to drive privately - both students and
                their private instructors. The course is crucial to ensure a
                safe and informed driving experience for all involved.
              </p>
            </div>

            <div>
              <strong className="block text-[#000000] mb-1 text-18 font-bold leading-[26px]">
                Book Your Spot Today!
              </strong>
              <p className=" text-[#4A4C56] leading-[140%] text-16 font-normal tracking-[0.5%]">
                Contact us to secure your place in our next Introduction Course.
                Don’t wait – spaces fill up quickly!
              </p>
            </div>

            <p className=" text-[#4A4C56] leading-[140%] text-16 font-normal tracking-[0.5%]">
              For more information on supervision and practice driving, visit
              Transportstyrelsen’s website.
            </p>

            <p className=" text-[#4A4C56] leading-[140%] text-16 font-normal tracking-[0.5%]">
              Remember, a good start is half the journey! We look forward to
              welcoming you to ABS Trafikskola Södertälje. 🚗🎉
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
