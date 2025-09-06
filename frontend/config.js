// Configuration for the NFT Minting App
const CONFIG = {
    // Contract Configuration
    CONTRACT_ADDRESS: "0xe38510546F0D5d7b0a2c498B5d597632C3A75695", // Replace with your deployed contract address
    CONTRACT_ABI: [
        // ERC-721 Standard ABI - Replace with your actual contract ABI
        {
            "inputs": [],
            "name": "name",
            "outputs": [{"internalType": "string", "name": "", "type": "string"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [{"internalType": "string", "name": "", "type": "string"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "maxSupply",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "mintPrice",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
            "name": "tokenURI",
            "outputs": [{"internalType": "string", "name": "", "type": "string"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "mint",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [{"internalType": "address", "name": "to", "type": "address"}, {"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
            "name": "mintTo",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
            "name": "balanceOf",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {"internalType": "uint256", "name": "index", "type": "uint256"}],
            "name": "tokenOfOwnerByIndex",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
            "name": "ownerOf",
            "outputs": [{"internalType": "address", "name": "", "type": "address"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {"indexed": true, "internalType": "address", "name": "from", "type": "address"},
                {"indexed": true, "internalType": "address", "name": "to", "type": "address"},
                {"indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256"}
            ],
            "name": "Transfer",
            "type": "event"
        }
    ],
    
    // Network Configuration
    NETWORKS: {
        ethereum: {
            chainId: 1,
            name: "Ethereum Mainnet",
            rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
            blockExplorer: "https://etherscan.io"
        },
        polygon: {
            chainId: 137,
            name: "Polygon Mainnet",
            rpcUrl: "https://polygon-rpc.com",
            blockExplorer: "https://polygonscan.com"
        },
        mumbai: {
            chainId: 80001,
            name: "Polygon Mumbai Testnet",
            rpcUrl: "https://rpc-mumbai.maticvigil.com",
            blockExplorer: "https://mumbai.polygonscan.com"
        },
        goerli: {
            chainId: 5,
            name: "Goerli Testnet",
            rpcUrl: "https://goerli.infura.io/v3/YOUR_INFURA_KEY",
            blockExplorer: "https://goerli.etherscan.io"
        }
    },
    
    // Current Network (change this to switch networks)
    CURRENT_NETWORK: "mumbai", // Options: ethereum, polygon, mumbai, goerli
    
    // App Configuration
    APP: {
        name: "CryptoRider NFT Collection",
        description: "Unique anime character combinations from Naruto, Pokemon, and Demon Slayer",
        maxMintPerTransaction: 5,
        defaultMintPrice: "0.01", // in MATIC (free testnet)
        ipfsBaseUrl: "https://gateway.pinata.cloud/ipfs/", // Your IPFS gateway
        collectionSize: 1000, // Total collection size
        previewImages: [
            "https://via.placeholder.com/400x400/6366f1/ffffff?text=Preview+1",
            "https://via.placeholder.com/400x400/8b5cf6/ffffff?text=Preview+2",
            "https://via.placeholder.com/400x400/ec4899/ffffff?text=Preview+3"
        ]
    },
    
    // Metadata Configuration
    METADATA: {
        baseUri: "ipfs://YOUR_IPFS_CID/", // Replace with your actual IPFS CID
        description: "Unique anime character combinations from Naruto, Pokemon, and Demon Slayer",
        externalUrl: "https://your-website.com",
        image: "ipfs://YOUR_IPFS_CID/preview.png"
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
