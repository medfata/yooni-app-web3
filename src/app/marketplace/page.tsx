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
  
  // Placeholder product data for each category
  const categoryProducts = {
    "Socks": [
      { name: "Wound", image: "/yooni_products/Socks/Wound.png" },
      { name: "Fishnet", image: "/yooni_products/Socks/Fishnet.png" },
      { name: "Candy Cane", image: "/yooni_products/Socks/Candy cane.png" }
    ],
    "Shoes": [
      { name: "Vans", image: "/yooni_products/Shoes/Vans.png" },
      { name: "Saddle", image: "/yooni_products/Shoes/Saddle.png" },
      { name: "Boots", image: "/yooni_products/Shoes/Boots.png" }
    ],
    "Shirt": [
      { name: "Sun", image: "/yooni_products/Shirt/Sun.png" },
      { name: "Star", image: "/yooni_products/Shirt/Star.png" },
      { name: "Snow", image: "/yooni_products/Shirt/Snow.png" },
      { name: "Sleeves", image: "/yooni_products/Shirt/Sleeves.png" }
    ],
    "Pants": [
      { name: "Ripped", image: "/yooni_products/Pants/Ripped.png" },
      { name: "Jogger", image: "/yooni_products/Pants/Jogger.png" },
      { name: "Jeans", image: "/yooni_products/Pants/Jeans.png" },
      { name: "Bootcut", image: "/yooni_products/Pants/Bootcut.png" }
    ],
    "Hair": [
      { name: "Short Bob", image: "/yooni_products/Hair/Short bob.png" },
      { name: "Pigtails", image: "/yooni_products/Hair/Pigtails.png" },
      { name: "Buns", image: "/yooni_products/Hair/Buns.png" }
    ],
    "Face": [
      { name: "Sad Big Eyes", image: "/yooni_products/Face/Sad big eyes.png" },
      { name: "Chinese", image: "/yooni_products/Face/Chinese.png" },
      { name: "Normal", image: "/yooni_products/Face/Normal.png" }
    ],
    // Empty placeholders for categories we haven't populated yet
    "Weapons": [
      {name: "Battleaxe", image: "/yooni_products/Weapons/Battleaxe.png"},
      {name: "Power neon", image: "/yooni_products/Weapons/Power neon.png"},
      {name: "Sword", image: "/yooni_products/Weapons/Sword.png"}
    ],
    "Jacket": [
      { name: "Overshirt", image: "/yooni_products/Jacket/Overshirt.png" },
      { name: "Caution", image: "/yooni_products/Jacket/Caution.png" },
      { name: "Skulls", image: "/yooni_products/Jacket/Skulls.png" }
    ],
    "Animal": [
      { name: "Raccoon", image: "/yooni_products/Animal/Raccoon.png" },
      { name: "Dog", image: "/yooni_products/Animal/Dog.png" },
      { name: "Christmas", image: "/yooni_products/Animal/Christmas.png" },
      { name: "Cat", image: "/yooni_products/Animal/Cat.png" }
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

  // Generate random price for ETH (between 0.01 and 1 ETH)
  const generateRandomPrice = () => {
    const price = (Math.random() * 0.99 + 0.01).toFixed(2);
    return `${price} ETH`;
  };

  // Load all products on initial render
  useEffect(() => {
    setLoading(true);
    
    // Generate products with random prices for all categories
    const productsMap: Record<string, Product[]> = {};
    
    Object.entries(categoryProducts).forEach(([category, items]) => {
      productsMap[category] = items.map((item, index) => ({
        id: `${category}-${index}`,
        name: item.name,
        price: generateRandomPrice(),
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
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4M20 12a8 8 0 01-8 8m8-8a8 8 0 00-8-8m8 16a8 8 0 01-8-8m8 8a8 8 0 00-8-8m16 0a8 8 0 00-16 0m16 0a8 8 0 01-16 0"></path>
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
    </div>
  );
} 