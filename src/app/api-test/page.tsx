'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import heroContentService from '@/services/heroContentService';

export default function ApiTestPage() {
  const { language, setLanguage } = useLanguage();
  const [testResults, setTestResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runTest = async () => {
    setLoading(true);
    setError(null);
    setTestResults(null);

    try {
      console.log('🧪 Running API test...');
      
      // Test 1: Direct API call
      const directResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hero-content?lang=${language}`);
      const directData = await directResponse.json();
      
      // Test 2: Service call
      const serviceData = await heroContentService.getHeroContent(language);
      
      // Test 3: Check environment variables
      const envVars = {
        NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
      };

      setTestResults({
        directApiCall: {
          success: directResponse.ok,
          status: directResponse.status,
          data: directData
        },
        serviceCall: {
          success: true,
          data: serviceData
        },
        environment: envVars,
        language: language
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('🚨 API Test Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runTest();
  }, [language]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">API Test Page</h1>
        
        <div className="mb-4 space-x-4">
          <button 
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded ${language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            English
          </button>
          <button 
            onClick={() => setLanguage('sv')}
            className={`px-4 py-2 rounded ${language === 'sv' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Svenska
          </button>
          <button 
            onClick={() => setLanguage('ar')}
            className={`px-4 py-2 rounded ${language === 'ar' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            العربية
          </button>
        </div>

        <button 
          onClick={runTest}
          disabled={loading}
          className="mb-6 px-6 py-2 bg-green-500 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Run Test'}
        </button>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <h3 className="font-bold">Error:</h3>
            <p>{error}</p>
          </div>
        )}

        {testResults && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
                {JSON.stringify(testResults.environment, null, 2)}
              </pre>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Direct API Call</h2>
              <div className={`p-2 rounded mb-2 ${testResults.directApiCall.success ? 'bg-green-100' : 'bg-red-100'}`}>
                Status: {testResults.directApiCall.status} - {testResults.directApiCall.success ? 'SUCCESS' : 'FAILED'}
              </div>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
                {JSON.stringify(testResults.directApiCall.data, null, 2)}
              </pre>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Service Call</h2>
              <div className={`p-2 rounded mb-2 ${testResults.serviceCall.success ? 'bg-green-100' : 'bg-red-100'}`}>
                Status: {testResults.serviceCall.success ? 'SUCCESS' : 'FAILED'}
              </div>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
                {JSON.stringify(testResults.serviceCall.data, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
