'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { fetchContactSectionData, ContactSectionData } from '@/services/contactSectionService';

export default function Contact() {
  const [contactData, setContactData] = useState<ContactSectionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchContactSectionData();
        setContactData(data);
      } catch (error) {
        console.error('Error loading contact section data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="h-[400px] md:h-[600px] flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!contactData) {
    return null;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${contactData.backgroundImage})`,
        backgroundSize: 'cover',
      }}
      className={`${contactData.containerHeight.mobile} ${contactData.containerHeight.desktop} flex items-center justify-center`}
    >
      <div className="container h-full px-4 lg:px-0">
        <div className="flex items-center justify-center h-full flex-col">
          <h3 
            className={`font-raleway ${contactData.textStyles.fontWeight} ${contactData.textStyles.fontSize.mobile} ${contactData.textStyles.fontSize.desktop} leading-[31px] md:leading-[42px] tracking-normal ${contactData.textStyles.textAlign} ${contactData.textStyles.titleColor} ${contactData.textStyles.marginBottom}`}
            dangerouslySetInnerHTML={{ __html: contactData.title.replace(/\n/g, '<br />') }}
          />
          <Link href={contactData.buttonLink}>
            <Button 
              className={`${contactData.buttonStyle.backgroundColor} ${contactData.buttonStyle.hoverColor} ${contactData.buttonStyle.width} ${contactData.buttonStyle.height} ${contactData.buttonStyle.borderRadius} font-raleway font-medium text-[18px] leading-[26px] tracking-normal text-white mt-4 cursor-pointer`}
            >
              {contactData.buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
