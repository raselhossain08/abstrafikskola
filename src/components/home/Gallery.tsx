'use client';

import { useState, useEffect } from 'react';
import { CloudinaryImage } from '@/hooks/useCloudinaryImages';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaSpinner } from 'react-icons/fa6';
import { FaExclamationTriangle } from 'react-icons/fa';
import { galleryService, type GalleryItem } from '@/services/galleryService';

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        const response = await galleryService.getPublicGallery();
        
        if (response.success && response.data) {
          // Sort by order field
          const sortedItems = response.data.sort((a, b) => (a.order || 0) - (b.order || 0));
          setGalleryItems(sortedItems);
        } else {
          setError(response.error || 'Failed to load gallery');
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
        setError('Failed to load gallery');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="py-24 px-4 bg-[#F7FAFF]">
        <div className="w-full xl:w-[1320px] mx-auto text-center">
          <h2 className="text-48 font-bold mb-12 text-[#1D1F2C]">Gallery</h2>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center space-y-4">
              <FaSpinner className="animate-spin text-4xl text-blue-500" />
              <p className="text-lg text-gray-600">Loading gallery...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-24 px-4 bg-[#F7FAFF]">
        <div className="w-full xl:w-[1320px] mx-auto text-center">
          <h2 className="text-48 font-bold mb-12 text-[#1D1F2C]">Gallery</h2>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center space-y-4 text-center max-w-md">
              <FaExclamationTriangle className="text-4xl text-red-500" />
              <h3 className="text-xl font-semibold text-gray-800">Failed to Load Gallery</h3>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (galleryItems.length === 0) {
    return (
      <section className="py-24 px-4 bg-[#F7FAFF]">
        <div className="w-full xl:w-[1320px] mx-auto text-center">
          <h2 className="text-48 font-bold mb-12 text-[#1D1F2C]">Gallery</h2>
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-lg text-gray-600">No gallery items available</p>
          </div>
        </div>
      </section>
    );
  }

  // Render gallery item with hover effects
  const renderGalleryItem = (item: GalleryItem, className: string = '') => (
    <div key={item._id} className={`relative rounded-xl overflow-hidden group ${className}`}>
      <Image
        src={item.image}
        alt={item.alt || 'Gallery'}
        width={item.width || 424}
        height={item.height || 300}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
        {item.socialLinks?.facebook && (
          <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
            <Link
              href={item.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
            >
              <FaFacebookF size={24} />
            </Link>
          </div>
        )}
        {item.socialLinks?.instagram && (
          <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
            <Link
              href={item.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
            >
              <FaInstagram size={24} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  // Helper function to get gallery item by index or fallback
  const getGalleryItem = (index: number) => {
    return galleryItems[index] || {
      _id: `fallback-${index}`,
      image: `/img/gallery/${index + 1}.png`,
      alt: 'Gallery',
      category: 'other' as const,
      isActive: true,
      socialLinks: {
        facebook: '',
        instagram: ''
      }
    };
  };
  return (
    <section className="py-24 px-4 bg-[#F7FAFF]">
      <div className="w-full xl:w-[1320px] mx-auto text-center pb-5">
        <h2 className="text-48 font-bold mb-12 text-[#1D1F2C]">Gallery</h2>

        <div className="   justify-between h-[950px] md:flex  hidden">
          <div className="w-[424px] flex flex-col justify-between">
            <div className="relative rounded-xl overflow-hidden group">
              <Image
                src={getGalleryItem(0).image}
                alt={getGalleryItem(0).alt || 'Gallery'}
                width={424}
                height={625}
                className=" h-[625px] object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                {getGalleryItem(0).socialLinks?.facebook && (
                  <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                    <Link
                      href={getGalleryItem(0).socialLinks?.facebook || ''}
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
                      href={getGalleryItem(0).socialLinks?.instagram || ''}
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
                src={getGalleryItem(4).image}
                alt={getGalleryItem(4).alt || 'Gallery'}
                width={424}
                height={300}
                className=" h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                {getGalleryItem(4).socialLinks?.facebook && (
                  <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                    <Link
                      href={getGalleryItem(4).socialLinks?.facebook || ''}
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
                      href={getGalleryItem(4).socialLinks?.instagram || ''}
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
                src={getGalleryItem(1).image}
                alt={getGalleryItem(1).alt || 'Gallery'}
                width={872}
                height={300}
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                {getGalleryItem(1).socialLinks?.facebook && (
                  <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                    <Link
                      href={getGalleryItem(1).socialLinks?.facebook || ''}
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
                      href={getGalleryItem(1).socialLinks?.instagram || ''}
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
                    src={getGalleryItem(2).image}
                    alt={getGalleryItem(2).alt || 'Gallery'}
                    width={424}
                    height={300}
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                    {getGalleryItem(2).socialLinks?.facebook && (
                      <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                        <Link
                          href={getGalleryItem(2).socialLinks?.facebook || ''}
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
                          href={getGalleryItem(2).socialLinks?.instagram || ''}
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
                    src={getGalleryItem(5).image}
                    alt={getGalleryItem(5).alt || 'Gallery'}
                    width={872}
                    height={300}
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                    {getGalleryItem(5).socialLinks?.facebook && (
                      <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                        <Link
                          href={getGalleryItem(5).socialLinks?.facebook || ''}
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
                          href={getGalleryItem(5).socialLinks?.instagram || ''}
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
              <div className="w-[424px]">
                <div className="relative rounded-xl overflow-hidden group inline-block">
                  <Image
                    src={getGalleryItem(3).image}
                    alt={getGalleryItem(3).alt || 'Gallery'}
                    width={424}
                    height={625}
                    className="w-full h-[625px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                    {getGalleryItem(3).socialLinks?.facebook && (
                      <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                        <Link
                          href={getGalleryItem(3).socialLinks?.facebook || ''}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white  w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
                        >
                          <FaFacebookF size={24} />
                        </Link>
                      </div>
                    )}
                    {getGalleryItem(3).socialLinks?.instagram && (
                      <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                        <Link
                          href={getGalleryItem(3).socialLinks?.instagram || ''}
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
              src={getGalleryItem(0).image}
              alt={getGalleryItem(0).alt || 'Gallery'}
              width={424}
              height={625}
              className=" h-[625px] object-cover  object-center mb-0 pb-0"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 h-full top-0 left-0">
              {getGalleryItem(0).socialLinks?.facebook && (
                <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                  <Link
                    href={getGalleryItem(0).socialLinks?.facebook || ''}
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
                    href={getGalleryItem(0).socialLinks?.instagram || ''}
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
                    src={getGalleryItem(2).image}
                    alt={getGalleryItem(2).alt || 'Gallery'}
                    width={424}
                    height={300}
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                    {getGalleryItem(2).socialLinks?.facebook && (
                      <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                        <Link
                          href={getGalleryItem(2).socialLinks?.facebook || ''}
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
                          href={getGalleryItem(2).socialLinks?.instagram || ''}
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
                    src={getGalleryItem(3).image}
                    alt={getGalleryItem(3).alt || 'Gallery'}
                    width={872}
                    height={300}
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                    {getGalleryItem(3).socialLinks?.facebook && (
                      <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                        <Link
                          href={getGalleryItem(3).socialLinks?.facebook || ''}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white  w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1474FC] backdrop-blur-[20px]"
                        >
                          <FaFacebookF size={24} />
                        </Link>
                      </div>
                    )}
                    {getGalleryItem(3).socialLinks?.instagram && (
                      <div className="backdrop-blur-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-full">
                        <Link
                          href={getGalleryItem(3).socialLinks?.instagram || ''}
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
    </section>
  );
}
