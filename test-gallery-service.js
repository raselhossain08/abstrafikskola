// Test the gallery service directly
const { galleryService } = require('./src/services/galleryService.ts');

async function testGalleryService() {
  console.log('🧪 Testing Gallery Service...');
  
  try {
    const response = await galleryService.getPublicGallery();
    
    console.log('✅ Service Response:');
    console.log('Success:', response.success);
    console.log('Data length:', response.data ? response.data.length : 0);
    console.log('Error:', response.error);
    
    if (response.success && response.data) {
      console.log('\n📋 Gallery Items:');
      response.data.forEach((item, index) => {
        console.log(`${index + 1}. ${item.alt || 'No alt'} (${item.category})`);
      });
    }
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testGalleryService();
