// Main Application JavaScript
class NFTCryptoRider {
    constructor() {
        this.web3 = null;
        this.contract = null;
        this.account = null;
        this.isConnected = false;
        this.currentNetwork = CONFIG.CURRENT_NETWORK;
        
        this.init();
    }

    async init() {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            this.web3 = new Web3(window.ethereum);
            this.setupEventListeners();
            this.loadCollection();
        } else {
            this.showToast('MetaMask is not installed. Please install MetaMask to continue.', 'error');
            this.disableMinting();
        }
    }

    setupEventListeners() {
        // Connect wallet button
        document.getElementById('connectWallet').addEventListener('click', () => {
            this.connectWallet();
        });

        // Mint button
        document.getElementById('mintButton').addEventListener('click', () => {
            this.mintNFT();
        });

        // View collection button
        document.getElementById('viewCollection').addEventListener('click', () => {
            document.getElementById('collection').scrollIntoView({ behavior: 'smooth' });
        });

        // Modal close
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            const modal = document.getElementById('nftModal');
            if (event.target === modal) {
                this.closeModal();
            }
        });

        // MetaMask account change
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
                this.disconnect();
            } else {
                this.account = accounts[0];
                this.updateUI();
            }
        });

        // MetaMask network change
        window.ethereum.on('chainChanged', (chainId) => {
            this.handleNetworkChange(parseInt(chainId, 16));
        });
    }

    async connectWallet() {
        try {
            this.showLoading(true);
            
            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            if (accounts.length === 0) {
                throw new Error('No accounts found');
            }

            this.account = accounts[0];
            this.isConnected = true;

            // Check if we're on the correct network
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            const currentChainId = parseInt(chainId, 16);

            if (currentChainId !== CONFIG.NETWORKS[this.currentNetwork].chainId) {
                await this.switchNetwork();
            }

            // Initialize contract
            await this.initializeContract();
            
            // Update UI
            this.updateUI();
            this.loadCollection();

            this.showToast('Wallet connected successfully!', 'success');

        } catch (error) {
            console.error('Error connecting wallet:', error);
            this.showToast(`Failed to connect wallet: ${error.message}`, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async switchNetwork() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${CONFIG.NETWORKS[this.currentNetwork].chainId.toString(16)}` }],
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: `0x${CONFIG.NETWORKS[this.currentNetwork].chainId.toString(16)}`,
                            chainName: CONFIG.NETWORKS[this.currentNetwork].name,
                            rpcUrls: [CONFIG.NETWORKS[this.currentNetwork].rpcUrl],
                            blockExplorerUrls: [CONFIG.NETWORKS[this.currentNetwork].blockExplorer]
                        }],
                    });
                } catch (addError) {
                    throw new Error('Failed to add network to MetaMask');
                }
            } else {
                throw new Error('Failed to switch network');
            }
        }
    }

    async initializeContract() {
        if (!this.web3 || !CONFIG.CONTRACT_ADDRESS) {
            throw new Error('Web3 not initialized or contract address not set');
        }

        this.contract = new this.web3.eth.Contract(
            CONFIG.CONTRACT_ABI,
            CONFIG.CONTRACT_ADDRESS
        );
    }

    async mintNFT() {
        if (!this.isConnected || !this.contract) {
            this.showToast('Please connect your wallet first', 'error');
            return;
        }

        try {
            this.showLoading(true);
            
            // Get mint price
            const mintPrice = await this.contract.methods.mintPrice().call();
            const priceInEth = this.web3.utils.fromWei(mintPrice, 'ether');

            // Estimate gas
            const gasEstimate = await this.contract.methods.mint().estimateGas({
                from: this.account,
                value: mintPrice
            });

            // Execute mint transaction
            const tx = await this.contract.methods.mint().send({
                from: this.account,
                value: mintPrice,
                gas: Math.floor(gasEstimate * 1.2) // Add 20% buffer
            });

            this.showToast(`NFT minted successfully! Transaction: ${tx.transactionHash}`, 'success');
            
            // Update UI
            await this.updateUI();
            await this.loadCollection();

        } catch (error) {
            console.error('Error minting NFT:', error);
            this.showToast(`Failed to mint NFT: ${error.message}`, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async updateUI() {
        if (!this.isConnected || !this.contract) {
            this.disableMinting();
            return;
        }

        try {
            // Update wallet button
            const connectBtn = document.getElementById('connectWallet');
            connectBtn.innerHTML = `<i class="fas fa-wallet"></i> ${this.account.slice(0, 6)}...${this.account.slice(-4)}`;
            connectBtn.disabled = false;

            // Enable mint button
            const mintBtn = document.getElementById('mintButton');
            mintBtn.disabled = false;

            // Update stats
            await this.updateStats();

        } catch (error) {
            console.error('Error updating UI:', error);
        }
    }

    async updateStats() {
        try {
            if (!this.contract) return;

            const totalSupply = await this.contract.methods.totalSupply().call();
            const maxSupply = await this.contract.methods.maxSupply().call();
            const mintPrice = await this.contract.methods.mintPrice().call();
            const priceInEth = this.web3.utils.fromWei(mintPrice, 'ether');

            document.getElementById('totalSupply').textContent = maxSupply;
            document.getElementById('mintedCount').textContent = totalSupply;
            document.getElementById('price').textContent = parseFloat(priceInEth).toFixed(3);

        } catch (error) {
            console.error('Error updating stats:', error);
        }
    }

    async loadCollection() {
        try {
            const collectionGrid = document.getElementById('collectionGrid');
            collectionGrid.innerHTML = '';

            // For demo purposes, show placeholder NFTs
            // In a real app, you would fetch from your contract or IPFS
            const placeholderNFTs = [
                { id: 1, name: "CryptoRider #1", image: "https://via.placeholder.com/250x250/6366f1/ffffff?text=NFT+1" },
                { id: 2, name: "CryptoRider #2", image: "https://via.placeholder.com/250x250/8b5cf6/ffffff?text=NFT+2" },
                { id: 3, name: "CryptoRider #3", image: "https://via.placeholder.com/250x250/ec4899/ffffff?text=NFT+3" },
                { id: 4, name: "CryptoRider #4", image: "https://via.placeholder.com/250x250/10b981/ffffff?text=NFT+4" },
                { id: 5, name: "CryptoRider #5", image: "https://via.placeholder.com/250x250/f59e0b/ffffff?text=NFT+5" }
            ];

            placeholderNFTs.forEach(nft => {
                const nftCard = this.createNFTCard(nft);
                collectionGrid.appendChild(nftCard);
            });

        } catch (error) {
            console.error('Error loading collection:', error);
        }
    }

    createNFTCard(nft) {
        const card = document.createElement('div');
        card.className = 'nft-card';
        card.onclick = () => this.showNFTDetails(nft);

        card.innerHTML = `
            <img src="${nft.image}" alt="${nft.name}">
            <div class="nft-card-info">
                <h3 class="nft-card-title">${nft.name}</h3>
                <p class="nft-card-id">#${nft.id}</p>
            </div>
        `;

        return card;
    }

    showNFTDetails(nft) {
        const modal = document.getElementById('nftModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalAttributes = document.getElementById('modalAttributes');

        modalImage.src = nft.image;
        modalTitle.textContent = nft.name;
        modalDescription.textContent = "A unique combination of anime characters from Naruto, Pokemon, and Demon Slayer.";

        // Mock attributes
        const attributes = [
            { trait_type: "Left Strip", value: "Naruto Character" },
            { trait_type: "Middle Strip", value: "Pokemon Character" },
            { trait_type: "Right Strip", value: "Demon Slayer Character" },
            { trait_type: "Rarity", value: "Common" }
        ];

        modalAttributes.innerHTML = attributes.map(attr => `
            <div class="attribute">
                <span class="attribute-trait">${attr.trait_type}</span>
                <span class="attribute-value">${attr.value}</span>
            </div>
        `).join('');

        modal.style.display = 'block';
    }

    closeModal() {
        document.getElementById('nftModal').style.display = 'none';
    }

    disconnect() {
        this.account = null;
        this.isConnected = false;
        this.contract = null;

        const connectBtn = document.getElementById('connectWallet');
        connectBtn.innerHTML = '<i class="fas fa-wallet"></i> Connect Wallet';
        connectBtn.disabled = false;

        this.disableMinting();
    }

    disableMinting() {
        const mintBtn = document.getElementById('mintButton');
        mintBtn.disabled = true;
        mintBtn.innerHTML = '<i class="fas fa-plus"></i> Connect Wallet to Mint';
    }

    handleNetworkChange(chainId) {
        const expectedChainId = CONFIG.NETWORKS[this.currentNetwork].chainId;
        if (chainId !== expectedChainId) {
            this.showToast(`Please switch to ${CONFIG.NETWORKS[this.currentNetwork].name}`, 'warning');
        }
    }

    showLoading(show) {
        const loadingOverlay = document.getElementById('loadingOverlay');
        loadingOverlay.style.display = show ? 'block' : 'none';
    }

    showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        toastContainer.appendChild(toast);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 5000);
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.nftApp = new NFTCryptoRider();
});

// Utility functions
function formatAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatEther(wei) {
    return window.web3 ? window.web3.utils.fromWei(wei, 'ether') : '0';
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NFTCryptoRider;
}
