// CryptoRider NFT Deployment Script
// This script helps you deploy your NFT collection to Ethereum mainnet

const DEPLOYMENT_CONFIG = {
    // Contract Configuration
    contractName: "CryptoRider NFT",
    contractSymbol: "CRIDER",
    maxSupply: 1000,
    mintPrice: "0.05", // ETH
    maxMintAmount: 5,
    
    // Network Configuration
    networks: {
        ethereum: {
            chainId: 1,
            name: "Ethereum Mainnet",
            rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
            blockExplorer: "https://etherscan.io"
        },
        goerli: {
            chainId: 5,
            name: "Goerli Testnet",
            rpcUrl: "https://goerli.infura.io/v3/YOUR_INFURA_KEY",
            blockExplorer: "https://goerli.etherscan.io"
        }
    },
    
    // Deployment Steps
    steps: [
        {
            id: 1,
            title: "Generate NFT Collection",
            description: "Run npm run build to generate your NFT images and metadata",
            command: "npm run build",
            status: "pending"
        },
        {
            id: 2,
            title: "Upload to IPFS",
            description: "Upload images and metadata to Pinata for IPFS hosting",
            url: "https://pinata.cloud",
            status: "pending"
        },
        {
            id: 3,
            title: "Deploy Contract",
            description: "Deploy your smart contract to Ethereum mainnet using Remix",
            url: "https://remix.ethereum.org",
            status: "pending"
        },
        {
            id: 4,
            title: "Verify Contract",
            description: "Verify your contract on Etherscan for transparency",
            url: "https://etherscan.io",
            status: "pending"
        },
        {
            id: 5,
            title: "Update Frontend",
            description: "Update your frontend with the deployed contract address",
            status: "pending"
        },
        {
            id: 6,
            title: "Test Deployment",
            description: "Test your complete NFT minting application",
            status: "pending"
        }
    ],
    
    // Gas Estimation
    gasEstimates: {
        contractDeployment: {
            low: 1500000,
            medium: 2000000,
            high: 2500000
        },
        reveal: {
            low: 50000,
            medium: 75000,
            high: 100000
        },
        mint: {
            low: 150000,
            medium: 200000,
            high: 250000
        }
    },
    
    // Cost Estimation (in USD)
    costEstimates: {
        low: {
            gasPrice: 20, // gwei
            ethPrice: 2000, // USD
            deployment: 60,
            reveal: 20,
            total: 80
        },
        medium: {
            gasPrice: 30,
            ethPrice: 2000,
            deployment: 120,
            reveal: 30,
            total: 150
        },
        high: {
            gasPrice: 50,
            ethPrice: 2000,
            deployment: 250,
            reveal: 50,
            total: 300
        }
    }
};

// Contract ABI for deployment
const CONTRACT_ABI = [
    {
        "inputs": [
            {"internalType": "string", "name": "_name", "type": "string"},
            {"internalType": "string", "name": "_symbol", "type": "string"},
            {"internalType": "string", "name": "_initBaseURI", "type": "string"},
            {"internalType": "string", "name": "_initNotRevealedUri", "type": "string"}
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
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
        "name": "cost",
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
        "inputs": [{"internalType": "uint256", "name": "_mintAmount", "type": "uint256"}],
        "name": "mint",
        "outputs": [],
        "stateMutability": "payable",
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
        "name": "reveal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "bool", "name": "_state", "type": "bool"}],
        "name": "pause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
];

// Deployment checklist
const DEPLOYMENT_CHECKLIST = {
    preDeployment: [
        "✅ MetaMask wallet with sufficient ETH",
        "✅ Pinata account created",
        "✅ NFT images and metadata generated",
        "✅ Contract code reviewed",
        "✅ Gas prices checked",
        "✅ Test deployment on testnet"
    ],
    postDeployment: [
        "✅ Contract address saved",
        "✅ Contract verified on Etherscan",
        "✅ Frontend updated with contract address",
        "✅ IPFS URLs updated",
        "✅ Test minting works",
        "✅ Reveal function tested"
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DEPLOYMENT_CONFIG,
        CONTRACT_ABI,
        DEPLOYMENT_CHECKLIST
    };
}

// Browser usage
if (typeof window !== 'undefined') {
    window.CryptoRiderDeployment = {
        config: DEPLOYMENT_CONFIG,
        abi: CONTRACT_ABI,
        checklist: DEPLOYMENT_CHECKLIST
    };
}
