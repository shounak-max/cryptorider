# 🚀 CryptoRider NFT - Ethereum Mainnet Deployment Guide

## Overview
This guide will help you deploy your CryptoRider NFT collection to Ethereum mainnet, making your NFTs valuable and tradeable on major marketplaces like OpenSea.

## Prerequisites
- MetaMask wallet with ETH for gas fees (~$50-200 depending on gas prices)
- Pinata account for IPFS hosting (free tier available)
- Remix IDE or Hardhat for contract deployment

## Step 1: Prepare Your Assets

### 1.1 Generate Your NFT Collection
```bash
# Generate your NFT images and metadata
npm run build
```

This creates:
- `build/images/` - Your NFT images (1.png to 5.png)
- `build/json/` - Your metadata files

### 1.2 Upload to IPFS (Pinata)

1. **Create Pinata Account**:
   - Go to [pinata.cloud](https://pinata.cloud)
   - Sign up for free account
   - Verify your email

2. **Upload Images**:
   - Go to Pinata Dashboard
   - Click "Upload" → "Folder"
   - Upload your `build/images` folder
   - Copy the CID (e.g., `QmXxXxXx...`)

3. **Upload Metadata**:
   - Upload your `build/json` folder
   - Copy the CID for metadata

4. **Update Configuration**:
   - Update `src/config.js` with your IPFS CID
   - Update `frontend/config.js` with your IPFS CID

## Step 2: Deploy Smart Contract

### 2.1 Using Remix IDE (Recommended)

1. **Go to Remix**: [remix.ethereum.org](https://remix.ethereum.org)

2. **Create New File**:
   - Create `CryptoRiderNFT.sol`
   - Copy the contract code from `CryptoRiderNFT.sol`

3. **Compile Contract**:
   - Go to "Solidity Compiler" tab
   - Select version 0.8.7
   - Click "Compile CryptoRiderNFT.sol"

4. **Deploy Contract**:
   - Go to "Deploy & Run Transactions" tab
   - Select "Injected Web3" (MetaMask)
   - Make sure you're on Ethereum Mainnet
   - Enter constructor parameters:
     - `_name`: "CryptoRider NFT"
     - `_symbol`: "CRIDER"
     - `_initBaseURI`: "ipfs://YOUR_IMAGES_CID/"
     - `_initNotRevealedUri`: "ipfs://YOUR_METADATA_CID/hidden.json"
   - Click "Deploy"
   - Confirm transaction in MetaMask

5. **Verify Contract**:
   - Copy the deployed contract address
   - Go to [etherscan.io](https://etherscan.io)
   - Search for your contract
   - Click "Verify and Publish"
   - Upload your source code

### 2.2 Using Hardhat (Advanced)

```bash
# Install Hardhat
npm install --save-dev hardhat

# Initialize Hardhat
npx hardhat init

# Deploy contract
npx hardhat run scripts/deploy.js --network mainnet
```

## Step 3: Update Frontend

### 3.1 Update Contract Address
```javascript
// In frontend/config.js
CONTRACT_ADDRESS: "0xYourDeployedContractAddress"
```

### 3.2 Update ABI
```javascript
// In frontend/config.js
CONTRACT_ABI: [/* Your actual contract ABI from Remix */]
```

### 3.3 Update IPFS URLs
```javascript
// In frontend/config.js
METADATA: {
    baseUri: "ipfs://YOUR_IMAGES_CID/",
    // ... other metadata
}
```

## Step 4: Test Your Deployment

### 4.1 Local Testing
1. Open `frontend/index.html` in browser
2. Connect MetaMask to Ethereum Mainnet
3. Test minting functionality
4. Verify NFTs appear in your wallet

### 4.2 Deploy Frontend
1. **Netlify**: Drag and drop `frontend` folder
2. **Vercel**: Import from GitHub
3. **GitHub Pages**: Push to GitHub and enable Pages

## Step 5: Launch Your Collection

### 5.1 Pre-Launch Checklist
- [ ] Contract deployed and verified on Etherscan
- [ ] Images and metadata uploaded to IPFS
- [ ] Frontend deployed and working
- [ ] Test minting works correctly
- [ ] Contract functions tested (pause, reveal, etc.)

### 5.2 Launch Strategy
1. **Reveal Collection**: Call `reveal()` function
2. **Set Final Price**: Adjust `cost` if needed
3. **Unpause**: Set `paused = false`
4. **Promote**: Share on social media, Discord, Twitter

### 5.3 Post-Launch
- Monitor contract on Etherscan
- Track sales and activity
- Consider listing on OpenSea
- Engage with community

## Cost Breakdown

### Gas Fees (Approximate)
- **Contract Deployment**: $50-200 (depending on gas prices)
- **Reveal Transaction**: $20-50
- **Price Updates**: $10-30 each

### Ongoing Costs
- **IPFS Hosting**: Free (Pinata free tier)
- **Frontend Hosting**: Free (Netlify/Vercel)
- **Domain**: $10-15/year (optional)

## Security Considerations

1. **Test on Testnet First**: Deploy to Goerli/Sepolia first
2. **Verify Contract**: Always verify on Etherscan
3. **Secure Private Keys**: Never share your private keys
4. **Test All Functions**: Verify pause, reveal, withdraw work
5. **Monitor Contract**: Watch for unusual activity

## Troubleshooting

### Common Issues
- **High Gas Fees**: Wait for lower gas prices
- **Transaction Fails**: Increase gas limit
- **Contract Not Verified**: Check source code matches
- **Images Not Loading**: Verify IPFS CID is correct

### Getting Help
- Check Etherscan for transaction details
- Use Remix debugger for contract issues
- Join Ethereum developer communities

## Success Metrics

Track these metrics after launch:
- Total minted NFTs
- Revenue generated
- Gas fees spent
- Community engagement
- OpenSea listings

---

## 🎉 Ready to Launch!

Your CryptoRider NFT collection is now ready for Ethereum mainnet deployment. Follow this guide step by step, and you'll have a professional NFT collection live on the blockchain!

**Good luck with your launch!** 🚀
