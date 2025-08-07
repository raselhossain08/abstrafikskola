'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface CloudinaryImage {
  _id: string;
  originalPath: string;
  originalName: string;
  category: string;
  subcategory: string;
  cloudinaryPublicId: string;
  cloudinarySecureUrl: string;
  cloudinaryFormat: string;
  width?: number;
  height?: number;
  fileSize: number;
  usedIn: Array<{
    component: string;
    file: string;
    line: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface CloudinaryContextType {
  getImageUrl: (originalPath: string) => string | null;
  isLoading: boolean;
  error: string | null;
  getAllImages: () => CloudinaryImage[];
  getImagesByCategory: (category: string) => CloudinaryImage[];
}

const CloudinaryContext = createContext<CloudinaryContextType | undefined>(
  undefined
);

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

// Global cache - shared across all components
let globalImagesCache: Map<string, CloudinaryImage> = new Map();
let lastFetchTime: number = 0;
let isCurrentlyFetching = false;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const CloudinaryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<CloudinaryImage[]>([]);

  // Single fetch function that prevents multiple concurrent requests
  const fetchImages = async () => {
    const now = Date.now();

    // Return cached data if still valid
    if (globalImagesCache.size > 0 && now - lastFetchTime < CACHE_DURATION) {
      setImages(Array.from(globalImagesCache.values()));
      return;
    }

    // Prevent multiple concurrent fetches
    if (isCurrentlyFetching) {
      console.log('⏳ Already fetching images, skipping...');
      return;
    }

    isCurrentlyFetching = true;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/images`);

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            'Too many requests. Using cached data or local fallback.'
          );
        }
        throw new Error(`Failed to fetch images: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        const imagesList = data.data as CloudinaryImage[];

        // Update global cache
        globalImagesCache.clear();
        imagesList.forEach((image) => {
          globalImagesCache.set(image.originalPath, image);
        });
        lastFetchTime = now;

        setImages(imagesList);
        console.log(
          `✅ Loaded ${imagesList.length} images from Cloudinary API`
        );
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('❌ Error fetching images:', errorMessage);

      // Use cached data if available, even if stale
      if (globalImagesCache.size > 0) {
        setImages(Array.from(globalImagesCache.values()));
        console.log('🔄 Using stale cached data due to fetch error');
      }
    } finally {
      setIsLoading(false);
      isCurrentlyFetching = false;
    }
  };

  // Get image URL by original path
  const getImageUrl = (originalPath: string): string | null => {
    // Normalize path (ensure it starts with /)
    const normalizedPath = originalPath.startsWith('/')
      ? originalPath
      : `/${originalPath}`;
    const image = globalImagesCache.get(normalizedPath);

    if (image) {
      return image.cloudinarySecureUrl;
    }

    // Return null if not found (will use local fallback)
    return null;
  };

  // Get all images
  const getAllImages = (): CloudinaryImage[] => {
    return Array.from(globalImagesCache.values());
  };

  // Get images by category
  const getImagesByCategory = (category: string): CloudinaryImage[] => {
    return Array.from(globalImagesCache.values()).filter(
      (image) => image.category === category
    );
  };

  // Fetch images on component mount
  useEffect(() => {
    console.log('🔄 CloudinaryProvider mounted, fetching images...');
    fetchImages();
  }, []);

  const contextValue: CloudinaryContextType = {
    getImageUrl,
    isLoading,
    error,
    getAllImages,
    getImagesByCategory,
  };

  return (
    <CloudinaryContext.Provider value={contextValue}>
      {children}
    </CloudinaryContext.Provider>
  );
};

// Hook to use the CloudinaryContext
export const useCloudinaryImages = () => {
  const context = useContext(CloudinaryContext);
  if (context === undefined) {
    throw new Error(
      'useCloudinaryImages must be used within a CloudinaryProvider'
    );
  }
  return context;
};
