'use client';
import React, { useState, useEffect } from 'react';
import { useCloudinaryImages } from '@/contexts/CloudinaryContext';

// React component for dynamic images
interface CloudinaryImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
  onError?: () => void;
  [key: string]: any;
}

export const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  fallbackSrc,
  onError,
  ...props
}) => {
  const { getImageUrl, isLoading } = useCloudinaryImages();
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // Wait for loading to complete before trying to get URL
    if (!isLoading) {
      const url = getImageUrl(src);
      setImageUrl(url);

      if (!url) {
        console.log(`⚠️ No Cloudinary URL found for: ${src}, using fallback`);
        setImageError(true);
      } else {
        console.log(`✅ Using Cloudinary URL for ${src}: ${url}`);
        setImageError(false);
      }
    }
  }, [src, getImageUrl, isLoading]);

  const handleError = () => {
    console.log(`❌ Image loading failed for: ${imageUrl || src}`);
    setImageError(true);
    if (onError) {
      onError();
    }
  };

  // Use fallback or original src if Cloudinary URL not available or error occurred
  const finalSrc = imageError ? fallbackSrc || src : imageUrl || src;

  return React.createElement('img', {
    src: finalSrc,
    alt: alt,
    className: className,
    width: width,
    height: height,
    onError: handleError,
    ...props,
  });
};
