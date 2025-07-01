import Image from 'next/image';
import { FaCheck } from 'react-icons/fa6';

export default function IntensiveDrivingProgram() {
  return (
    <section className="py-14 md:py-20  bg-white px-4 xl:px-0 ">
      <div className="w-full xl:w-[1320px] mx-auto">
        <div className="flex justify-between items-center md:flex-row flex-col-reverse">
          {/* Left Side Content */}
          <div className="w-full sm:w-8/12 xl:w-[784px] font-raleway">
            <h2 className="text-24 sm:text-[48px] font-semibold text-[#1D1F2C] mb-2">
              Intensive Driving Lessons Program
            </h2>
            <p className="text-16 font-[500] sm:text-[24px] text-black mb-6">
              Get Your License in Just 1–3 Weeks!
            </p>

            {/* Program Features */}
            <div className="mb-4">
              <div
                className="flex items-center space-x-3 mb-2
              "
              >
                <div className="flex items-center justify-center w-[28px] h-[28px] rounded-full border border-[#1474FC]">
                  <FaCheck size="14" color="#1474FC" />
                </div>
                <h3 className="text-20 sm:text-[24px] font-semibold text-[#4A4C56] ">
                  Program Features
                </h3>
              </div>

              <ul className="space-y-3 ">
                <li>
                  <div className="flex items-start space-x-2">
                    <div className=" w-[8px] h-[8px] rounded-full bg-[#1A3C64] mt-2"></div>
                    <p className="w-10/12 text-16 text-[#4A4C56]">
                      <strong>Accelerated Schedule:</strong> Complete all
                      driving lessons and practice sessions in 1–3 weeks...
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex items-start space-x-2">
                    <div className=" w-[8px] h-[8px] rounded-full bg-[#1A3C64] mt-2"></div>
                    <p className="w-10/12 text-16 text-[#4A4C56]">
                      <strong>Customized Lessons:</strong> Daily lessons
                      tailored to your driving skills...
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex items-start space-x-2">
                    <div className=" w-[8px] h-[8px] rounded-full bg-[#1A3C64] mt-2"></div>
                    <p className="w-10/12 text-16 text-[#4A4C56]">
                      <strong>Expert Instructors:</strong> Learn from
                      experienced, passionate teachers guiding you every step.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex items-start space-x-2">
                    <div className=" w-[8px] h-[8px] rounded-full bg-[#1A3C64] mt-2"></div>
                    <p className="w-10/12 text-16 text-[#4A4C56]">
                      <strong>Comprehensive Training:</strong> Master all
                      driving aspects, from basic skills to advanced maneuvers.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex items-start space-x-2">
                    <div className=" w-[8px] h-[8px] rounded-full bg-[#1A3C64] mt-2"></div>
                    <p className="w-10/12 text-16 text-[#4A4C56]">
                      <strong>Flexible Timing:</strong> Evening and weekend
                      sessions to fit your schedule.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex items-start space-x-2">
                    <div className=" w-[8px] h-[8px] rounded-full bg-[#1A3C64] mt-2"></div>
                    <p className="w-10/12 text-16 text-[#4A4C56]">
                      <strong>Same Car as Trafikverket:</strong> Practice in the
                      same type of car you'll use for your driving test.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <div
                className="flex items-center space-x-3 mb-2
              "
              >
                <div className="flex items-center justify-center w-[28px] h-[28px] rounded-full border border-[#1474FC]">
                  <FaCheck size="14" color="#1474FC" />
                </div>
                <h3 className="text-20 sm:text-[24px] font-semibold text-[#4A4C56] w-10/12">
                  Why Choose Our Intensive Program?
                </h3>
              </div>
              <ul className=" space-y-3 text-gray-700">
                <li>
                  <div className="flex items-start space-x-2">
                    <div className=" w-[8px] h-[8px] rounded-full bg-[#1A3C64] mt-2"></div>
                    <p className="w-10/12 text-16 text-[#4A4C56]">
                      <strong>High Pass Rates:</strong> Exceptional pass rates
                      due to focused training.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex items-start space-x-2">
                    <div className=" w-[8px] h-[8px] rounded-full bg-[#1A3C64] mt-2"></div>
                    <p className="w-10/12 text-16 text-[#4A4C56]">
                      <strong>Central Location:</strong> Conveniently located in
                      Sodertalje, close to Trafikverket exam centers.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex items-start space-x-2">
                    <div className=" w-[8px] h-[8px] rounded-full bg-[#1A3C64] mt-2"></div>
                    <p className="w-10/12 text-16 text-[#4A4C56]">
                      <strong>Full Support:</strong> Assistance with booking
                      exam slots after completing the program.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="flex justify-center w-full sm:w-4/12  xl:w-[485px]  mb-8 xl:mb-0">
            <div className="rounded-xl overflow-hidden shadow-md">
              <Image
                src="/img/home/abs-driving.png"
                alt="ABS Trafikskola Students"
                width={500}
                height={500}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
