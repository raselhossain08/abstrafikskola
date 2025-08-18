'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { subscriptionAPI, type SubscriptionData } from '@/lib/api';
import { fetchFooterData, FooterData } from '@/services/footerService';

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFooterData();
        setFooterData(data);
      } catch (error) {
        console.error('Error loading footer data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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

  if (loading) {
    return (
      <div className="bg-custom-6">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="flex justify-center py-10">
            <div className="text-center">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!footerData) {
    return null;
  }

  // Sort arrays by order
  const sortedSocialLinks = [...footerData.socialLinks].sort((a, b) => a.order - b.order);
  const sortedCompanyLinks = [...footerData.companySection.links].sort((a, b) => a.order - b.order);
  const sortedContacts = [...footerData.contactsSection.contacts].sort((a, b) => a.order - b.order);

  return (
    <div className={footerData.backgroundColor}>
      <div className="container mx-auto px-4 lg:px-0">
        <div className="flex justify-between py-10 md:flex-row flex-col">
          <div className="w-[310px]">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <Image 
                  src={footerData.logo.src} 
                  alt={footerData.logo.alt} 
                  width={footerData.logo.width}
                  height={footerData.logo.height}
                  className={`w-[${footerData.logo.width}px] h-[${footerData.logo.height}px]`}
                />
              </Link>
            </div>
            <p className="font-raleway font-[400] text-16 text-[#4A4C56] pt-5 pb-5 md:pb-10">
              {footerData.description}
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-6 pb-8 md:pb-0">
              {sortedSocialLinks.map((social) => (
                <Link
                  key={social._id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image 
                    src={social.icon} 
                    alt={social.alt} 
                    width={24}
                    height={24}
                    className="w-auto h-[16px] md:h-[24px]"
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="w-[111px] pb-8 md:pb-0">
            <h2 className="text-24 font-raleway font-[500] text-[#1D1F2C] mb-3 md:mb-5">
              {footerData.companySection.title}
            </h2>
            <ul className="space-y-3 text-16 font-raleway text-[#4A4C56]">
              {sortedCompanyLinks.map((link) => (
                <li key={link._id}>
                  <Link href={link.url} className="hover:text-blue-600 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[250px] pb-8 md:pb-0">
            <h2 className="text-24 font-raleway font-[500] text-[#1D1F2C] mb-3 md:mb-5">
              {footerData.contactsSection.title}
            </h2>
            <ul className="space-y-3 text-16 font-raleway text-[#4A4C56]">
              {sortedContacts.map((contact) => (
                <li key={contact._id} className="flex items-center space-x-2">
                  <Image src={contact.icon} alt="" height={15} width={15} />
                  {contact.link ? (
                    <Link
                      href={contact.link}
                      target={contact.type === 'whatsapp' ? "_blank" : undefined}
                      rel={contact.type === 'whatsapp' ? "noopener noreferrer" : undefined}
                      className="hover:text-blue-600 transition"
                    >
                      {contact.value}
                    </Link>
                  ) : (
                    <span>{contact.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-[303px]">
            <h2 className="text-24 font-raleway font-[500] text-[#1D1F2C] mb-3 md:mb-5">
              {footerData.subscribeSection.title}
            </h2>
            <p className="text-16 font-raleway text-[#4A4C56] mb-3 md:mb-4">
              {footerData.subscribeSection.subtitle}
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
                placeholder={footerData.subscribeSection.placeholder}
                required
                disabled={isSubmitting}
                className="flex-grow px-4 py-2 outline-none w-[303px] h-[48px] text-16 font-raleway disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white text-14 font-raleway font-medium px-[16px] py-[6px] rounded-full hover:bg-blue-600 transition relative right-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : footerData.subscribeSection.buttonText}
              </button>
            </form>
          </div>
        </div>
        <div className="flex items-center justify-center py-5">
          <p className="text-center font-raleway text-14 text-blue-500">
            {footerData.footerBottom.text}
            <span className="font-semibold"> {footerData.footerBottom.developerName}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
