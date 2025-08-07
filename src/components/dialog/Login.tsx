import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { IoEye } from 'react-icons/io5';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CloudinaryImage } from '@/hooks/useCloudinaryImages';

interface LoginProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OTP_LENGTH = 7;

type OtpGroupProps = {
  value: string[];
  onChange: (value: string[]) => void;
  onComplete: (value: string) => void;
};

const OtpGroup = ({ value, onChange, onComplete }: OtpGroupProps) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (digit: string, index: number) => {
    if (!/^[0-9]?$/.test(digit)) return;

    const newOtp = [...value];
    newOtp[index] = digit;
    onChange(newOtp);

    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newOtp.every((d) => d !== '')) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-4">
      {value.map((digit, index) => (
        <div
          key={index}
          className={`border border-transparent overflow-hidden rounded-[20px] ${
            document.activeElement === inputsRef.current[index]
              ? 'active-otp'
              : ''
          }`}
        >
          <input
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="mx-[.8px] w-[80px] h-[80px] rounded-[20px] text-center text-40 font-medium bg-white text-[#070707] border border-[#DDDDDD]"
          />
        </div>
      ))}
    </div>
  );
};

const LoginContent = ({
  setActiveTab,
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  interface LoginFormValues {
    email: string;
    password: string;
  }

  interface FormikLoginConfig {
    initialValues: LoginFormValues;
    validationSchema: Yup.ObjectSchema<{
      email: string;
      password: string;
    }>;
    onSubmit: (values: LoginFormValues) => void;
  }

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: (values: LoginFormValues) => {
      // Handle login logic here
      console.log(values);
      setActiveTab('verify');
    },
  });

  return (
    <>
      <div className="flex justify-center items-center flex-col mb-5 text-center">
        <CloudinaryImage src="/img/logo.svg" alt=" " height={101} width={218} />
        <h1 className="text-[#1D1F2C] text-24 md:text-40 font-semibold">
          Welcome To
        </h1>
        <p className="text-[#4A4C56] text-16 font-normal">
          Please provide how we can contact you and your requirements.
        </p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label
              htmlFor="email"
              className="font-medium text-18 text-[#1D1F2C]"
            >
              Email
            </Label>
            <div className="relative">
              <div className="absolute top-0 left-0 h-full flex items-center justify-center px-3">
                <CloudinaryImage src="/icons/login/Message.svg" alt="Message" width={20}
                  height={18}
                />
              </div>
              <Input
                id="email"
                name="email"
                placeholder="Enter Your Email"
                className="ps-10 border border-[#E9E9EA] rounded-[30px] h-[48px] text-[#777980] font-medium text-14 bg-white"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="grid gap-3">
            <Label
              htmlFor="password"
              className="font-medium text-18 text-[#1D1F2C]"
            >
              Password
            </Label>
            <div className="relative">
              <div className="absolute top-0 left-0 h-full flex items-center justify-center px-3">
                <CloudinaryImage src="/icons/login/Lock.svg" alt="Message" width={20}
                  height={18}
                />
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Type Here"
                className="ps-10 border border-[#E9E9EA] rounded-[30px] h-[48px] text-[#777980] font-medium text-14 bg-white"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <div className="absolute top-0 right-0 flex items-center justify-center h-full">
                <Button
                  variant="ghost"
                  className="hover:bg-transparent"
                  type="button"
                  onClick={() => setActiveTab('verify')}
                >
                  <IoEye color="#A5A5AB" />
                </Button>
              </div>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex justify-end items-center py-3">
          <Link href="" className="text-18 font-medium text-custom-1">
            Forgot Password?
          </Link>
        </div>
        <div className="w-full">
          <Button
            type="submit"
            className="bg-[#0063D5] py-[17px] px-[32px] w-full h-[60px] text-white rounded-full hover:bg-[#0063D5] hover:text-white"
          >
            <span className="text-white font-medium text-18">Log in</span>
          </Button>
          <div className="flex mt-4 justify-center items-center space-x-2 font-normal text-[#4A4C56] text-16 tracking-[0.5%]">
            <span>Don't have an account?</span>
            <Link href="" className="font-semibold">
              Register now!
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

const VerificationContent = ({
  setActiveTab,
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [otpError, setOtpError] = useState('');

  const handleOtpChange = (newOtp: string[]) => {
    setOtp(newOtp);
    setOtpError('');
  };

  const handleOtpComplete = (completeOtp: string) => {
    console.log('OTP complete:', completeOtp);
    // You can add validation here if needed
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((digit) => digit === '')) {
      setOtpError('Please enter the complete verification code');
      return;
    }
    // Handle OTP verification logic here
    console.log('Verifying OTP:', otp.join(''));
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col mb-5 text-center">
        <CloudinaryImage src="/img/logo.svg" alt=" " height={101} width={218} />
        <h1 className="text-[#1D1F2C] text-24 md:text-40 font-semibold">
          Verification Code
        </h1>
        <p className="text-[#4A4C56] text-16 font-normal">
          We have sent the verification code to your email address
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center w-full mb-5">
          <OtpGroup
            value={otp}
            onChange={handleOtpChange}
            onComplete={handleOtpComplete}
          />
        </div>
        {otpError && (
          <div className="text-red-500 text-center mb-4">{otpError}</div>
        )}
        <div className="w-full">
          <Button
            type="submit"
            className="bg-[#0063D5] py-[17px] px-[32px] w-full h-[60px] text-white rounded-full hover:bg-[#0063D5] hover:text-white"
          >
            <span className="text-white font-medium text-18">Confirm</span>
          </Button>
        </div>
      </form>
    </>
  );
};

export function Login({ open, onOpenChange }: LoginProps) {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[934px] md:p-[64px] bg-white">
        {activeTab === 'login' ? (
          <LoginContent setActiveTab={setActiveTab} />
        ) : (
          <VerificationContent setActiveTab={setActiveTab} />
        )}
      </DialogContent>
    </Dialog>
  );
}
