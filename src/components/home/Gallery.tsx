'use client';

import { CloudinaryImage } from '@/hooks/useCloudinaryImages';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram } from 'react-icons/fa6';

const galleryItems = [
  {
    src: '/img/gallery/1.png',
    facebook: '#',
    instagram: '#',
    w: '424px',
    h: '625px',
  },
  {
    src: '/img/gallery/2.png',
    facebook: '#',
    instagram: '#',
    w: '872px',
    h: '300px',
  },
  {
    src: '/img/gallery/3.png',
    facebook: '#',
    instagram: '#',
    w: '424px',
    h: '300px',
  },
  {
    src: '/img/gallery/4.png',
    facebook: '#',
    instagram: '#',
    w: '424px',
    h: '625px',
  },
  {
    src: '/img/gallery/5.png',
    facebook: '#',
    instagram: '#',
    w: '424px',
    h: '300px',
  },
  {
    src: '/img/gallery/6.png',
    facebook: '#',
    instagram: '#',
    w: '424px',
    h: '300px',
  },
];

export default function Gallery() {
  return (
    <section className="py-24 px-4 bg-[#F7FAFF]">
      <div className="w-full xl:w-[1320px] mx-auto text-center pb-5">
        <h2 className="text-48 font-bold mb-12 text-[#1D1F2C]">Gallery</h2>

        <div className="   justify-between h-[950px] md:flex  hidden">
          <div className="w-[424px] flex flex-col justify-between">
            <div className="relative rounded-xl overflow-hidden group">
              <CloudinaryImage src="/img/gallery/1.png" alt="Gallery" width={424}
                height={625}
                className=" h-[625px] object-cover"
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
            <div className="relative rounded-xl overflow-hidden group">
              <CloudinaryImage src="/img/gallery/5.png" alt="Gallery" width={424}
                height={300}
                className=" h-[300px] object-cover"
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
          <div className="w-[872px] flex flex-col justify-between">
            <div className="relative rounded-xl overflow-hidden group inline-block">
              <CloudinaryImage src="/img/gallery/2.png" alt="Gallery" width={872}
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
            <div className="flex justify-between">
              <div className="w-[424px] flex flex-col justify-between">
                <div className="relative rounded-xl overflow-hidden group inline-block">
                  <CloudinaryImage src="/img/gallery/3.png" alt="Gallery" width={424}
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
                <div className="relative rounded-xl overflow-hidden group inline-block">
                  <CloudinaryImage src="/img/gallery/6.png" alt="Gallery" width={872}
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
                  <CloudinaryImage src="/img/gallery/4.png" alt="Gallery" width={424}
                    height={625}
                    className="w-full h-[625px] object-cover"
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
            </div>
          </div>
        </div>
        {/* mobile */}
        <div className=" grid grid-cols-3 gap-5 md:hidden">
          <div className="relative  overflow-hidden group mb-0 pb-0">
            <CloudinaryImage src="/img/gallery/1.png" alt="Gallery" width={424}
              height={625}
              className=" h-[625px] object-cover  object-center mb-0 pb-0"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 h-full top-0 left-0">
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
          <div className=" col-span-2">
            <div className="">
                <div className="relative rounded-xl overflow-hidden group inline-block mb-5">
                  <CloudinaryImage src="/img/gallery/3.png" alt="Gallery" width={424}
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
                <div className="relative rounded-xl overflow-hidden group inline-block">
                  <CloudinaryImage src="/img/gallery/6.png" alt="Gallery" width={872}
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
          </div>
        </div>
      </div>
    </section>
  );
}
