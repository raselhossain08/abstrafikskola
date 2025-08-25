import axios from "axios";

// Gallery API Service
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export interface SocialLinks {
  facebook: string;
  instagram: string;
}

export interface GalleryItem {
  _id: string;
  image: string;
  alt?: string;
  width?: number;
  height?: number;
  order?: number;
  socialLinks?: SocialLinks;
  createdAt?: string;
  updatedAt?: string;
}

export interface Gallery {
  _id: string;
  title?: string;
  items?: GalleryItem[];
  image?: string;
  category?: string;
  isActive: boolean;
  order?: number;
  views?: number;
  alt?: string;
  createdAt?: string;
  updatedAt?: string;
  socialLinks?: SocialLinks;
}

export const galleryService = {
  // Get public gallery data
  async getPublicGallery(lang: string = 'en'): Promise<Gallery[]> {
    try {
      console.log('Fetching public gallery data...');
      const res = await axios.get(`${API_BASE_URL}/api/gallery/public`);
      console.log('API Response:', res.data);
      
      const galleries = res.data.data || [];
      console.log('Galleries array:', galleries);
      
      // Process the mixed data structure
      const processedGalleries: Gallery[] = [];
      
      galleries.forEach((gallery: any, index: number) => {
        console.log(`Processing gallery ${index}:`, gallery);
        
        // If this gallery has nested items, add them first
        if (gallery.items && Array.isArray(gallery.items)) {
          gallery.items.forEach((item: any) => {
            processedGalleries.push({
              _id: item._id || `item-${Date.now()}-${Math.random()}`,
              image: item.image,
              alt: item.alt || 'Gallery image',
              socialLinks: item.socialLinks || gallery.socialLinks,
              category: item.category || 'gallery',
              isActive: true,
              order: item.order || processedGalleries.length
            });
          });
        }
        
        // Add the parent gallery if it has its own image
        if (gallery.image) {
          processedGalleries.push({
            _id: gallery._id || `gallery-${Date.now()}-${Math.random()}`,
            image: gallery.image,
            alt: gallery.alt || 'Gallery image',
            socialLinks: gallery.socialLinks,
            category: gallery.category || 'gallery',
            isActive: gallery.isActive !== false,
            order: gallery.order || processedGalleries.length
          });
        }
      });
      
      console.log('Processed galleries:', processedGalleries);
      return processedGalleries;
    } catch (error) {
      console.error('Error fetching public gallery:', error);
      return [];
    }
  },

  // Get all galleries
  async getAll(lang: string = 'en'): Promise<Gallery[]> {
    const res = await axios.get(`${API_BASE_URL}/api/gallery/public`);
    return res.data.data;
  },

  // Get single gallery by ID
  async getById(id: string): Promise<Gallery> {
    const res = await axios.get(`${API_BASE_URL}/${id}`);
    return res.data.data;
  },

  // Create new gallery
  async create(payload: Partial<Gallery>): Promise<Gallery> {
    const res = await axios.post(API_BASE_URL, payload);
    return res.data.data;
  },

  // Update gallery
  async update(id: string, payload: Partial<Gallery>): Promise<Gallery> {
    const res = await axios.put(`${API_BASE_URL}/${id}`, payload);
    return res.data.data;
  },

  // Delete gallery
  async remove(id: string): Promise<{ success: boolean }> {
    const res = await axios.delete(`${API_BASE_URL}/${id}`);
    return res.data;
  },
};