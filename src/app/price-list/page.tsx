import Contact from '@/components/common/Contact';
import { Button } from '@/components/ui/button';
import React from 'react';
import { FaRegClock } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';
import Link from 'next/link';
import { priceContentService } from '@/services/priceContentService';

export default async function PriceListPage() {
  let priceContent;
  
  try {
    priceContent = await priceContentService.getPriceContent();
  } catch (error) {
    console.error('Failed to fetch price content:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-24 font-bold text-red-600 mb-4">
            Error Loading Price Content
          </h2>
          <p className="text-16 text-gray-600">
            Please try again later or contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white py-12 md:py-20 px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <div>
            <h2 className="text-24 sm:text-56 font-bold text-[#1D1F2C] text-center mb-4">
              {priceContent.sectionTitle}
            </h2>

            <div className="flex flex-col space-y-5 justify-center items-center">
              <Button className="bg-[#EB3D4D] hover:bg-[#EB3D4D] w-[291px] h-[46px] rounded-[100px] font-semibold text-16 leading-[140%] tracking-[0.5%] text-white">
                Our driving lesson is 50 minutes
              </Button>

              <div className="w-full md:w-[872px] text-center">
                <p className="text-16 leading-[140%] tracking-[0.5%] text-[#4A4C56]">
                  {priceContent.sectionDescription}
                </p>
              </div>
            </div>

            {priceContent.categories.map((category) => (
              <div className="w-full" key={category.name}>
                <div className="flex items-center space-x-4 py-8">
                  <div className="w-full h-[2.5px] bg-[#A7CBF7]"></div>
                  <div className="w-auto whitespace-pre">
                    <h3 className="text-[#3F8FEE] font-bold text-18 sm:text-40">
                      {category.name}
                    </h3>
                  </div>
                  <div className="w-full h-[2.5px] bg-[#A7CBF7]"></div>
                </div>

                <div className="flex flex-wrap justify-between">
                  {/* items in each category */}
                  {category.items.map((item, index) => (
                    <div
                      className="w-full sm:basis-5/12 xl:w-[588px] space-y-5 my-5"
                      key={index}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-col">
                          <h3 className="text-[#1D1F2C] font-semibold text-20 sm:text-32">
                            {item.title}
                          </h3>
                          {item.duration && (
                            <div className="flex items-center space-x-3 text-[#3F8FEE]">
                              <FaRegClock />
                              <p className="text-[#4A4C56] text-16 font-medium">
                                {item.duration}
                              </p>
                            </div>
                          )}
                        </div>
                        <h2 className="text-[#3F8FEE] text-20 sm:text-40 font-bold">
                          {item.price}
                          <sup className="text-14 font-medium tracking-[0.5%] relative -top-6">
                            {item.currency}
                          </sup>
                        </h2>
                      </div>
                      <p className="text-16 leading-[140%] tracking-[0.5%] text-[#4A4C56]">
                        {item.description}
                      </p>
                      {/* Button logic for different course types */}
                      {item.title === 'Handledarkurs' ? (
                        <Link href="/handledarkurs">
                          <Button className="border border-[#3F8FEE] rounded-[30px] h-[48px] min-w-[130px] bg-transparent flex items-center justify-center font-sansat text-14 tracking-[0.5%] leading-[140%] hover:bg-[#3F8FEE] hover:text-white has-[span]:text-blue-600">
                            <div className="flex items-center space-x-2">
                              <span>{item.buttonText}</span>
                            </div>
                          </Button>
                        </Link>
                      ) : item.title === 'Risk1 (Riskettan)' ? (
                        <Link href="/riskettan">
                          <Button className="border border-[#3F8FEE] rounded-[30px] h-[48px] min-w-[130px] bg-transparent flex items-center justify-center font-sansat text-14 tracking-[0.5%] leading-[140%] hover:bg-[#3F8FEE] hover:text-white has-[span]:text-blue-600">
                            <div className="flex items-center space-x-2">
                              <span>{item.buttonText}</span>
                            </div>
                          </Button>
                        </Link>
                      ) : (
                        <Button className="border border-[#3F8FEE] rounded-[30px] h-[48px] min-w-[130px] bg-transparent flex items-center justify-center font-sansat text-14 tracking-[0.5%] leading-[140%] hover:bg-[#3F8FEE] hover:text-white has-[span]:text-blue-600">
                          {item.isPhoneNumber ? (
                            <div className="flex items-center space-x-2">
                              <FaPhoneAlt />
                              <span>{item.buttonText}</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <span>{item.buttonText}</span>
                            </div>
                          )}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Terms and Conditions Section */}
            {priceContent.termsAndConditions && (
              <div className="flex flex-col space-y-2 my-10">
                <h3 className="text-[#1D1F2C] font-semibold text-24">
                  {priceContent.termsAndConditions.title}
                </h3>
                
                {/* Installment Info */}
                {priceContent.installmentInfo && (
                  <p className="text-16 text-black font-normal">
                    <strong className="text-28 font-bold">*</strong>
                    {priceContent.installmentInfo.description}
                  </p>
                )}

                {/* Terms Content */}
                {priceContent.termsAndConditions.content.map((term, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#3F8FEE] mt-2"></div>
                    <p className="w-11/12 font-medium text-18 text-[#4A4C56]">
                      <strong className="text-[#1D1F2C]">
                        {term.heading}:
                      </strong>{' '}
                      {term.text}
                    </p>
                  </div>
                ))}
                
                <p>Thank you for your understanding and cooperation.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Contact />
    </>
  );
}
