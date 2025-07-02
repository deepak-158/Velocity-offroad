import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/common/Hero';
import Breadcrumbs from '../components/common/Breadcrumbs';
import OptimizedImage from '../components/common/OptimizedImage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useLoading } from '../context/LoadingContext';
import { useCart } from '../context/CartContext';
import dataService from '../services/dataService';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  featured?: boolean;
  discountPercentage?: number;
}

// Placeholder data until backend is connected
const PLACEHOLDER_PRODUCTS: Product[] = [
  {
    _id: '1',
    name: 'Racing Team Jersey 2023',
    description: 'Official racing team jersey with team logo and sponsor logos. Made with moisture-wicking fabric for maximum comfort.',
    price: 49.99,
    category: 'apparel',
    imageUrl: '/images/merchandise/jersey1.svg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Red', 'Black'],
    inStock: true,
    featured: true
  },
  {
    _id: '2',
    name: 'Team Polo Shirt',
    description: 'Casual team polo shirt with embroidered logo, perfect for race day or casual wear.',
    price: 34.99,
    category: 'apparel',
    imageUrl: '/images/merchandise/polo.svg',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'White', 'Black'],
    inStock: true
  },
  {
    _id: '3',
    name: 'Racing Cap',
    description: 'Adjustable team cap with embroidered logo, perfect for race day.',
    price: 24.99,
    category: 'accessories',
    imageUrl: '/images/merchandise/cap.svg',
    colors: ['Red', 'Black'],
    inStock: true,
    featured: true
  },
  {
    _id: '4',
    name: 'Team Hoodie',
    description: 'Warm and comfortable team hoodie with printed logo and sponsor details.',
    price: 59.99,
    category: 'apparel',
    imageUrl: '/images/merchandise/hoodie.svg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Red'],
    inStock: true
  },
  {
    _id: '5',
    name: 'Racing Team Backpack',
    description: 'High-quality backpack with team logo, multiple compartments, and laptop sleeve.',
    price: 69.99,
    category: 'accessories',
    imageUrl: '/images/merchandise/backpack.svg',
    colors: ['Black'],
    inStock: true,
    featured: true
  },
  {
    _id: '6',
    name: 'Team Water Bottle',
    description: 'Stainless steel water bottle with team logo, keeps drinks cold for up to 24 hours.',
    price: 19.99,
    category: 'accessories',
    imageUrl: '/images/merchandise/bottle.svg',
    colors: ['Silver', 'Red'],
    inStock: true
  },
  {
    _id: '7',
    name: 'Racing Team T-Shirt',
    description: 'Comfortable cotton T-shirt with printed team logo.',
    price: 29.99,
    category: 'apparel',
    imageUrl: '/images/merchandise/tshirt.svg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Red', 'Black', 'White'],
    inStock: true,
    discountPercentage: 10
  },
  {
    _id: '8',
    name: 'Team Umbrella',
    description: 'Compact racing team umbrella with automatic opening mechanism.',
    price: 29.99,
    category: 'accessories',
    imageUrl: '/images/merchandise/umbrella.svg',
    colors: ['Black/Red'],
    inStock: true
  },
  {
    _id: '9',
    name: 'Racing Team Jacket',
    description: 'Windproof and water-resistant jacket with team logo and sponsor details.',
    price: 89.99,
    category: 'apparel',
    imageUrl: '/images/merchandise/jacket.svg',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red/Black'],
    inStock: true,
    featured: true
  },
  {
    _id: '10',
    name: 'Team Lanyard',
    description: 'High-quality lanyard with team logo and detachable key ring.',
    price: 9.99,
    category: 'accessories',
    imageUrl: '/images/merchandise/lanyard.svg',
    colors: ['Red', 'Black'],
    inStock: true
  },
  {
    _id: '11',
    name: 'Racing Team Beanie',
    description: 'Warm knitted beanie with embroidered team logo.',
    price: 19.99,
    category: 'accessories',
    imageUrl: '/images/merchandise/beanie.svg',
    colors: ['Black', 'Red'],
    inStock: true
  },
  {
    _id: '12',
    name: 'Scale Model Car',
    description: '1:18 scale model of our current racing car with detailed features.',
    price: 129.99,
    category: 'collectibles',
    imageUrl: '/images/merchandise/model.svg',
    inStock: false,
    featured: true
  }
];

const MerchandisePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(PLACEHOLDER_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 150 });
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const { startLoading, stopLoading } = useLoading();
  const { addToCart } = useCart();
  
  // Selected product options
  const [selectedProductOptions, setSelectedProductOptions] = useState<Record<string, { size?: string; color?: string }>>({});

  // Add a sort state and handler
  const [sortBy, setSortBy] = useState<string>('featured');

  // This will be used when backend is connected
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      startLoading();
      try {
        // Get merchandise data from dataService
        const merchandiseData = await dataService.getAllMerchandise();
        console.log('Merchandise data loaded:', merchandiseData);
        
        // Map merchandise data to Product format
        const formattedProducts: Product[] = merchandiseData.map(item => ({
          _id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          imageUrl: item.imageUrl,
          sizes: item.availableSizes,
          colors: undefined, // Merchandise data doesn't have colors
          inStock: item.stockQuantity > 0,
          featured: item.featured,
          discountPercentage: undefined
        }));
        
        setProducts(formattedProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        // Keep using placeholder data
        setProducts(PLACEHOLDER_PRODUCTS);
      } finally {
        setLoading(false);
        stopLoading();
      }
    };

    fetchProducts();
  }, [startLoading, stopLoading]);

  // Format price
  const formatPrice = (price: number): string => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // Calculate discount price
  const calculateDiscountPrice = (price: number, discountPercentage?: number): number => {
    if (!discountPercentage) return price;
    return price - (price * (discountPercentage / 100));
  };

  // Add a sort function
  const sortProducts = (products: Product[]): Product[] => {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'price_low':
        return sorted.sort((a, b) => {
          const priceA = a.discountPercentage ? a.price * (1 - a.discountPercentage / 100) : a.price;
          const priceB = b.discountPercentage ? b.price * (1 - b.discountPercentage / 100) : b.price;
          return priceA - priceB;
        });
        
      case 'price_high':
        return sorted.sort((a, b) => {
          const priceA = a.discountPercentage ? a.price * (1 - a.discountPercentage / 100) : a.price;
          const priceB = b.discountPercentage ? b.price * (1 - b.discountPercentage / 100) : b.price;
          return priceB - priceA;
        });
        
      case 'name_asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
        
      case 'name_desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
        
      case 'featured':
      default:
        return sorted.sort((a, b) => {
          // Featured items first
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }
  };

  // Update the filtered products to include sorting
  const filteredProducts = sortProducts(
    products.filter(product => {
      // Apply category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      
      // Apply size filter
      if (selectedSizes.length > 0 && (!product.sizes || !product.sizes.some(size => selectedSizes.includes(size)))) {
        return false;
      }
      
      // Apply color filter
      if (selectedColors.length > 0 && (!product.colors || !product.colors.some(color => selectedColors.includes(color)))) {
        return false;
      }
      
      // Apply price range filter
      const effectivePrice = product.discountPercentage 
        ? calculateDiscountPrice(product.price, product.discountPercentage) 
        : product.price;
      
      if (effectivePrice < priceRange.min || effectivePrice > priceRange.max) {
        return false;
      }
      
      // Apply in-stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      
      return true;
    })
  );

  // Get all available sizes
  const allSizes = Array.from(
    new Set(
      products
        .filter(p => p.sizes && p.sizes.length > 0)
        .flatMap(p => p.sizes as string[])
    )
  ).sort();
  
  // Get all available colors
  const allColors = Array.from(
    new Set(
      products
        .filter(p => p.colors && p.colors.length > 0)
        .flatMap(p => p.colors as string[])
    )
  ).sort();
  
  // Get all available categories
  const allCategories = Array.from(
    new Set(products.map(p => p.category))
  ).sort();

  // Toggle a size in the filter
  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };
  
  // Toggle a color in the filter
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };
  
  // Reset all filters
  const resetFilters = () => {
    setActiveCategory('all');
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange({ min: 0, max: 150 });
    setInStockOnly(false);
    setSortBy('featured');
  };
  
  // Handle adding to cart
  const handleAddToCart = (product: Product) => {
    // Check if product has size or color options
    const hasSizes = product.sizes && product.sizes.length > 0;
    const hasColors = product.colors && product.colors.length > 0;
    
    // Get selected options
    const options = selectedProductOptions[product._id] || {};
    
    // Validate selections if needed
    if (hasSizes && !options.size) {
      alert('Please select a size');
      return;
    }
    
    if (hasColors && !options.color) {
      alert('Please select a color');
      return;
    }
    
    // Add to cart
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.discountPercentage 
        ? calculateDiscountPrice(product.price, product.discountPercentage) 
        : product.price,
      imageUrl: product.imageUrl,
      size: options.size,
      color: options.color
    });
    
    // Reset selections
    setSelectedProductOptions(prev => ({
      ...prev,
      [product._id]: { size: undefined, color: undefined }
    }));
    
    // Show confirmation
    alert(`${product.name} added to your cart!`);
  };

  // Handle size selection for a specific product
  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedProductOptions(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        size
      }
    }));
  };
  
  // Handle color selection for a specific product
  const handleColorSelect = (productId: string, color: string) => {
    setSelectedProductOptions(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        color
      }
    }));
  };

  return (
    <Layout>
      <Hero 
        title="Merchandise"
        subtitle="Support our racing team with official merchandise"
        backgroundImage="/images/hero/merchandise-hero.svg"
      />
      
      <Breadcrumbs 
        customPaths={{
          'merchandise': 'Merchandise'
        }}
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            {/* Filters sidebar */}
            <div className="w-full md:w-1/4 md:mr-8 mb-8 md:mb-0">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Categories</h3>
                  <div className="space-y-2">
                    <div 
                      className={`cursor-pointer py-1 px-2 rounded ${activeCategory === 'all' ? 'bg-red-600 text-white' : 'hover:bg-gray-100'}`}
                      onClick={() => setActiveCategory('all')}
                    >
                      All Categories
                    </div>
                    {allCategories.map(category => (
                      <div
                        key={category} 
                        className={`cursor-pointer py-1 px-2 rounded capitalize ${activeCategory === category ? 'bg-red-600 text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </div>
                
                {allSizes.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3">Sizes</h3>
                    <div className="flex flex-wrap gap-2">
                      {allSizes.map(size => (
                        <div
                          key={size}
                          className={`cursor-pointer py-1 px-3 border rounded-md ${
                            selectedSizes.includes(size) 
                              ? 'bg-red-600 text-white border-red-600' 
                              : 'border-gray-300 hover:border-red-600'
                          }`}
                          onClick={() => toggleSize(size)}
                        >
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {allColors.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3">Colors</h3>
                    <div className="flex flex-wrap gap-2">
                      {allColors.map(color => (
                        <div
                          key={color}
                          className={`cursor-pointer py-1 px-3 border rounded-md capitalize ${
                            selectedColors.includes(color) 
                              ? 'bg-red-600 text-white border-red-600' 
                              : 'border-gray-300 hover:border-red-600'
                          }`}
                          onClick={() => toggleColor(color)}
                        >
                          {color}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Price Range</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span>{formatPrice(priceRange.min)}</span>
                    <span>{formatPrice(priceRange.max)}</span>
                  </div>
                  <div className="flex space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="150"
                      step="10"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                      className="w-1/2"
                    />
                    <input
                      type="range"
                      min="0"
                      max="150"
                      step="10"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                      className="w-1/2"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="inStock"
                      checked={inStockOnly}
                      onChange={() => setInStockOnly(prev => !prev)}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="inStock" className="ml-2 block text-sm text-gray-900">
                      Show only in-stock items
                    </label>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button
                    onClick={resetFilters}
                    className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md transition duration-200"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
            
            {/* Products grid */}
            <div className="w-full md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {activeCategory === 'all' ? 'All Products' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`}
                </h2>
                <div className="flex items-center">
                  <label className="mr-2 text-gray-700">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <option value="featured">Featured</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="name_asc">Name: A to Z</option>
                    <option value="name_desc">Name: Z to A</option>
                  </select>
                </div>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <LoadingSpinner size="lg" />
                </div>
              ) : error ? (
                <div className="bg-red-100 p-4 rounded-md text-red-700 mb-6">
                  {error}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products found matching your criteria</p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 py-2 px-6 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-200"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <div key={product._id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      {/* Image Section - Fixed Height */}
                      <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                        {product.imageUrl ? (
                          <OptimizedImage 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            lazyLoad={false}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <span className="text-gray-400 text-sm">No image available</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                          <div className="flex flex-col gap-2">
                            {product.featured && (
                              <span className="badge badge-featured text-xs font-bold px-2 py-1 rounded-full">
                                FEATURED
                              </span>
                            )}
                            {product.discountPercentage && (
                              <span className="badge badge-discount text-xs font-bold px-2 py-1 rounded-full">
                                {product.discountPercentage}% OFF
                              </span>
                            )}
                          </div>
                          
                          {!product.inStock && (
                            <span className="badge badge-out-of-stock text-xs font-bold px-2 py-1 rounded-full">
                              OUT OF STOCK
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Content Section - Flexible Height */}
                      <div className="p-5 flex flex-col flex-grow">
                        {/* Category Tag */}
                        <div className="mb-3">
                          <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full capitalize">
                            {product.category}
                          </span>
                        </div>
                        
                        {/* Product Title */}
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                          {product.name}
                        </h3>
                        
                        {/* Product Description - Fixed Height */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[4.5rem] flex-shrink-0">
                          {product.description}
                        </p>
                        
                        {/* Price Section */}
                        <div className="mb-4 flex-shrink-0">
                          {product.discountPercentage ? (
                            <div className="flex items-center gap-2">
                              <span className="price-discount">
                                {formatPrice(calculateDiscountPrice(product.price, product.discountPercentage))}
                              </span>
                              <span className="price-crossed text-sm">
                                {formatPrice(product.price)}
                              </span>
                              <span className="text-xs text-green-600 font-medium">
                                Save {formatPrice(product.price - calculateDiscountPrice(product.price, product.discountPercentage))}
                              </span>
                            </div>
                          ) : (
                            <span className="price-original">{formatPrice(product.price)}</span>
                          )}
                        </div>
                        
                        {/* Product Options - Flexible Section */}
                        <div className="flex-grow space-y-3 mb-4">
                          {product.sizes && product.sizes.length > 0 && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Size:</label>
                              <div className="flex flex-wrap gap-2">
                                {product.sizes.map(size => (
                                  <button
                                    key={size}
                                    type="button"
                                    className={`option-btn ${
                                      selectedProductOptions[product._id]?.size === size ? 'selected' : ''
                                    }`}
                                    onClick={() => handleSizeSelect(product._id, size)}
                                  >
                                    {size}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {product.colors && product.colors.length > 0 && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Color:</label>
                              <div className="flex flex-wrap gap-2">
                                {product.colors.map(color => (
                                  <button
                                    key={color}
                                    type="button"
                                    className={`option-btn capitalize ${
                                      selectedProductOptions[product._id]?.color === color ? 'selected' : ''
                                    }`}
                                    onClick={() => handleColorSelect(product._id, color)}
                                  >
                                    {color}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Add to Cart Button - Always at Bottom */}
                        <div className="mt-auto">
                          <button
                            className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
                              product.inStock 
                                ? 'btn-primary shadow-md hover:shadow-lg' 
                                : 'bg-gray-200 cursor-not-allowed text-gray-400 border border-gray-300'
                            }`}
                            onClick={() => product.inStock && handleAddToCart(product)}
                            disabled={!product.inStock}
                          >
                            {product.inStock ? (
                              <span className="flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5h10.5M7 13v0a2 2 0 012 2h8a2 2 0 012-2v0" />
                                </svg>
                                Add to Cart
                              </span>
                            ) : (
                              'Out of Stock'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MerchandisePage;