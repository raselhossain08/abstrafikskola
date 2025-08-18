'use client';

import { useState, useEffect } from 'react';
import { galleryService, type GalleryItem } from '@/services/galleryService';

export default function GalleryTestPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testGalleryAPI = async () => {
      console.log('🧪 Starting Gallery API Test');
      setLoading(true);
      setError(null);
      
      try {
        const response = await galleryService.getPublicGallery();
        console.log('📡 Gallery service response:', response);
        
        if (response.success && response.data) {
          setResult({
            success: true,
            itemsCount: response.data.length,
            items: response.data.slice(0, 3), // Show first 3 items
            message: `Successfully loaded ${response.data.length} gallery items`
          });
        } else {
          setError(response.error || 'Unknown error occurred');
        }
      } catch (err) {
        console.error('🚨 Test error:', err);
        setError(err instanceof Error ? err.message : 'Test failed');
      } finally {
        setLoading(false);
      }
    };

    testGalleryAPI();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Gallery API Test</h1>
        
        {loading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
              <span className="text-blue-800">Testing Gallery API...</span>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-red-800 font-semibold mb-2">❌ API Test Failed</h2>
            <p className="text-red-700">{error}</p>
            <div className="mt-4 text-sm text-red-600">
              <p><strong>API URL:</strong> {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/gallery/public</p>
              <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
            </div>
          </div>
        )}
        
        {result && result.success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-green-800 font-semibold mb-4">✅ API Test Successful</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-green-800 mb-2">Test Results:</h3>
                <ul className="text-green-700 space-y-1">
                  <li>• Items loaded: {result.itemsCount}</li>
                  <li>• Message: {result.message}</li>
                  <li>• API URL: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/gallery/public</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-green-800 mb-2">Sample Items:</h3>
                <div className="space-y-2">
                  {result.items?.slice(0, 2).map((item: GalleryItem, index: number) => (
                    <div key={item._id || index} className="text-sm text-green-700 bg-white p-2 rounded">
                      <div>ID: {item._id}</div>
                      <div>Order: {item.order}</div>
                      <div>Has Image: {item.image ? '✅' : '❌'}</div>
                      {item.image && (
                        <div className="mt-2">
                          <img 
                            src={item.image} 
                            alt={item.alt || 'Gallery item'} 
                            className="w-16 h-16 object-cover rounded"
                            onError={() => console.log('Image load error:', item.image)}
                            onLoad={() => console.log('Image loaded successfully:', item.image)}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-8 bg-white border rounded-lg p-6">
          <h3 className="font-semibold mb-4">Debug Information:</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <div><strong>Frontend URL:</strong> {typeof window !== 'undefined' ? window.location.origin : 'N/A'}</div>
            <div><strong>API Base URL:</strong> {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}</div>
            <div><strong>Environment:</strong> {process.env.NODE_ENV}</div>
            <div><strong>User Agent:</strong> {typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 100) + '...' : 'N/A'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
