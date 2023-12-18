import React from 'react';
import Image from 'next/image';

const nfts = [
  {
    id: 1,
    name: 'Abstract NFT',
    image: 'https://source.unsplash.com/300x300/?nft,abstract',
  },
  {
    id: 2,
    name: 'Crypto Art',
    image: 'https://source.unsplash.com/300x300/?nft,crypto',
  },
  {
    id: 3,
    name: 'Digital Collectible',
    image: 'https://source.unsplash.com/300x300/?nft,digital',
  },
  {
    id: 4,
    name: 'Blockchain Art',
    image: 'https://source.unsplash.com/300x300/?nft,blockchain',
  },
  {
    id: 5,
    name: 'NFT Marketplace',
    image: 'https://source.unsplash.com/300x300/?nft,marketplace',
  },
  {
    id: 6,
    name: 'Artistic NFT',
    image: 'https://source.unsplash.com/300x300/?nft,artistic',
  },
  {
    id: 7,
    name: 'Digital Art NFT',
    image: 'https://source.unsplash.com/300x300/?nft,digitalart',
  },
  {
    id: 8,
    name: 'Ethereum NFT',
    image: 'https://source.unsplash.com/300x300/?nft,ethereum',
  },
  {
    id: 9,
    name: 'NFT Painting',
    image: 'https://source.unsplash.com/300x300/?nft,painting',
  },
  {
    id: 10,
    name: 'Technology NFT',
    image: 'https://source.unsplash.com/300x300/?nft,technology',
  },
  // Additional images
  {
    id: 11,
    name: 'Abstract NFT 2',
    image: 'https://source.unsplash.com/300x300/?nft,abstract2',
  },
  {
    id: 12,
    name: 'Crypto Art 2',
    image: 'https://source.unsplash.com/300x300/?nft,crypto2',
  },
  {
    id: 13,
    name: 'Digital Collectible 2',
    image: 'https://source.unsplash.com/300x300/?nft,digital2',
  },
  {
    id: 14,
    name: 'Blockchain Art 2',
    image: 'https://source.unsplash.com/300x300/?nft,blockchain2',
  },
  {
    id: 15,
    name: 'NFT Marketplace 2',
    image: 'https://source.unsplash.com/300x300/?nft,marketplace2',
  },
  {
    id: 16,
    name: 'Artistic NFT 2',
    image: 'https://source.unsplash.com/300x300/?nft,artistic2',
  },
  {
    id: 17,
    name: 'Digital Art NFT 2',
    image: 'https://source.unsplash.com/300x300/?nft,digitalart2',
  },
  {
    id: 18,
    name: 'Ethereum NFT 2',
    image: 'https://source.unsplash.com/300x300/?nft,ethereum2',
  },
  {
    id: 19,
    name: 'NFT Painting 2',
    image: 'https://source.unsplash.com/300x300/?nft,painting2',
  },
  {
    id: 20,
    name: 'Technology NFT 2',
    image: 'https://source.unsplash.com/300x300/?nft,technology2',
  },
];

const NFTGallery = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {nfts.map((nft) => (
        <div
          key={nft.id}
          className="mb-4">
          <div className="bg-white relative p-4 rounded-lg shadow-md w-full h-40 object-cover">
            <Image
              src={nft.image}
              alt={nft.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <p className="text-center font-medium mt-2">{nft.name}</p>
        </div>
      ))}
    </div>
  );
};

export default NFTGallery;
