'use client';

import { useState, useCallback } from 'react';
import { headerApi, type HeaderContentData, type HeaderContentResponse } from '@/lib/headerApi';

export interface UseHeaderAdminReturn {
  // State
  headers: HeaderContentResponse[];
  currentHeader: HeaderContentResponse | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchAllHeaders: (page?: number, limit?: number) => Promise<void>;
  fetchHeaderById: (id: string) => Promise<void>;
  createHeader: (data: HeaderContentData) => Promise<boolean>;
  updateHeader: (id: string, data: HeaderContentData) => Promise<boolean>;
  deleteHeader: (id: string) => Promise<boolean>;
  toggleHeaderStatus: (id: string) => Promise<boolean>;
  uploadIcon: (file: File) => Promise<{ url: string; publicId: string } | null>;
  deleteIcon: (publicId: string) => Promise<boolean>;
  
  // Utilities
  clearError: () => void;
  clearCurrentHeader: () => void;
}

export const useHeaderAdmin = (): UseHeaderAdminReturn => {
  const [headers, setHeaders] = useState<HeaderContentResponse[]>([]);
  const [currentHeader, setCurrentHeader] = useState<HeaderContentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown, defaultMessage: string) => {
    const errorMessage = err instanceof Error ? err.message : defaultMessage;
    setError(errorMessage);
    console.error('❌ Header Admin Error:', errorMessage);
    return false;
  };

  const fetchAllHeaders = useCallback(async (page = 1, limit = 10) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await headerApi.getAllHeaders(page, limit);
      
      if (response.success && response.data) {
        setHeaders(response.data.headerContents);
        console.log(`✅ Fetched ${response.data.headerContents.length} headers`);
      } else {
        throw new Error('Failed to fetch headers');
      }
    } catch (err) {
      handleError(err, 'Failed to fetch headers');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchHeaderById = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await headerApi.getHeaderById(id);
      
      if (response.success && response.data) {
        setCurrentHeader(response.data);
        console.log(`✅ Fetched header with ID: ${id}`);
      } else {
        throw new Error(response.message || 'Failed to fetch header');
      }
    } catch (err) {
      handleError(err, 'Failed to fetch header');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createHeader = useCallback(async (data: HeaderContentData): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Validate data before sending
      const validation = headerApi.validateHeaderData(data);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }
      
      const response = await headerApi.createHeader(data);
      
      if (response.success && response.data) {
        setCurrentHeader(response.data);
        console.log('✅ Header created successfully');
        return true;
      } else {
        throw new Error(response.message || 'Failed to create header');
      }
    } catch (err) {
      handleError(err, 'Failed to create header');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateHeader = useCallback(async (id: string, data: HeaderContentData): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Validate data before sending
      const validation = headerApi.validateHeaderData(data);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }
      
      const response = await headerApi.updateHeader(id, data);
      
      if (response.success && response.data) {
        setCurrentHeader(response.data);
        // Update the header in the list if it exists
        setHeaders(prev => 
          prev.map(header => header._id === id ? response.data! : header)
        );
        console.log(`✅ Header updated successfully: ${id}`);
        return true;
      } else {
        throw new Error(response.message || 'Failed to update header');
      }
    } catch (err) {
      handleError(err, 'Failed to update header');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteHeader = useCallback(async (id: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await headerApi.deleteHeader(id);
      
      if (response.success) {
        // Remove from the list
        setHeaders(prev => prev.filter(header => header._id !== id));
        // Clear current header if it was deleted
        if (currentHeader?._id === id) {
          setCurrentHeader(null);
        }
        console.log(`✅ Header deleted successfully: ${id}`);
        return true;
      } else {
        throw new Error(response.message || 'Failed to delete header');
      }
    } catch (err) {
      handleError(err, 'Failed to delete header');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [currentHeader]);

  const toggleHeaderStatus = useCallback(async (id: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await headerApi.toggleHeaderStatus(id);
      
      if (response.success && response.data) {
        // Update the header in the list
        setHeaders(prev => 
          prev.map(header => header._id === id ? response.data! : header)
        );
        // Update current header if it matches
        if (currentHeader?._id === id) {
          setCurrentHeader(response.data);
        }
        console.log(`✅ Header status toggled: ${id}`);
        return true;
      } else {
        throw new Error(response.message || 'Failed to toggle header status');
      }
    } catch (err) {
      handleError(err, 'Failed to toggle header status');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [currentHeader]);

  const uploadIcon = useCallback(async (file: File): Promise<{ url: string; publicId: string } | null> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await headerApi.uploadIcon(file);
      
      if (response.success && response.data) {
        console.log('✅ Icon uploaded successfully');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to upload icon');
      }
    } catch (err) {
      handleError(err, 'Failed to upload icon');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteIcon = useCallback(async (publicId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await headerApi.deleteIcon(publicId);
      
      if (response.success) {
        console.log(`✅ Icon deleted successfully: ${publicId}`);
        return true;
      } else {
        throw new Error(response.message || 'Failed to delete icon');
      }
    } catch (err) {
      handleError(err, 'Failed to delete icon');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearCurrentHeader = useCallback(() => {
    setCurrentHeader(null);
  }, []);

  return {
    // State
    headers,
    currentHeader,
    isLoading,
    error,
    
    // Actions
    fetchAllHeaders,
    fetchHeaderById,
    createHeader,
    updateHeader,
    deleteHeader,
    toggleHeaderStatus,
    uploadIcon,
    deleteIcon,
    
    // Utilities
    clearError,
    clearCurrentHeader,
  };
};

// Export default for convenience
export default useHeaderAdmin;
