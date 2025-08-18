// Test the actual API call from frontend context
const API_BASE_URL = 'http://localhost:8000/api';

async function testFrontendGalleryAPI() {
  console.log('🧪 Testing Frontend Gallery API Call...');
  
  try {
    const url = `${API_BASE_URL}/gallery/public`;
    console.log('Making request to:', url);
    
    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    };

    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ HTTP Error:', response.status, errorText);
      return;
    }

    const data = await response.json();
    console.log('✅ Raw API response:', data);
    
    // Apply the same logic as galleryService
    let galleryItems = [];
    
    if (data.success && Array.isArray(data.data)) {
      const apiData = data.data;
      
      if (apiData.length > 0 && apiData[0].items && Array.isArray(apiData[0].items)) {
        galleryItems = apiData[0].items;
        console.log('✅ Extracted items from embedded structure');
      } else {
        galleryItems = apiData;
        console.log('✅ Using individual items directly');
      }
    }
    
    console.log(`✅ Found ${galleryItems.length} gallery items`);
    galleryItems.forEach((item, index) => {
      console.log(`${index + 1}. ${item.image?.substring(0, 50)}... (Order: ${item.order})`);
    });
    
    return galleryItems;
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testFrontendGalleryAPI();
