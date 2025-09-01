# Hostinger Deployment Guide for abstrafikskola

## Prerequisites
1. **Hostinger Account**: Ensure you have a Hostinger hosting plan that supports Node.js applications
2. **Git Repository**: Your code is already pushed to GitHub (✅ Done)

## Deployment Options for Hostinger

### Option 1: Using Hostinger's Git Integration (Recommended)
1. **Login to Hostinger Control Panel**
2. **Navigate to Website Section** → Select your domain
3. **Go to Git** (if available in your plan)
4. **Connect Repository**:
   - Repository URL: `https://github.com/raselhossain08/abstrafikskola.git`
   - Branch: `Master`
   - Target directory: `public_html` (or your preferred directory)

### Option 2: Manual Upload via File Manager
1. Build the project locally: `npm run build`
2. Upload the following to Hostinger via File Manager:
   - `.next` folder (generated after build)
   - `public` folder
   - `package.json`
   - `package-lock.json`
   - `next.config.ts`
   - Any other config files

### Option 3: FTP Upload
1. Build the project locally
2. Use FTP client (FileZilla, etc.) to upload built files

## Environment Variables Setup
Add these to Hostinger environment variables:
```
GOOGLE_TRANSLATE_API_KEY=AIzaSyDo7wP1q9XtALVshxeNcdx_EqnHpq0YXu4
NODE_ENV=production
```

## Build Command for Production
```bash
npm run build
npm start
```

## Important Files for Deployment
- `package.json` - Dependencies
- `next.config.ts` - Next.js configuration  
- `.next` - Built application
- `public` - Static assets
- Environment variables configuration

## Post-Deployment Checklist
1. ✅ Test language switching (Arabic, Swedish, English)
2. ✅ Verify Google Translation API is working
3. ✅ Check RTL layout for Arabic
4. ✅ Test all forms and contact functionality
5. ✅ Verify all images and assets load correctly

## Troubleshooting
- If translation doesn't work, check API key in environment variables
- For 404 errors, ensure `.htaccess` or server configuration supports Next.js routing
- Check Node.js version compatibility (recommended: Node 18+)
