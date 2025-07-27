'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { subscriptionAPI, type SubscriptionData } from '@/lib/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage('Please enter a valid email address.');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    setMessageType('');

    try {
      const subscriptionData: SubscriptionData = {
        email: email.trim(),
      };

      const response = await subscriptionAPI.create(subscriptionData);

      if (response.success) {
        setMessage(
          response.message || 'Successfully subscribed to our newsletter!'
        );
        setMessageType('success');
        setEmail(''); // Clear the email input
      } else {
        setMessage(
          response.message || 'Failed to subscribe. Please try again.'
        );
        setMessageType('error');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setMessage('Failed to subscribe. Please try again later.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);

      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
    }
  };
  return (
    <div className="bg-custom-6">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="flex justify-between py-10 md:flex-row flex-col">
          <div className="w-[310px]">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={75}
                  height={35}
                  className="w-[75px] h-[35px]"
                />
              </Link>
            </div>
            <p className=" font-raleway font-[400] text-16 text-[#4A4C56] pt-5 pb-5 md:pb-10">
              Unlock the road with Södertälje’s top Driving school – confidence
              and competitive prices guaranteed!
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-6 pb-8 md:pb-0">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/icons/footer/facebook.svg"
                  alt="facebook Icon"
                  width={24}
                  height={24}
                  className="w-auto h-[16px] md:h-[24px]"
                />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/icons/footer/x.svg"
                  alt="twitter Icon"
                  width={24}
                  height={24}
                  className="w-[16px] h-[16px] md:w-[24px] md:h-[24px]"
                />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/icons/footer/instagram.svg"
                  alt="instagram Icon"
                  width={24}
                  height={24}
                  className="w-[16px] h-[16px] md:w-[24px] md:h-[24px]"
                />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/icons/footer/linkedin.svg"
                  alt="linkedin Icon"
                  width={24}
                  height={24}
                  className="w-[16px] h-[16px] md:w-[24px] md:h-[24px]"
                />
              </Link>
            </div>
          </div>
          <div className="w-[111px] pb-8 md:pb-0">
            <h2 className="text-24 font-raleway  font-[500] text-[#1D1F2C] mb-3 md:mb-5">
              Company
            </h2>
            <ul className="space-y-3 text-16 font-raleway text-[#4A4C56]">
              <li>
                <Link href="/" className="hover:text-blue-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/price-list"
                  className="hover:text-blue-600 transition"
                >
                  Price List
                </Link>
              </li>
              <li>
                <Link
                  href="/handledarkurs"
                  className="hover:text-blue-600 transition"
                >
                  Handledarkurs
                </Link>
              </li>
              <li>
                <Link
                  href="/riskettan"
                  className="hover:text-blue-600 transition"
                >
                  Riskettan
                </Link>
              </li>
              <li>
                <Link
                  href="/halkbana"
                  className="hover:text-blue-600 transition"
                >
                  Halkbana
                </Link>
              </li>
              <li>
                <Link href="/taxi" className="hover:text-blue-600 transition">
                  Taxi
                </Link>
              </li>
              <li>
                <Link
                  href="/info/about"
                  className="hover:text-blue-600 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-600 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-[250px] pb-8 md:pb-0">
            <h2 className="text-24 font-raleway  font-[500] text-[#1D1F2C] mb-3 md:mb-5">
              Contacts
            </h2>
            <ul className="space-y-3 text-16 font-raleway text-[#4A4C56]">
              <li className="flex items-center space-x-2 ">
                <Image
                  src="/icons/footer/location.svg"
                  alt=""
                  height={15}
                  width={15}
                />
                <span>Dolsgatan 1 1, 15133 Södertälje</span>
              </li>
              <li className="flex items-center space-x-2 ">
                <Image
                  src="/icons/footer/message.svg"
                  alt=""
                  height={15}
                  width={15}
                />
                <Link
                  href="mailto:info@abstrafikskola.se"
                  className="hover:text-blue-600 transition"
                >
                  info@abstrafikskola.se
                </Link>
              </li>
              <li className="flex items-center space-x-2 ">
                <Image
                  src="/icons/footer/phone.svg"
                  alt=""
                  height={15}
                  width={15}
                />
                <Link
                  href="tel:0855066666"
                  className="hover:text-blue-600 transition"
                >
                  08 550 66666
                </Link>
              </li>
              <li className="flex items-center space-x-2 ">
                <Image
                  src="/icons/footer/whatsapp.svg"
                  alt=""
                  height={15}
                  width={15}
                />
                <Link
                  href="https://wa.me/46739988444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition"
                >
                  073 998 8444
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:w-[303px]">
            <h2 className="text-24 font-raleway  font-[500] text-[#1D1F2C] mb-3 md:mb-5">
              Subscribe
            </h2>
            <p className="text-16 font-raleway text-[#4A4C56] mb-3 md:mb-4">
              Get Latest update and offers
            </p>

            {/* Success/Error Message */}
            {message && (
              <div
                className={`mb-3 p-2 rounded text-14 font-raleway ${
                  messageType === 'success'
                    ? 'bg-green-100 text-green-600 border border-green-200'
                    : 'bg-red-100 text-red-600 border border-red-200'
                }`}
              >
                {message}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex items-center bg-white rounded-full overflow-hidden shadow-sm"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                required
                disabled={isSubmitting}
                className="flex-grow px-4 py-2 outline-none w-[303px] h-[48px] text-16 font-raleway disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white text-14 font-raleway font-medium px-[16px] py-[6px] rounded-full hover:bg-blue-600 transition relative right-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
        <div className=" flex items-center justify-center py-5">
          <p className="text-center font-raleway text-14 text-blue-500 ">
            2024, All Rights Reserved — Developed by
            <span className="font-semibold"> Rasel Hossain</span>
          </p>
        </div>
      </div>
    </div>
  );
}
