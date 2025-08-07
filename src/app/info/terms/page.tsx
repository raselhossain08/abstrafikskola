'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge'; // shadcn badge
import { CheckCircle } from 'lucide-react';
import { FaCheck } from 'react-icons/fa6';
import Contact from '@/components/common/Contact';
import { CloudinaryImage } from '@/hooks/useCloudinaryImages';

export default function page() {
  return (
    <>
      <section className="bg-[#F7FAFF] py-12 md:py-[80px] px-4">
        <div className="w-full xl:w-[1320px] mx-auto ">
          <div className="flex justify-between w-full items-start md:flex-row flex-col-reverse">
            {/* Left Content */}
            <div className="w-full md:w-1/2 xl:w-[648px] ">
              <h1 className="text-24 md:text-56 font-bold my-4 md:mb-10 md:mt-0 text-[#1D1F2C]">
                Terms and Conditions
              </h1>

              <div className="space-y-6">
                {/* Item */}
                <div>
                  <div className="flex space-x-2 items-center mb-2">
                    <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12">
                      <FaCheck />
                    </div>
                    <h3 className="text-18 md:text-24 text-[#4A4C56] tracking-[0.5%] leading-[140%] font-semibold ">
                      Full Payment Required
                    </h3>
                  </div>
                  <p className="text-16 tracking-[0.5%] font-normal leading-[140%]">
                    Full prices must be paid at the time of booking for all
                    driving lessons, risk training, or package deals.
                  </p>
                </div>
                <div>
                  <div className="flex space-x-2 items-center mb-2">
                    <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12">
                      <FaCheck />
                    </div>
                    <h3 className="text-18 md:text-24 text-[#4A4C56] tracking-[0.5%] leading-[140%] font-semibold ">
                      Cancellation Policy
                    </h3>
                  </div>
                  <ul className=" space-y-1">
                    <li>
                      <div className="flex items-start space-x-2">
                        <div className="dot mt-2"></div>
                        <p className="w-[632px] text-18 font-medium">
                          <strong>Driving Lessons:</strong> Cancellations must
                          be made by 13:00 the day before on weekdays, and by
                          13:00 on Friday for Monday lessons.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start space-x-2">
                        <div className="dot mt-2"></div>
                        <p className="w-[632px] text-18 font-medium">
                          <strong>Risk Training:</strong> Cancellations must be
                          made at least 2 working days in advance by 13:00.
                          Otherwise, the full price will be charged.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex space-x-2 items-center mb-2">
                    <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12">
                      <FaCheck />
                    </div>
                    <h3 className="text-18 md:text-24 text-[#4A4C56] tracking-[0.5%] leading-[140%] font-semibold ">
                      Validity and Refunds
                    </h3>
                  </div>
                  <ul className=" space-y-1">
                    <li>
                      <div className="flex items-start space-x-2">
                        <div className="dot mt-2"></div>
                        <p className=" text-18 font-medium">
                          Purchases must be used within 12 months from the
                          purchase date
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start space-x-2">
                        <div className="dot mt-2"></div>
                        <p className=" text-18 font-medium">
                          No open purchase is available for our products and
                          services.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start space-x-2">
                        <div className="dot mt-2"></div>
                        <p className=" text-18 font-medium">
                          A 20% fee will be deducted from advance payments in
                          case of refunds.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex space-x-2 items-center mb-2">
                    <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12">
                      <FaCheck />
                    </div>
                    <h3 className="text-18 md:text-24 text-[#4A4C56] tracking-[0.5%] leading-[140%] font-semibold ">
                      Instructor and Test Rights
                    </h3>
                  </div>
                  <ul className=" space-y-1">
                    <li>
                      <div className="flex items-start space-x-2">
                        <div className="dot mt-2"></div>
                        <p className=" text-18 font-medium w-[632px]">
                          We reserve the right to cancel pre-booked driving
                          tests under our school’s code if the responsible
                          instructor deems the student not competent in all
                          aspects of the training plan.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start space-x-2">
                        <div className="dot mt-2"></div>
                        <p className=" text-18 font-medium w-[632px]">
                          A medical certificate is required to cancel lessons or
                          risk training due to illness. Only certificates from a
                          doctor or health center are accepted.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex space-x-2 items-center mb-2">
                    <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12">
                      <FaCheck />
                    </div>
                    <h3 className="text-18 md:text-24 text-[#4A4C56] tracking-[0.5%] leading-[140%] font-semibold ">
                      Privacy Policy
                    </h3>
                  </div>
                  <ul className=" space-y-1">
                    <li>
                      <div className="flex items-start space-x-2">
                        <div className="dot mt-2"></div>
                        <p className=" text-18 font-medium w-[632px]">
                          We do not disclose information about students or
                          instructors without their consent.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-start space-x-2">
                        <p className=" text-18 font-medium">
                          Thank you for your understanding and cooperation.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Right Image */}
            <div className="w-full md:w-1/2 xl:w-[648px] pb-12 md:pb-0">
              <div className="h-[516px]  sm:h-[500px] p-3">
                <CloudinaryImage src="/img/terms/1.png" alt="ABS Trafikskola" width={600}
                  height={400}
                  className="rounded-[24px] w-full h-[516px] md:h-[500px] relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Contact />
    </>
  );
}
