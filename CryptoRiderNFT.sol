//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "contracts/access/Ownable.sol";

contract CryptoRiderNFT is ERC721Enumerable, Ownable {
    using Strings for uint256;

    string public baseURI;
    string public baseExtension = ".json";
    uint256 public cost = 0.05 ether; // 0.05 ETH mint price
    uint256 public maxSupply = 1000; // Total collection size
    uint256 public maxMintAmount = 5; // Max per transaction
    bool public paused = false;
    bool public revealed = false;
    string public notRevealedUri;
    
    // Events
    event Mint(address indexed to, uint256 indexed tokenId);
    event Reveal();

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        string memory _initNotRevealedUri
    ) ERC721(_name, _symbol) {
        setBaseURI(_initBaseURI);
        setNotRevealedURI(_initNotRevealedUri);
    }

    // Internal
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    // Public minting function
    function mint(uint256 _mintAmount) public payable {
        uint256 supply = totalSupply();
        require(!paused, "Minting is paused");
        require(_mintAmount > 0, "Must mint at least 1");
        require(_mintAmount <= maxMintAmount, "Exceeds max mint amount");
        require(supply + _mintAmount <= maxSupply, "Exceeds max supply");
        require(msg.value >= cost * _mintAmount, "Insufficient payment");

        for (uint256 i = 1; i <= _mintAmount; i++) {
            _safeMint(msg.sender, supply + i);
            emit Mint(msg.sender, supply + i);
        }
    }

    // Get all tokens owned by an address
    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    // Token URI function
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (revealed == false) {
            return notRevealedUri;
        }

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    // Only owner functions
    function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }

    function setMaxMintAmount(uint256 _newMaxMintAmount) public onlyOwner {
        maxMintAmount = _newMaxMintAmount;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function reveal() public onlyOwner {
        revealed = true;
        emit Reveal();
    }

    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success, "Withdrawal failed");
    }

    // Get contract info
    function getContractInfo() public view returns (
        string memory name,
        string memory symbol,
        uint256 totalSupply_,
        uint256 maxSupply_,
        uint256 cost_,
        uint256 maxMintAmount_,
        bool paused_,
        bool revealed_
    ) {
        return (
            name(),
            symbol(),
            totalSupply(),
            maxSupply,
            cost,
            maxMintAmount,
            paused,
            revealed
        );
    }
}
