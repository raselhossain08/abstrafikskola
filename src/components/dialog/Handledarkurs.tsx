import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { FaEdit } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

interface HandledarkursItem {
  date: string;
  time: string;
  title: string;
  seats: string;
  price: string;
}

interface HandledarkursProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: HandledarkursItem;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .matches(/^[a-zA-Z]+$/, 'Only letters are allowed'),
  lastName: Yup.string()
    .required('Last name is required')
    .matches(/^[a-zA-Z]+$/, 'Only letters are allowed'),
  personNumber: Yup.string()
    .required('Person number is required')
    .matches(/^\d+$/, 'Only numbers are allowed'),
  mobile: Yup.string()
    .required('Mobile number is required')
    .matches(/^\+?[0-9]+$/, 'Invalid phone number'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export function Handledarkurs({
  open,
  onOpenChange,
  data,
}: HandledarkursProps) {
  const { date, time, title, seats, price } = data;
  if (!data) return null;
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      personNumber: '',
      mobile: '',
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (isConfirmed) {
        // Handle final submission
        setIsSubmitting(true);
        console.log('Final submission:', values);
        // Add your API call or final submission logic here
        // Then reset the form and close the dialog
        formik.resetForm();
        setIsConfirmed(false);
        setIsSubmitting(false);
        onOpenChange(false);
      } else {
        // First submission (preview)
        setIsConfirmed(true);
      }
    },
  });

  const handleEdit = () => {
    setIsConfirmed(false);
  };

  const handleBack = () => {
    if (isConfirmed) {
      setIsConfirmed(false);
    } else {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-[80%] overflow-y-auto max-h-[100vh] xl:max-w-[1320px] md:px-[32px] py-[100px] bg-white">
        <div className="w-full h-full relative">
          <div className="flex items-center mb-5">
            <Image src="/logo.svg" alt="" width={75} height={35} />
            <p>Booking Information</p>
          </div>
          {/* Desktop version */}
          <div
            className="hidden xl:flex items-center justify-between bg-white border border-[#FFFFFF] py-[9px] px-[24px] rounded-[8px]"
            style={{ boxShadow: '0px 4px 35px 0px #0000001A' }}
          >
            <div className="flex items-center space-x-2">
              <Image
                src="/icons/calendar.svg"
                height={19.5}
                width={19.5}
                alt="calendar"
              />
              <p className="text-[#4A4C56] font-medium text-16">{date}</p>
            </div>

            <div className="flex items-center space-x-2">
              <Image
                src="/icons/watch.svg"
                height={19.5}
                width={19.5}
                alt="clock"
              />
              <p className="text-[#4A4C56] font-medium text-16">{time}</p>
            </div>

            <div className="flex items-center space-x-2">
              <h2 className="text-24 font-bold tracking-[0.5%] text-[#1D1F2C]">
                {title}
              </h2>
            </div>

            <div className="flex items-center bg-[#ECF4FD80] border border-[#ECF4FD] px-[16px] py-[6px] space-x-3 rounded-[30px] text-[#3F8FEE]">
              <Image
                src="/icons/like.svg"
                height={19.5}
                width={19.5}
                alt="seats"
              />
              <span>&gt; {seats}</span>
            </div>

            <div>
              <h1 className="text-40 font-bold text-[#3F8FEE]">{price}</h1>
            </div>

            <div>
              <Button
                type="button"
                className="border border-[#3F8FEE] rounded-[30px] h-[48px] min-w-[130px] bg-[#3F8FEE] flex items-center justify-center font-sansat text-14 tracking-[0.5%] leading-[140%] hover:bg-[#3F8FEE] text-white"
              >
                Book
              </Button>
            </div>
          </div>

          {/* Mobile version */}
          <div
            className="block xl:hidden bg-white border border-[#FFFFFF] py-[10px] px-[24px] rounded-[8px] mb-5"
            style={{ boxShadow: '0px 4px 35px 0px #0000001A' }}
          >
            <div className="flex items-center justify-between">
              <div className="w-8/12 space-y-3">
                <div className="flex items-center space-x-2">
                  <h2 className="text-16 font-bold tracking-[0.5%] text-[#1D1F2C]">
                    {title}
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <Image
                    src="/icons/calendar.svg"
                    height={19.5}
                    width={19.5}
                    alt="calendar"
                  />
                  <p className="text-[#4A4C56] font-medium text-12">{date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Image
                    src="/icons/watch.svg"
                    height={19.5}
                    width={19.5}
                    alt="clock"
                  />
                  <p className="text-[#4A4C56] font-medium text-12">{time}</p>
                </div>
                <div className="inline-flex items-center bg-[#ECF4FD80] border border-[#ECF4FD] px-[16px] py-[6px] space-x-3 rounded-[30px] text-[#3F8FEE]">
                  <Image
                    src="/icons/like.svg"
                    height={19.5}
                    width={19.5}
                    alt="seats"
                  />
                  <span className="text-12">&gt; {seats}</span>
                </div>
              </div>
              <div className="flex flex-col justify-evenly items-center space-y-8">
                <div>
                  <h1 className="text-18 font-bold text-[#3F8FEE]">{price}</h1>
                </div>
                <div>
                  <Button
                    type="button"
                    className="border border-[#3F8FEE] rounded-[30px] h-[32px] min-w-[100px] bg-[#3F8FEE] flex items-center justify-center font-sansat text-14 tracking-[0.5%] leading-[140%] hover:bg-[#3F8FEE] text-white"
                  >
                    Book
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-8">
            <div>
              <Image src="/img/1.png" alt="" width={596} height={413} />
            </div>
            <div>
              <div className="bg-[#F7FAFF] border border-[#ECF4FD] p-6 rounded-[16px]">
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <div>
                    <Label
                      htmlFor="firstName"
                      className="block text-18 font-medium text-[#4A4C56] mb-2"
                    >
                      First Name*
                    </Label>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      className="w-full px-4 py-2 rounded-full border border-[#E9E9EA80] outline-none bg-white h-[45px] font-16 font-medium text-[#777980] focus:ring-0 focus:ring-transparent"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                      disabled={isConfirmed}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.firstName}
                      </div>
                    )}
                  </div>

                  {/* Other form fields with the same pattern... */}
                  <div>
                    <Label
                      htmlFor="lastName"
                      className="block text-18 font-medium text-[#4A4C56] mb-2"
                    >
                      Last Name*
                    </Label>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      className="w-full px-4 py-2 rounded-full border border-[#E9E9EA80] outline-none bg-white h-[45px] font-16 font-medium text-[#777980] focus:ring-0 focus:ring-transparent"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                      disabled={isConfirmed}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.lastName}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="personNumber"
                      className="block text-18 font-medium text-[#4A4C56] mb-2"
                    >
                      Person Number*
                    </Label>
                    <Input
                      type="text"
                      id="personNumber"
                      name="personNumber"
                      placeholder="123456789"
                      className="w-full px-4 py-2 rounded-full border border-[#E9E9EA80] outline-none bg-white h-[45px] font-16 font-medium text-[#777980] focus:ring-0 focus:ring-transparent"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.personNumber}
                      disabled={isConfirmed}
                    />
                    {formik.touched.personNumber &&
                      formik.errors.personNumber && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.personNumber}
                        </div>
                      )}
                  </div>

                  <div>
                    <Label
                      htmlFor="mobile"
                      className="block text-18 font-medium text-[#4A4C56] mb-2"
                    >
                      Mobile*
                    </Label>
                    <Input
                      type="text"
                      id="mobile"
                      name="mobile"
                      placeholder="+1234567890"
                      className="w-full px-4 py-2 rounded-full border border-[#E9E9EA80] outline-none bg-white h-[45px] font-16 font-medium text-[#777980] focus:ring-0 focus:ring-transparent"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.mobile}
                      disabled={isConfirmed}
                    />
                    {formik.touched.mobile && formik.errors.mobile && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.mobile}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="block text-18 font-medium text-[#4A4C56] mb-2"
                    >
                      Email*
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="example@example.com"
                      className="w-full px-4 py-2 rounded-full border border-[#E9E9EA80] outline-none bg-white h-[45px] font-16 font-medium text-[#777980] focus:ring-0 focus:ring-transparent"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      disabled={isConfirmed}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-4 bg-[#3F8FEE] h-[48px] text-16 font-medium text-white py-2 rounded-full text-center"
                    disabled={isSubmitting || !formik.isValid}
                  >
                    {isConfirmed ? 'Confirm' : 'Preview'}
                  </Button>
                </form>
              </div>
            </div>
          </div>

          <div className="absolute left-0 -bottom-20 md:-bottom-7 flex items-center space-x-3">
            <Button
              type="button"
              className="bg-[#3F8FEE] rounded-[30px] h-[48px] w-[130px] text-14 font-medium has-[span]:text-white hover:bg-[#3F8FEE]"
              onClick={handleBack}
            >
              <IoIosArrowBack />
              <span>Back</span>
            </Button>
            {isConfirmed && (
              <Button
                type="button"
                className="bg-[#3F8FEE] rounded-[30px] h-[50.75px] w-[50.75px] hover:bg-[#3F8FEE] flex items-center justify-center p-0"
                onClick={handleEdit}
              >
                <FaEdit color="#fff" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
