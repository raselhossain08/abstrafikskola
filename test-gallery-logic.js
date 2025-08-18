// Simple test for gallery service
async function testGalleryService() {
  try {
    console.log('Testing Gallery Service...');
    
    // Simulate the API response we're getting
    const mockApiResponse = {
      success: true,
      data: [
        {
          socialLinks: { facebook: "", instagram: "" },
          alt: "",
          category: "other",
          order: 0,
          _id: "68a34df1ea83903a383b0a48",
          title: "Our Gallery",
          items: [
            {
              image: "https://example.com/image1.jpg",
              width: 424,
              height: 625,
              socialLinks: { facebook: "https://facebook.com", instagram: "https://instagram.com" },
              order: 0,
              _id: "68a34df1ea83903a383b0a49"
            },
            {
              image: "https://example.com/image2.jpg", 
              width: 424,
              height: 625,
              socialLinks: { facebook: "https://facebook.com", instagram: "https://instagram.com" },
              order: 1,
              _id: "68a34df1ea83903a383b0a4a"
            }
          ],
          isActive: true
        }
      ]
    };

    // Test the extraction logic
    let galleryItems = [];
    
    if (Array.isArray(mockApiResponse.data)) {
      const apiData = mockApiResponse.data;
      
      if (apiData.length > 0 && apiData[0].items && Array.isArray(apiData[0].items)) {
        // Extract items from embedded structure
        galleryItems = apiData[0].items;
        console.log('✅ Extracted items from embedded structure');
      } else {
        // It's individual items already
        galleryItems = apiData;
        console.log('✅ Using individual items directly');
      }
    }
    
    console.log(`✅ Found ${galleryItems.length} gallery items`);
    galleryItems.forEach((item, index) => {
      console.log(`${index + 1}. ${item.image} (Order: ${item.order})`);
    });
    
    return galleryItems;
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testGalleryService();
