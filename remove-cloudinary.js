const fs = require('fs');
const path = require('path');

// Function to recursively find all TypeScript/JSX files
function findFiles(dir, fileTypes = ['.tsx', '.ts', '.jsx', '.js']) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  for (let file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      // Skip node_modules and .next directories
      if (file !== 'node_modules' && file !== '.next' && file !== 'temp') {
        results = results.concat(findFiles(filePath, fileTypes));
      }
    } else {
      const ext = path.extname(file);
      if (fileTypes.includes(ext)) {
        results.push(filePath);
      }
    }
  }
  
  return results;
}

// Function to remove Cloudinary imports and replace CloudinaryImage with Image
function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;
  
  // Remove CloudinaryImage import
  const cloudinaryImportRegex = /import\s*{\s*CloudinaryImage\s*}\s*from\s*['"][^'"]*['"];\s*\n?/g;
  if (cloudinaryImportRegex.test(content)) {
    content = content.replace(cloudinaryImportRegex, '');
    hasChanges = true;
    console.log(`✅ Removed CloudinaryImage import from: ${filePath}`);
  }
  
  // Remove CloudinaryImage from existing import statements
  const importWithCloudinaryRegex = /import\s*{\s*([^}]*),\s*CloudinaryImage\s*([^}]*)\s*}\s*from\s*['"][^'"]*['"];/g;
  if (importWithCloudinaryRegex.test(content)) {
    content = content.replace(importWithCloudinaryRegex, (match, before, after) => {
      const cleanBefore = before.trim();
      const cleanAfter = after.trim();
      const newImports = [cleanBefore, cleanAfter].filter(item => item && item !== ',').join(', ');
      return match.replace(/{\s*[^}]*\s*}/, `{ ${newImports} }`);
    });
    hasChanges = true;
    console.log(`✅ Cleaned CloudinaryImage from imports in: ${filePath}`);
  }
  
  // Replace CloudinaryImage with Image (case sensitive)
  const cloudinaryImageRegex = /<CloudinaryImage/g;
  if (cloudinaryImageRegex.test(content)) {
    content = content.replace(cloudinaryImageRegex, '<Image');
    hasChanges = true;
    console.log(`✅ Replaced CloudinaryImage with Image in: ${filePath}`);
  }
  
  // Ensure Image import exists if we're using Image component
  const hasImageUsage = /<Image\s/.test(content);
  const hasImageImport = /import.*Image.*from\s*['"]next\/image['"]/.test(content);
  
  if (hasImageUsage && !hasImageImport) {
    // Add Image import
    const importRegex = /(import.*from\s*['"]react['"];?\s*\n)/;
    if (importRegex.test(content)) {
      content = content.replace(importRegex, "$1import Image from 'next/image';\n");
      hasChanges = true;
      console.log(`✅ Added Image import to: ${filePath}`);
    } else {
      // Add at the beginning if no React import found
      content = "import Image from 'next/image';\n" + content;
      hasChanges = true;
      console.log(`✅ Added Image import at beginning of: ${filePath}`);
    }
  }
  
  if (hasChanges) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  
  return false;
}

// Main execution
const srcDir = path.join(__dirname, 'src');

if (fs.existsSync(srcDir)) {
  console.log('🔄 Starting Cloudinary removal process...\n');
  
  const files = findFiles(srcDir);
  let updatedCount = 0;
  
  for (const file of files) {
    if (updateFile(file)) {
      updatedCount++;
    }
  }
  
  console.log(`\n📊 Process completed:`);
  console.log(`✅ Updated files: ${updatedCount}`);
  console.log(`📁 Total files scanned: ${files.length}`);
  console.log(`🎉 Cloudinary has been removed from frontend!`);
  
} else {
  console.log('❌ Source directory not found');
}
