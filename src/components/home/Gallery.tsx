'use client';

import { GalleryItem, galleryService, type Gallery as GalleryType } from '@/services/galleryService';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa6';
import { useLanguage } from '@/contexts/LanguageContext';

// Layout configuration with fixed dimensions
const galleryLayout = [
  { w: 424, h: 625 }, // Image 1 - tall left
  { w: 872, h: 300 }, // Image 2 - wide top right
  { w: 424, h: 300 }, // Image 3 - small bottom left
  { w: 424, h: 625 }, // Image 4 - tall right
  { w: 424, h: 300 }, // Image 5 - small left column bottom
  { w: 424, h: 300 }, // Image 6 - small bottom right
];

export default function Gallery() {
  const { language } = useLanguage();
  const [galleryItems, setGalleryItems] = useState<GalleryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Multi-language titles
  const titles = {
    en: "Gallery",
    sv: "Galleri", 
    ar: "المعرض"
  };

  const currentTitle = titles[language as keyof typeof titles] || titles.en;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('🎬 Gallery: Fetching data from API...');
        
        const galleries = await galleryService.getPublicGallery();
        console.log('📦 Gallery: API Response:', galleries);
        console.log('✅ Gallery: Setting gallery items:', galleries.length, 'items');
        setGalleryItems(galleries);
      } catch (error) {
        console.error('💥 Gallery: Fetch error:', error);
        setError('Failed to load gallery');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Helper function to get gallery item by index with fallback
  const getGalleryItem = (index: number) => {
    if (galleryItems[index]) {
      return galleryItems[index];
    }
    
    // Fallback to default structure
    return {
      _id: `fallback-${index}`,
      image: `/img/gallery/${index + 1}.png`,
      alt: `Gallery ${index + 1}`,
      category: 'other' as const,
      isActive: true,
      order: index,
      socialLinks: {
        facebook: '#',
        instagram: '#'
      }
    };
  };

  // Show loading state
  if (loading) {
    return (
      <section className="py-24 px-4 bg-[#F7FAFF]">
        <div className="w-full xl:w-[1320px] mx-auto text-center pb-5">
          <h2 className="text-48 font-bold mb-12 text-[#1D1F2C]">{currentTitle}</h2>
          <div className="flex justify-center items-center h-[400px]">
            <p className="text-lg text-gray-600">Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-24 px-4 bg-[#F7FAFF]">
        <div className="w-full xl:w-[1320px] mx-auto text-center pb-5">
          <h2 className="text-48 font-bold mb-12 text-[#1D1F2C]">{currentTitle}</h2>
          <div className="flex justify-center items-center h-[400px]">
            <p className="text-lg text-red-600">Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-24 px-4 bg-[#F7FAFF]">
      <div className="w-full xl:w-[1320px] mx-auto text-center pb-5">
        <h2 className="text-48 font-bold mb-12 text-[#1D1F2C]">{currentTitle}</h2>

        <div className="   justify-between h-[950px] md:flex  hidden">
          <div className="w-[424px] flex flex-col justify-between">
            <div className="relative rounded-xl overflow-hidden group">
              <Image
                src={getGalleryItem(0).image || '/img/gallery/1.png'}
                alt={getGalleryItem(0).alt || 'Gallery'}
                width={424}
                height={625}
                className=" h-[625px] object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                {getGalleryItem(0).socialLinks?.facebook && (
                  <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                    <Link
                      href={getGalleryItem(0).socialLinks?.facebook || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white  w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
                    >
                      <FaFacebookF size={24} />
                    </Link>
                  </div>
                )}
                {getGalleryItem(0).socialLinks?.instagram && (
                  <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                    <Link
                      href={getGalleryItem(0).socialLinks?.instagram || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white  w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
                    >
                      <FaInstagram size={24} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden group">
              <Image
                src={getGalleryItem(4).image || '/img/gallery/5.png'}
                alt={getGalleryItem(3).alt || 'Gallery'}
                width={424}
                height={300}
                className=" h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                {getGalleryItem(4).socialLinks?.facebook && (
                  <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                    <Link
                      href={getGalleryItem(4).socialLinks?.facebook || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white  w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
                    >
                      <FaFacebookF size={24} />
                    </Link>
                  </div>
                )}
                {getGalleryItem(4).socialLinks?.instagram && (
                  <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                    <Link
                      href={getGalleryItem(1).socialLinks?.instagram || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white  w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
                    >
                      <FaInstagram size={24} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-[872px] flex flex-col justify-between">
            <div className="relative rounded-xl overflow-hidden group inline-block">
              <Image
                src={getGalleryItem(1).image || '/img/gallery/2.png'}
                alt={getGalleryItem(1).alt || 'Gallery'}
                width={872}
                height={300}
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                {getGalleryItem(1).socialLinks?.facebook && (
                  <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                    <Link
                      href={getGalleryItem(1).socialLinks?.facebook || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white  w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
                    >
                      <FaFacebookF size={24} />
                    </Link>
                  </div>
                )}
                {getGalleryItem(1).socialLinks?.instagram && (
                  <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                    <Link
                      href={getGalleryItem(1).socialLinks?.instagram || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white  w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
                    >
                      <FaInstagram size={24} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-[424px] flex flex-col justify-between">
                <div className="relative rounded-xl overflow-hidden group inline-block">
                  <Image
                    src={getGalleryItem(2).image || '/img/gallery/3.png'}
                    alt={getGalleryItem(2).alt || 'Gallery'}
                    width={424}
                    height={300}
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                    {getGalleryItem(2).socialLinks?.facebook && (
                      <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                        <Link
                          href={getGalleryItem(2).socialLinks?.facebook || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white  w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
                        >
                          <FaFacebookF size={24} />
                        </Link>
                      </div>
                    )}
                    {getGalleryItem(2).socialLinks?.instagram && (
                      <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                        <Link
                          href={getGalleryItem(2).socialLinks?.instagram || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white  w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
                        >
                          <FaInstagram size={24} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden group inline-block">
                  <Image
                    src="/img/gallery/6.png"
                    alt="Gallery"
                    width={872}
                    height={300}
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                    <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                      <Link
                        href=""
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white  w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
                      >
                        <FaFacebookF size={24} />
                      </Link>
                    </div>
                    <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                      <Link
                        href=""
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white  w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
                      >
                        <FaInstagram size={24} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[424px]">
                <div className="relative rounded-xl overflow-hidden group inline-block">
                  <Image
                    src={getGalleryItem(3).image || '/img/gallery/4.png'}
                    alt={getGalleryItem(3).alt || 'Gallery'}
                    width={424}
                    height={625}
                    className="w-full h-[625px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                    {getGalleryItem(3).socialLinks?.facebook && (
                      <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                        <Link
                          href={getGalleryItem(3).socialLinks?.facebook || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white  w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
                        >
                          <FaFacebookF size={24} />
                        </Link>
                      </div>
                    )}
                    {getGalleryItem(5).socialLinks?.instagram && (
                      <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                        <Link
                          href={getGalleryItem(3).socialLinks?.instagram || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white  w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
                        >
                          <FaInstagram size={24} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* mobile */}
        <div className=" grid grid-cols-3 gap-5 md:hidden">
          <div className="relative  overflow-hidden group mb-0 pb-0">
            <Image
              src={getGalleryItem(0).image || '/img/gallery/1.png'}
              alt={getGalleryItem(0).alt || 'Gallery'}
              width={424}
              height={625}
              className=" h-[625px] object-cover  object-center mb-0 pb-0"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 h-full top-0 left-0">
              {getGalleryItem(0).socialLinks?.facebook && (
                <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                  <Link
                    href={getGalleryItem(0).socialLinks?.facebook || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white  w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
                  >
                    <FaFacebookF size={24} />
                  </Link>
                </div>
              )}
              {getGalleryItem(0).socialLinks?.instagram && (
                <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                  <Link
                    href={getGalleryItem(0).socialLinks?.instagram || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white  w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
                  >
                    <FaInstagram size={24} />
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className=" col-span-2">
            <div className="">
                <div className="relative rounded-xl overflow-hidden group inline-block mb-5">
                  <Image
                    src={getGalleryItem(1).image || '/img/gallery/3.png'}
                    alt={getGalleryItem(1).alt || 'Gallery'}
                    width={424}
                    height={300}
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                    {getGalleryItem(1).socialLinks?.facebook && (
                      <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                        <Link
                          href={getGalleryItem(1).socialLinks?.facebook || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white  w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
                        >
                          <FaFacebookF size={24} />
                        </Link>
                      </div>
                    )}
                    {getGalleryItem(1).socialLinks?.instagram && (
                      <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                        <Link
                          href={getGalleryItem(1).socialLinks?.instagram || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white  w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
                        >
                          <FaInstagram size={24} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden group inline-block">
                  <Image
                    src="/img/gallery/6.png"
                    alt="Gallery"
                    width={872}
                    height={300}
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                    <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                      <Link
                        href=""
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white  w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
                      >
                        <FaFacebookF size={24} />
                      </Link>
                    </div>
                    <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                      <Link
                        href={getGalleryItem(2).socialLinks?.instagram || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white  w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
                      >
                        <FaInstagram size={24} />
                      </Link>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}