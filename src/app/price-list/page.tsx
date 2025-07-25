'use client';
import Contact from '@/components/common/Contact';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { FaRegClock } from 'react-icons/fa6';
import { pricingData } from '@/data/pricingData';
import { FaPhoneAlt } from 'react-icons/fa';
import { ProductDialog } from '@/components/dialog/ProductDialog';

type ProductItem = {
  date: string;
  time: string;
  title: string;
  seats: string;
  price: string;
};

export default function PriceListPage() {
  const categories = [...new Set(pricingData.map((item) => item.category))];

  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [productData, setProductData] = useState<ProductItem>({
    date: '2024-03-20 Wednesday',
    time: '17:00 - 20:15',
    title: 'Handledarkurs [Svenska]',
    seats: '5 seats available',
    price: '299 kr',
  });

  const handleBookOnline = (title: string, price: number) => {
    // Update product data based on the selected course
    const courseData: ProductItem = {
      date: '2024-03-20 Wednesday',
      time: '17:00 - 20:15',
      title:
        title === 'Handledarkurs'
          ? 'Handledarkurs [Svenska]'
          : title === 'Risk1 (Riskettan)'
            ? 'Risk1 [Svenska]'
            : title,
      seats: '5 seats available',
      price: `${price} kr`,
    };

    setProductData(courseData);
    setProductDialogOpen(true);
  };

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
            {categories.map((category) => (
              <div className="w-full " key={category}>
                <div className="flex items-center space-x-4 py-8">
                  <div className="w-full h-[2.5px] bg-[#A7CBF7]"></div>
                  <div className="w-auto  whitespace-pre">
                    <h3 className="text-[#3F8FEE] font-bold text-18 sm:text-40">
                      {category}
                    </h3>
                  </div>
                  <div className="w-full h-[2.5px] bg-[#A7CBF7]"></div>
                </div>

                <div className="flex flex-wrap  justify-between">
                  {/* items in each category */}
                  {pricingData
                    .filter((item) => item.category === category)
                    .map((item, index) => (
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
                        <Button
                          onClick={() => {
                            if (!item.isNumber) {
                              handleBookOnline(item.title, item.price);
                            }
                          }}
                          className=" border border-[#3F8FEE] rounded-[30px] h-[48px] min-w-[130px] bg-transparent  flex items-center justify-center font-sansat text-14 tracking-[0.5%] leading-[140%] hover:bg-[#3F8FEE] hover:text-white has-[span]:text-blue-600 
                        "
                        >
                          {item.isNumber ? (
                            <div className="flex items-center space-x-2">
                              <FaPhoneAlt />
                              <span>{item.btn}</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <span>{item.btn}</span>
                            </div>
                          )}
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            ))}

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
