'use client';

import dynamic from 'next/dynamic';
import ErrorBoundary from '@/components/common/ErrorBoundary';

// Dynamically import the Gallery component with no SSR to avoid hydration issues
const Gallery = dynamic(() => import('./Gallery'), {
  ssr: false,
  loading: () => (
    <section className="py-24 px-4 bg-[#F7FAFF]">
      <div className="w-full xl:w-[1320px] mx-auto text-center">
        <h2 className="text-48 font-bold mb-12 text-[#1D1F2C]">Gallery</h2>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-lg text-gray-600">Loading gallery...</p>
          </div>
        </div>
      </div>
    </section>
  )
});

export default function GalleryWrapper() {
  return (
    <ErrorBoundary
      fallback={
        <section className="py-24 px-4 bg-[#F7FAFF]">
          <div className="w-full xl:w-[1320px] mx-auto text-center">
            <h2 className="text-48 font-bold mb-12 text-[#1D1F2C]">Gallery</h2>
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="text-gray-400 text-4xl mb-4">📷</div>
                <p className="text-lg text-gray-600">Gallery temporarily unavailable</p>
              </div>
            </div>
          </div>
        </section>
      }
    >
      <Gallery />
    </ErrorBoundary>
  );
}
