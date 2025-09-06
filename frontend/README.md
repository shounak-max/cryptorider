# CryptoRider NFT Frontend

A modern, responsive web application for minting and viewing CryptoRider NFTs with MetaMask integration.

## Features

- 🔗 **MetaMask Integration** - Connect wallet and interact with smart contracts
- 🎨 **Modern UI** - Beautiful, responsive design with smooth animations
- 🖼️ **NFT Gallery** - View and interact with your NFT collection
- 💰 **Minting Interface** - Easy-to-use minting with real-time price updates
- 📱 **Mobile Responsive** - Works perfectly on all devices
- 🔔 **Toast Notifications** - Real-time feedback for all actions
- 🌐 **Multi-Network Support** - Ethereum, Polygon, and testnets

## Setup Instructions

### 1. Prerequisites

- Node.js (LTS version)
- MetaMask browser extension
- A deployed smart contract (ERC-721)

### 2. Configuration

1. **Update Contract Address**
   ```javascript
   // In config.js
   CONTRACT_ADDRESS: "0xYourDeployedContractAddress"
   ```

2. **Update Contract ABI**
   ```javascript
   // In config.js - Replace with your actual contract ABI
   CONTRACT_ABI: [/* Your contract ABI */]
   ```

3. **Set IPFS Base URL**
   ```javascript
   // In config.js
   METADATA: {
       baseUri: "ipfs://YourIPFSCID/",
       // ... other metadata
   }
   ```

4. **Choose Network**
   ```javascript
   // In config.js
   CURRENT_NETWORK: "mumbai" // Options: ethereum, polygon, mumbai, goerli
   ```

### 3. Deploy

#### Option A: Local Development
1. Open `index.html` in your browser
2. Make sure MetaMask is installed and connected

#### Option B: Deploy to Netlify/Vercel
1. Upload all files to your hosting service
2. Set up custom domain (optional)
3. Update any hardcoded URLs

### 4. Smart Contract Requirements

Your smart contract should include these functions:

```solidity
// Required functions for the frontend
function name() public view returns (string memory)
function symbol() public view returns (string memory)
function totalSupply() public view returns (uint256)
function maxSupply() public view returns (uint256)
function mintPrice() public view returns (uint256)
function mint() public payable
function tokenURI(uint256 tokenId) public view returns (string memory)
function balanceOf(address owner) public view returns (uint256)
function ownerOf(uint256 tokenId) public view returns (address)
```

## File Structure

```
frontend/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── app.js             # Main JavaScript application
├── config.js          # Configuration file
└── README.md          # This file
```

## Customization

### Styling
- Edit `styles.css` to customize colors, fonts, and layout
- Update CSS variables for consistent theming

### Content
- Modify `index.html` to change text content
- Update `config.js` for app configuration

### Functionality
- Extend `app.js` for additional features
- Add new contract methods as needed

## Network Configuration

The app supports multiple networks:

- **Ethereum Mainnet** (Chain ID: 1)
- **Polygon Mainnet** (Chain ID: 137)
- **Polygon Mumbai Testnet** (Chain ID: 80001)
- **Goerli Testnet** (Chain ID: 5)

## Troubleshooting

### Common Issues

1. **"MetaMask is not installed"**
   - Install MetaMask browser extension
   - Refresh the page

2. **"Failed to connect wallet"**
   - Check if MetaMask is unlocked
   - Try refreshing the page

3. **"Wrong network"**
   - Switch to the correct network in MetaMask
   - The app will prompt you to switch networks

4. **"Contract not deployed"**
   - Make sure you've deployed your contract
   - Update the contract address in config.js

5. **"Transaction failed"**
   - Check if you have enough ETH for gas
   - Ensure you have enough ETH for the mint price

### Debug Mode

Enable debug mode by opening browser console (F12) to see detailed error messages.

## Support

For issues and questions:
1. Check the browser console for errors
2. Verify your contract deployment
3. Ensure MetaMask is properly configured
4. Check network connectivity

## License

MIT License - Feel free to use and modify as needed.
