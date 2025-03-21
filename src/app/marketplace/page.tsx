"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import StarsBackground from "@/components/StarsBackground";

// Define the types for our products
interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

// Define the type for product categories
interface Category {
  id: number;
  name: string;
  path: string;
  image: string;
  productCount: number; // Number of products in this category
}

export default function Marketplace() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(true);
  
  // Placeholder product data for each category with static prices
  const categoryProducts = {
    "Socks": [
      { name: "Wound", image: "/yooni_products/Socks/Wound.png", price: "45 coins" },
      { name: "Fishnet", image: "/yooni_products/Socks/Fishnet.png", price: "52 coins" },
      { name: "Candy Cane", image: "/yooni_products/Socks/Candy cane.png", price: "38 coins" }
    ],
    "Shoes": [
      { name: "Vans", image: "/yooni_products/Shoes/Vans.png", price: "75 coins" },
      { name: "Saddle", image: "/yooni_products/Shoes/Saddle.png", price: "68 coins" },
      { name: "Boots", image: "/yooni_products/Shoes/Boots.png", price: "82 coins" }
    ],
    "Shirt": [
      { name: "Sun", image: "/yooni_products/Shirt/Sun.png", price: "40 coins" },
      { name: "Star", image: "/yooni_products/Shirt/Star.png", price: "55 coins" },
      { name: "Snow", image: "/yooni_products/Shirt/Snow.png", price: "50 coins" },
      { name: "Sleeves", image: "/yooni_products/Shirt/Sleeves.png", price: "60 coins" }
    ],
    "Pants": [
      { name: "Ripped", image: "/yooni_products/Pants/Ripped.png", price: "65 coins" },
      { name: "Jogger", image: "/yooni_products/Pants/Jogger.png", price: "58 coins" },
      { name: "Jeans", image: "/yooni_products/Pants/Jeans.png", price: "70 coins" },
      { name: "Bootcut", image: "/yooni_products/Pants/Bootcut.png", price: "72 coins" }
    ],
    "Hair": [
      { name: "Short Bob", image: "/yooni_products/Hair/Short bob.png", price: "48 coins" },
      { name: "Pigtails", image: "/yooni_products/Hair/Pigtails.png", price: "42 coins" },
      { name: "Buns", image: "/yooni_products/Hair/Buns.png", price: "35 coins" }
    ],
    "Face": [
      { name: "Sad Big Eyes", image: "/yooni_products/Face/Sad big eyes.png", price: "56 coins" },
      { name: "Chinese", image: "/yooni_products/Face/Chinese.png", price: "44 coins" },
      { name: "Normal", image: "/yooni_products/Face/Normal.png", price: "30 coins" }
    ],
    // Empty placeholders for categories we haven't populated yet
    "Weapons": [
      {name: "Battleaxe", image: "/yooni_products/Weapons/Battleaxe.png", price: "95 coins"},
      {name: "Power neon", image: "/yooni_products/Weapons/Power neon.png", price: "88 coins"},
      {name: "Sword", image: "/yooni_products/Weapons/Sword.png", price: "100 coins"}
    ],
    "Jacket": [
      { name: "Overshirt", image: "/yooni_products/Jacket/Overshirt.png", price: "78 coins" },
      { name: "Caution", image: "/yooni_products/Jacket/Caution.png", price: "85 coins" },
      { name: "Skulls", image: "/yooni_products/Jacket/Skulls.png", price: "92 coins" }
    ],
    "Animal": [
      { name: "Raccoon", image: "/yooni_products/Animal/Raccoon.png", price: "64 coins" },
      { name: "Dog", image: "/yooni_products/Animal/Dog.png", price: "66 coins" },
      { name: "Christmas", image: "/yooni_products/Animal/Christmas.png", price: "74 coins" },
      { name: "Cat", image: "/yooni_products/Animal/Cat.png", price: "62 coins" }
    ]
  };
  
  // Product categories based on yooni_products folders
  const categories: Category[] = [
    {
      id: 1,
      name: "Weapons",
      path: "/yooni_products/Weapons",
      image: categoryProducts["Weapons"][0]?.image || "/symbol-full-color.svg",
      productCount: categoryProducts["Weapons"].length
    },
    {
      id: 2,
      name: "Socks",
      path: "/yooni_products/Socks",
      image: categoryProducts["Socks"][0]?.image || "/symbol-full-color.svg",
      productCount: categoryProducts["Socks"].length
    },
    {
      id: 3,
      name: "Shoes",
      path: "/yooni_products/Shoes",
      image: categoryProducts["Shoes"][0]?.image || "/symbol-full-color.svg",
      productCount: categoryProducts["Shoes"].length
    },
    {
      id: 4,
      name: "Shirt",
      path: "/yooni_products/Shirt",
      image: categoryProducts["Shirt"][0]?.image || "/symbol-full-color.svg",
      productCount: categoryProducts["Shirt"].length
    },
    {
      id: 5,
      name: "Pants",
      path: "/yooni_products/Pants",
      image: categoryProducts["Pants"][0]?.image || "/symbol-full-color.svg",
      productCount: categoryProducts["Pants"].length
    },
    {
      id: 6,
      name: "Jacket",
      path: "/yooni_products/Jacket",
      image: categoryProducts["Jacket"][0]?.image || "/symbol-full-color.svg",
      productCount: categoryProducts["Jacket"].length
    },
    {
      id: 7,
      name: "Hair",
      path: "/yooni_products/Hair",
      image: categoryProducts["Hair"][0]?.image || "/symbol-full-color.svg",
      productCount: categoryProducts["Hair"].length
    },
    {
      id: 8,
      name: "Face",
      path: "/yooni_products/Face",
      image: categoryProducts["Face"][0]?.image || "/symbol-full-color.svg",
      productCount: categoryProducts["Face"].length
    },
    {
      id: 9,
      name: "Animal",
      path: "/yooni_products/Animal",
      image: categoryProducts["Animal"][0]?.image || "/symbol-full-color.svg",
      productCount: categoryProducts["Animal"].length
    }
  ];

  // Load all products on initial render
  useEffect(() => {
    setLoading(true);
    
    // Generate products with prices from the categoryProducts data
    const productsMap: Record<string, Product[]> = {};
    
    Object.entries(categoryProducts).forEach(([category, items]) => {
      productsMap[category] = items.map((item, index) => ({
        id: `${category}-${index}`,
        name: item.name,
        price: item.price,
        image: item.image,
        category: category
      }));
    });
    
    setAllProducts(productsMap);
    setLoading(false);
  }, []);

  // Handle mobile menu
  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  // Handle buy button click
  const handleBuyClick = (product: Product) => {
    alert(`You are about to purchase ${product.name} for ${product.price}`);
    // In a real app, this would connect to a wallet/payment system
  };

  // Render product card
  const renderProductCard = (product: Product) => (
    <div key={product.id} className="product-card bg-black bg-opacity-40 backdrop-blur-md rounded-xl overflow-hidden border border-white border-opacity-10 transition-all hover:transform hover:scale-105 hover:border-opacity-30 w-64">
      <div className="relative aspect-square w-full">
        <Image 
          src={product.image} 
          alt={product.name}
          fill
          className="object-contain p-2"
          onError={(e) => {
            // If image fails to load, this keeps the fallback visible
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <div className="bg-gray-800 px-2 py-1 rounded-md text-sm">{product.category}</div>
        </div>
        <p className="text-gray-400 mt-2 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" strokeWidth="2" />
            <circle cx="12" cy="12" r="6" fill="currentColor" />
          </svg>
          {product.price}
        </p>
        <button 
          className="mt-4 w-full play-button py-2"
          onClick={() => handleBuyClick(product)}
        >
          Buy Now
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header onMobileMenuOpen={openMobileMenu} />
      
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={closeMobileMenu} 
      />
      
      <div className="marketplace-content text-center p-4 md:p-8 relative z-10 mt-32 w-full">
        <div className="flex flex-col">
          <h1 className="main-title text-3xl md:text-2xl font-bold mb-4">
            NFT <span className="highlight">Marketplace</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-300">
            Explore and collect unique digital assets
          </p>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              {categories.map((category) => {
                const products = allProducts[category.name] || [];
                
                if (products.length === 0) return null;
                
                return (
                  <div key={category.id} className="mb-6">
                    <div className="flex items-center justify-center mb-6">
                      <h2 className="text-2xl font-bold highlight">{category.name}</h2>
                      <span className="ml-2 text-gray-400 text-sm">
                        ({products.length} {products.length === 1 ? 'item' : 'items'})
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-6">
                      {products.map(renderProductCard)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      <StarsBackground />
      
      {/* Social Media Links and Copyright */}
      <footer className="w-full text-center py-6 relative z-10 mt-auto">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://x.com/Yoonivee" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://discord.gg/GV2xpZ7kpU" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </a>
        </div>
        <div className="text-gray-400 text-sm">
          © 2025 Yoonivee. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 