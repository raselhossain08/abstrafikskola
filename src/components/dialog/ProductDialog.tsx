import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { FaEdit } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import {
  bookingAPI,
  scheduleAPI,
  type BookingData,
  type Schedule,
} from '@/lib/api';
interface ProductItem {
  date: string;
  time: string;
  title: string;
  seats: string;
  price: string;
  description?: string;
  courseId?: string; // Add courseId to the interface
  scheduleId?: string; // Add scheduleId for booking
}

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: ProductItem | null;
}

export function ProductDialog({
  open,
  onOpenChange,
  data,
}: ProductDialogProps) {
  if (!data) return null;

  const { date, time, title, seats, price, description, courseId, scheduleId } =
    data;
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loadingSchedules, setLoadingSchedules] = useState(false);

  // Validation schema - no need for scheduleId validation as it's auto-selected
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

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      personNumber: '',
      mobile: '',
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      // Get valid schedule ID
      const selectedScheduleId =
        scheduleId || (schedules.length > 0 ? schedules[0].scheduleId : null);

      // Validate that we have a valid schedule ID before proceeding
      if (!selectedScheduleId) {
        alert(
          'Error: No valid schedule found for this course. Cannot proceed with booking.'
        );
        return;
      }

      if (isConfirmed) {
        // Handle final submission
        setIsSubmitting(true);

        try {
          // Extract price number from price string (e.g., "299 kr" -> 299)
          const priceNumber = parseInt(price.replace(/[^0-9]/g, '')) || 0;

          const bookingData: BookingData = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            mobile: values.mobile,
            personNumber: values.personNumber,
            courseTitle: title,
            coursePrice: priceNumber,
            scheduleId: selectedScheduleId, // Always include scheduleId (required)
          };

          const response = await bookingAPI.create(bookingData);

          if (response.success) {
            setIsSuccess(true);
            setSuccessMessage(
              response.message ||
                'Booking created successfully! We will contact you soon.'
            );
            // Reset form after successful submission
            formik.resetForm();
            setIsConfirmed(false);
          } else {
            alert('Error: ' + (response.message || 'Failed to create booking'));
          }
        } catch (error) {
          console.error('Booking submission error:', error);
          alert('Error: Failed to submit booking. Please try again.');
        } finally {
          setIsSubmitting(false);
        }
      } else {
        // First submission (preview)
        setIsConfirmed(true);
      }
    },
  });

  // Fetch schedules when dialog opens using course title
  useEffect(() => {
    const fetchSchedules = async () => {
      if (!title || !open) {
        setSchedules([]);
        return;
      }

      setLoadingSchedules(true);
      try {
        // Try to get schedules by course title first
        const response = await scheduleAPI.getByTitle(title);
        if (response.success && response.data) {
          setSchedules(response.data);
        } else {
          console.error('No schedules found for course title:', title);
          setSchedules([]);
        }
      } catch (error) {
        console.error('Error fetching schedules:', error);
        setSchedules([]);
      } finally {
        setLoadingSchedules(false);
      }
    };

    fetchSchedules();
  }, [title, open]);

  // Helper function to check if we have a valid schedule
  const hasValidSchedule = () => {
    const selectedScheduleId =
      scheduleId || (schedules.length > 0 ? schedules[0].scheduleId : null);
    return !!selectedScheduleId;
  };
  const handleEdit = () => {
    setIsConfirmed(false);
    setIsSuccess(false);
  };

  const handleBack = () => {
    if (isSuccess) {
      // Close dialog and reset states when coming from success
      setIsSuccess(false);
      setIsConfirmed(false);
      onOpenChange(false);
    } else if (isConfirmed) {
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
              <h2 className="text-22 font-bold tracking-[0.5%] text-[#1D1F2C]">
                {title}
              </h2>
            </div>

            {description && (
              <div className="max-w-[200px]">
                <p
                  className="text-14 text-[#4A4C56] truncate"
                  title={description}
                >
                  {description}
                </p>
              </div>
            )}

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
              <h1 className="text-35 font-bold text-[#3F8FEE]">{price}</h1>
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
                {description && (
                  <div>
                    <p
                      className="text-12 text-[#4A4C56] overflow-hidden"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                      title={description}
                    >
                      {description}
                    </p>
                  </div>
                )}
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
                {isSuccess ? (
                  // Success message display
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-20 font-bold text-[#1D1F2C] mb-2">
                        Booking Successful!
                      </h3>
                      <p className="text-16 text-[#4A4C56] mb-4">
                        {successMessage}
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <p className="text-14 text-[#4A4C56]">
                          <strong>Course:</strong> {title}
                        </p>
                        <p className="text-14 text-[#4A4C56]">
                          <strong>Customer:</strong> {formik.values.firstName}{' '}
                          {formik.values.lastName}
                        </p>
                        <p className="text-14 text-[#4A4C56]">
                          <strong>Email:</strong> {formik.values.email}
                        </p>
                        <p className="text-14 text-[#4A4C56]">
                          <strong>Schedule ID:</strong>{' '}
                          {scheduleId ||
                            (schedules.length > 0
                              ? schedules[0].scheduleId
                              : 'N/A')}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular form display
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

                    {/* Schedule validation warning */}
                    {!hasValidSchedule() && !loadingSchedules && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <p className="text-red-600 text-14">
                          ⚠️ No valid schedule found for this course. Booking is
                          not available at this time.
                        </p>
                      </div>
                    )}

                    {loadingSchedules && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <p className="text-blue-600 text-14">
                          🔄 Loading schedule information...
                        </p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full mt-4 bg-[#3F8FEE] h-[48px] text-16 font-medium text-white py-2 rounded-full text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={
                        isSubmitting ||
                        !formik.isValid ||
                        !hasValidSchedule() ||
                        loadingSchedules
                      }
                    >
                      {loadingSchedules
                        ? 'Loading...'
                        : !hasValidSchedule()
                          ? 'No Schedule Available'
                          : isConfirmed
                            ? 'Confirm'
                            : 'Preview'}
                    </Button>
                  </form>
                )}
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
              <span>{isSuccess ? 'Close' : 'Back'}</span>
            </Button>
            {isConfirmed && !isSuccess && (
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
