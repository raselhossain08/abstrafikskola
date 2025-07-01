'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Label } from '../ui/label';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // here you can add API call or server action
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <Label
            htmlFor="name"
            className="block font-sansat text-[#1D1F2C] font-medium text-18 leading-[26px] mb-2"
          >
            Full Name
          </Label>
          <Input
            name="name"
            placeholder="Enter your name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className=" py-[15px] px-[16px] bg-white border border-[#E9E9EA80] h-[52px] text-16 text-[#777980] font-medium leading-[140%] shadow-none rounded-[6px]"
          />
        </div>
        <div>
          <Label
            className="block font-sansat text-[#1D1F2C] font-medium text-18 leading-[26px] mb-2"
            htmlFor="email"
          >
            Email
          </Label>
          <Input
            name="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className=" py-[15px] px-[16px] bg-white border border-[#E9E9EA80] h-[52px] text-16 text-[#777980] font-medium leading-[140%] shadow-none rounded-[6px]"
          />
        </div>
        <div>
          <Label
            className="block text-[#1D1F2C] font-medium text-18 leading-[26px] mb-2 font-sansat"
            htmlFor="subject"
          >
            Subject
          </Label>
          <Input
            name="subject"
            id="subject"
            placeholder="Please write the Subject"
            value={formData.subject}
            onChange={handleChange}
            className=" py-[15px] px-[16px] bg-white border border-[#E9E9EA80] h-[52px] text-16 text-[#777980] font-medium leading-[140%] shadow-none rounded-[6px]"
          />
        </div>
        <div className=' mb-7'>
          <Label
            className="block text-[#1D1F2C] font-medium text-18 leading-[26px] mb-2 font-sansat"
            htmlFor="message"
          >
            Message
          </Label>
          <Textarea
            name="message"
            placeholder="Type your message"
            value={formData.message}
            onChange={handleChange}
            id="message"
            className=" py-[15px] px-[16px] bg-white border border-[#E9E9EA80]  text-16 text-[#777980] font-medium leading-[140%] rounded-[6px] h-[96px]"
          />
        </div>
        <Button
          type="submit"
          className="w-full h-[50px] rounded-[30px] py-[14px] px-[16px] bg-[#3F8FEE] hover:bg-[#3F8FEE]"
        >
          Send
        </Button>
      </div>
    </form>
  );
}
