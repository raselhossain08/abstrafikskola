'use client';

import ContactForm from '@/components/common/ContactForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import React from 'react';
import { FaCheck } from 'react-icons/fa6';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

// Metadata will be handled by layout or a separate metadata file

const contactPageContent = {
  hero: {
    title: {
      en: 'Contact Us',
      sv: 'Kontakta oss',
      ar: 'اتصل بنا',
    },
    subtitle: {
      en: 'A driving school in Södertälje with most affordable prices',
      sv: 'En körskola i Södertälje med de mest prisvärda priserna',
      ar: 'مدرسة تعليم قيادة في سودرتاليا بأسعار معقولة جداً',
    },
    desktopImage: '/img/contact/2.png',
    mobileImage: '/img/contact/mobile.png',
    altText: {
      en: 'Contact Us Hero Image',
      sv: 'Kontakt Hjältbild',
      ar: 'صورة اتصل بنا الرئيسية',
    },
  },
  contactSection: {
    title: {
      en: 'Contact',
      sv: 'Kontakt',
      ar: 'تواصل معنا',
    },
    description: {
      en: 'Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat.',
      sv: 'Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat.',
      ar: 'هذا النص هو مجرد مثال لاستخدام المحتوى التجريبي في التصميم.',
    },
    contactMethods: [
      {
        icon: '/icons/social/facebook.svg',
        alt: 'facebook',
        title: {
          en: 'Call Us',
          sv: 'Ring oss',
          ar: 'اتصل بنا',
        },
        detail: '08 550 66666',
        href: 'tel:0855066666',
      },
      {
        icon: '/icons/social/whatsapp.svg',
        alt: 'whatsapp',
        title: {
          en: 'WhatsApp/SMS',
          sv: 'WhatsApp/SMS',
          ar: 'واتساب / رسالة نصية',
        },
        detail: '073 938 8424',
        href: 'https://wa.me/0739388424',
      },
      {
        icon: '/icons/social/sms.svg',
        alt: 'sms',
        title: {
          en: 'Send Us Mail',
          sv: 'Skicka e-post',
          ar: 'أرسل لنا بريدًا',
        },
        detail: 'info@abstraflkskola.se',
        href: 'mailto:info@abstraflkskola.se',
      },
      {
        icon: '/icons/social/location.svg',
        alt: 'location',
        title: {
          en: 'Find the Studio',
          sv: 'Hitta studion',
          ar: 'اعثر على موقعنا',
        },
        detail: 'Dalgatan 1 1, 15133 Södertälje',
        href: 'https://maps.google.com/?q=Dalgatan+1+1,+15133+Södertälje',
      },
    ],
    hours: [
      {
        title: {
          en: 'Tel/Reception',
          sv: 'Telefon/Reception',
          ar: 'الهاتف / الاستقبال',
        },
        detail: {
          en: 'Mon-Fri 09.00-17.00',
          sv: 'Mån-Fre 09.00-17.00',
          ar: 'الإثنين - الجمعة 09:00 - 17:00',
        },
      },
      {
        title: {
          en: 'Driving lessons/Courses',
          sv: 'Körlektioner/Kurser',
          ar: 'دروس القيادة / الدورات',
        },
        detail: {
          en: '7 days a week 07.00-19.30',
          sv: '7 dagar i veckan 07.00-19.30',
          ar: 'طوال الأسبوع من 07:00 إلى 19:30',
        },
      },
    ],
    features: [
      {
        en: 'We are open seven days a week for driving lessons, risk1, risk2 and introduktionsutbildning.',
        sv: 'Vi har öppet sju dagar i veckan för körlektioner, risk1, risk2 och introduktionsutbildning.',
        ar: 'نحن متاحون طوال الأسبوع لدروس القيادة، Risk1، Risk2، والتعليم التمهيدي.',
      },
      {
        en: 'Our reception and telephone hours are open Monday to Friday 09.00 - 17.00.',
        sv: 'Vår reception och telefontid är öppen måndag till fredag 09.00 - 17.00.',
        ar: 'ساعات الاستقبال والهاتف من الإثنين إلى الجمعة 09:00 - 17:00.',
      },
      {
        en: 'If you have any questions or queries, please call us, email us or stop by our driving school.',
        sv: 'Om du har några frågor, ring oss, skicka ett mejl eller besök vår körskola.',
        ar: 'إذا كان لديك أي استفسار، يرجى الاتصال بنا أو إرسال بريد إلكتروني أو زيارتنا.',
      },
    ],
    map: {
      src: '/img/map.png',
      width: 591,
      height: 279,
      alt: {
        en: 'Driving School Location Map',
        sv: 'Platskarta för körskola',
        ar: 'خريطة موقع مدرسة القيادة',
      },
    },
  },
  form: {
    title: {
      en: 'Get In Touch With Us',
      sv: 'Kontakta oss',
      ar: 'تواصل معنا',
    },
  },
};

export default function ContactPage() {
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  // Translation helper function
  const t = (content: any) => {
    if (typeof content === 'object' && content[language]) {
      return content[language];
    }
    return content;
  };

  return (
    <>
      {/* Hero Section */}
      <header
        style={{
          backgroundImage: `url(${contactPageContent.hero.desktopImage})`,
        }}
        className="h-[400px] hidden md:flex items-center justify-center flex-col px-4 bg-no-repeat bg-right"
        aria-label="Contact Us Hero"
      >
        <h1 className="text-48 font-bold text-[#3F8FEE]">
          {t(contactPageContent.hero.title)}
        </h1>
        <p className="text-white font-normal text-16 text-center">
          {t(contactPageContent.hero.subtitle)}
        </p>
      </header>
      <header
        style={{
          backgroundImage: `url(${contactPageContent.hero.mobileImage})`,
        }}
        className="h-[400px] md:hidden flex items-center justify-center flex-col px-4 bg-no-repeat bg-right"
        aria-label="Contact Us Hero Mobile"
      >
        <h1 className="text-24 sm:text-48 font-bold text-[#3F8FEE]">
          {t(contactPageContent.hero.title)}
        </h1>
        <p className="text-white font-normal text-16 text-center">
          {t(contactPageContent.hero.subtitle)}
        </p>
      </header>

      {/* Contact Section */}
      <main className="bg-white py-20 px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <div className="w-full flex justify-between items-start md:flex-row flex-col">
            {/* Contact Info */}
            <section
              className="w-full xl:w-[588px]"
              aria-labelledby="contact-heading"
            >
              <h2
                id="contact-heading"
                className="text-[#1D1F2C] font-semibold text-18 sm:text-32 pb-4 md:pb-8"
              >
                {t(contactPageContent.contactSection.title)}
              </h2>
              <p className="text-[#4A4C56] font-normal text-16 leading-[140%] tracking-[0.5%]">
                {t(contactPageContent.contactSection.description)}
              </p>

              {/* Contact Methods */}
              {contactPageContent.contactSection.contactMethods.map(
                (method, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 mb-4 mt-4"
                  >
                    <div className="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#ECF4FD33] border-[#ECF4FD] border">
                      <Image
                        src={method.icon}
                        alt={method.alt}
                        width={24}
                        height={24}
                        loading="lazy"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-[#1D1F2C] font-[600] text-16 sm:text-18 leading-[26px]">
                        {t(method.title)}
                      </h3>
                      <a
                        href={method.href}
                        className="text-[#4A4C56] font-[400] text-16 leading-[140%] tracking-[0.5%] hover:underline"
                        aria-label={t(method.title)}
                      >
                        {method.detail}
                      </a>
                    </div>
                  </div>
                )
              )}

              {/* Hours */}
              {contactPageContent.contactSection.hours.map((hour, index) => (
                <div
                  key={index}
                  className="bg-[#ECF4FD] inline-flex items-center justify-center px-[16px] py-[10px] rounded-[30px] mb-4"
                >
                  <p className="text-[#3F8FEE] font-semibold text-16 sm:text-18">
                    {t(hour.title)}: {t(hour.detail)}
                  </p>
                </div>
              ))}

              {/* Features */}
              {contactPageContent.contactSection.features.map(
                (feature, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="border-[1.5px] w-[28px] h-[28px] border-[#1474FC] rounded-full flex items-center justify-center text-12 text-[#1474FC]">
                        <FaCheck aria-hidden="true" />
                      </div>
                      <p className="text-16 font-normal leading-[140%] text-[#4A4C56] w-10/12 tracking-[0.5%]">
                        {t(feature)}
                      </p>
                    </div>
                  </div>
                )
              )}

              {/* Map */}
              <div className="map mb-20 sm:mb-0">
                <Image
                  src={contactPageContent.contactSection.map.src}
                  alt={t(contactPageContent.contactSection.map.alt)}
                  width={contactPageContent.contactSection.map.width}
                  height={contactPageContent.contactSection.map.height}
                  loading="lazy"
                />
              </div>
            </section>

            {/* Contact Form */}
            <section
              className="w-full xl:w-[632px] rounded-[16px] border border-[#ECF4FD] px-[24px] py-[26px] bg-[#F7FAFF]"
              aria-labelledby="form-heading"
            >
              <h2
                id="form-heading"
                className="text-[#1D1F2C] font-bold sm:font-semibold text-18 sm:text-32 text-center mb-4"
              >
                {t(contactPageContent.form.title)}
              </h2>
              <ContactForm />
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
