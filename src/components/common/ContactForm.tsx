'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Label } from '../ui/label';
import { contactAPI, type ContactData } from '@/lib/api';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setSubmitMessage('Please fill in all required fields.');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');
    setMessageType('');

    try {
      const contactData: ContactData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };

      const response = await contactAPI.create(contactData);

      if (response.success) {
        setSubmitMessage(
          response.message ||
            'Message sent successfully! We will get back to you soon.'
        );
        setMessageType('success');
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setSubmitMessage(
          response.message || 'Failed to send message. Please try again.'
        );
        setMessageType('error');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitMessage('Failed to send message. Please try again later.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);

      // Clear message after 5 seconds
      setTimeout(() => {
        setSubmitMessage('');
        setMessageType('');
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        {/* Success/Error Message */}
        {submitMessage && (
          <div
            className={`p-3 rounded-md text-14 font-medium ${
              messageType === 'success'
                ? 'bg-green-100 text-green-600 border border-green-200'
                : 'bg-red-100 text-red-600 border border-red-200'
            }`}
          >
            {submitMessage}
          </div>
        )}

        <div>
          <Label
            htmlFor="name"
            className="block font-sansat text-[#1D1F2C] font-medium text-18 leading-[26px] mb-2"
          >
            Full Name *
          </Label>
          <Input
            name="name"
            placeholder="Enter your name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            required
            className=" py-[15px] px-[16px] bg-white border border-[#E9E9EA80] h-[52px] text-16 text-[#777980] font-medium leading-[140%] shadow-none rounded-[6px] disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <Label
            className="block font-sansat text-[#1D1F2C] font-medium text-18 leading-[26px] mb-2"
            htmlFor="email"
          >
            Email *
          </Label>
          <Input
            name="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            disabled={isSubmitting}
            required
            className=" py-[15px] px-[16px] bg-white border border-[#E9E9EA80] h-[52px] text-16 text-[#777980] font-medium leading-[140%] shadow-none rounded-[6px] disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <Label
            className="block text-[#1D1F2C] font-medium text-18 leading-[26px] mb-2 font-sansat"
            htmlFor="subject"
          >
            Subject *
          </Label>
          <Input
            name="subject"
            id="subject"
            placeholder="Please write the Subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={isSubmitting}
            required
            className=" py-[15px] px-[16px] bg-white border border-[#E9E9EA80] h-[52px] text-16 text-[#777980] font-medium leading-[140%] shadow-none rounded-[6px] disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
        <div className=" mb-7">
          <Label
            className="block text-[#1D1F2C] font-medium text-18 leading-[26px] mb-2 font-sansat"
            htmlFor="message"
          >
            Message *
          </Label>
          <Textarea
            name="message"
            placeholder="Type your message"
            value={formData.message}
            onChange={handleChange}
            id="message"
            disabled={isSubmitting}
            required
            className=" py-[15px] px-[16px] bg-white border border-[#E9E9EA80]  text-16 text-[#777980] font-medium leading-[140%] rounded-[6px] h-[96px] disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[50px] rounded-[30px] py-[14px] px-[16px] bg-[#3F8FEE] hover:bg-[#3F8FEE] disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </form>
  );
}
