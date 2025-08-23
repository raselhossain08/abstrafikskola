// Simple test to verify gallery API processing
const fetch = require('node-fetch');

async function testGalleryAPI() {
  try {
    console.log('🧪 Testing Gallery API directly...');
    
    const response = await fetch('http://localhost:8000/api/gallery/public');
    const data = await response.json();
    
    console.log('✅ API Response received:');
    console.log('📊 Success:', data.success);
    console.log('📊 Data type:', typeof data.data);
    console.log('📊 Is array:', Array.isArray(data.data));
    console.log('📊 Length:', data.data?.length);
    
    if (data.data && Array.isArray(data.data)) {
      console.log('\n� Analyzing items:');
      data.data.forEach((item, index) => {
        console.log(`Item ${index}:`, {
          hasItems: !!item.items,
          hasImage: !!item.image,
          itemsCount: item.items?.length || 0,
          title: item.title || 'No title'
        });
      });
      
      // Simulate the processing logic
      let galleryItems = [];
      
      data.data.forEach((item, index) => {
        // Process nested items
        if (item.items && Array.isArray(item.items)) {
          console.log(`🎯 Processing ${item.items.length} nested items from item ${index}`);
          galleryItems.push(...item.items);
        }
        
        // Process direct item if it has image
        if (item.image) {
          console.log(`📸 Processing direct item ${index} with image`);
          galleryItems.push(item);
        }
      });
      
      console.log(`\n✅ Total processed items: ${galleryItems.length}`);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testGalleryAPI();
