# 🌐 IPFS Setup Guide for CryptoRider NFTs

## Step 1: Create Pinata Account
1. Go to [pinata.cloud](https://pinata.cloud)
2. Sign up with email
3. Verify your account
4. You get 1GB free storage

## Step 2: Upload Your Images
1. In Pinata dashboard, click "Upload"
2. Select "Folder"
3. Upload your `build/images` folder
4. **Expected Output**: You'll get a CID like `QmXxXxXx...`
5. **Save this CID** - you'll need it for your contract

## Step 3: Upload Your Metadata
1. Upload your `build/json` folder
2. **Expected Output**: You'll get another CID like `QmYyYyYy...`
3. **Save this CID** - you'll need it for your contract

## Step 4: Test Your IPFS Links
Your images will be accessible at:
- `https://gateway.pinata.cloud/ipfs/YOUR_IMAGES_CID/1.png`
- `https://gateway.pinata.cloud/ipfs/YOUR_IMAGES_CID/2.png`
- etc.

Your metadata will be accessible at:
- `https://gateway.pinata.cloud/ipfs/YOUR_METADATA_CID/1.json`
- `https://gateway.pinata.cloud/ipfs/YOUR_METADATA_CID/2.json`
- etc.

## Step 5: Update Your Configuration
Once you have your CIDs, update:
- `src/config.js` - baseUri
- `frontend/config.js` - METADATA.baseUri
