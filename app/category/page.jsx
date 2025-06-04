'use client'
import Image from "next/image";
import Input from "../components/Input";
import { Search } from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";

import SliderComponent from "../components/juneau-slider";
export default function Page() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
console.log(categories)
  // Memoized fetch function
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://newrepo-4pyc.onrender.com/user/get-all-categories'
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
     
      // Transform API data to match your expected structure
      const transformedData = data.map((category, index) => ({
        id: category._id || index + 1,
        title: category.name || `Category ${index + 1}`,
        count: `${category.count || Math.floor(Math.random() * 20) + 1} Places`,
        image: category.image || getFallbackImage(index)
      }));
      
      setCategories(transformedData);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      // Fallback to sample data if API fails
      setCategories(getSampleCategories());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fallback image generator
  const getFallbackImage = (index) => {
    const fallbackImages = [
      "https://plus.unsplash.com/premium_photo-1686878940830-9031355ec98c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];
    return fallbackImages[index % fallbackImages.length];
  };

  // Sample data fallback
  const getSampleCategories = () => {
    return [
      {
        id: 1,
        title: "Restaurants",
        count: "10 Restaurants",
        image: getFallbackImage(0)
      },
      {
        id: 2,
        title: "Cafés",
        count: "15 Cafés",
        image: getFallbackImage(1)
      },
      {
        id: 3,
        title: "Bars",
        count: "8 Bars",
        image: getFallbackImage(2)
      },
      {
        id: 4,
        title: "Hotels",
        count: "12 Hotels",
        image: getFallbackImage(3)
      },
    ];
  };

  // Memoized filtered categories based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;
    return categories.filter(category =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowResults(value.length > 0);
  };

  const handleSearchFocus = () => {
    if (searchQuery.length > 0) {
      setShowResults(true);
    }
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowResults(false), 200);
  };

  const handleCategorySelect = (category) => {
    setSearchQuery(category.title);
    setShowResults(false);
    // Optional: Scroll to the selected category
    document.getElementById(`category-${category.id}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50  flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading categories...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <p className="text-gray-500 text-sm">Showing sample data instead</p>
      </div>
    </div>
  );

  return (
    <div >
  
      <div className="min-h-screen  ">
       <SliderComponent/>
  <div className="max-w-6xl mx-auto mt-10">     {/* Search Bar with Results */}
            <div className="relative mb-8   flex flex-cols-12 justify-between">
        
          
          <h1 className="text-2xl md:text-2xl font-bold text-gray-800">All Categories</h1>
      
        
       <div className="relative max-w-md">
  <div className="flex items-center transition-all duration-300 ease-in-out focus-within:w-[120%] focus-within:-translate-x-[20%]">
    <Input
      value={searchQuery}
      onChange={handleSearchChange}
      onFocus={handleSearchFocus}
      onBlur={handleSearchBlur}
      placeholder="Search categories..."
      className="w-full pr-10 border-gray-300 rounded-lg py-3 focus:ring-2 focus:ring-green-500"
    />
    <div className="absolute right-3 flex items-center pointer-events-none transition-transform duration-300 ease-in-out group-focus-within:translate-x-[20%]">
      <Search className="h-5 w-5 text-gray-400" />
    </div>
  </div>
</div>  {/* Search Results Dropdown */}
         {showResults && searchQuery && (
            <div className="absolute z-10 top-0 right-0  w-50 bg-white rounded-lg shadow-lg border border-gray-200 max-h-50 overflow-auto">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <div
                    key={category.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCategorySelect(category)}
                  >
                    <div className="font-medium">{category.title}</div>
                    <div className="text-sm text-gray-500">{category.count}</div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No categories found</div>
              )}
            </div>
          )}
    {/* Header */}
       
        
        </div>
    

   

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <div 
              key={category.id}
              id={`category-${category.id}`}
              className="bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer rounded-lg border border-gray-200"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={category.id <= 4}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-1">{category.title}</h2>
                <p className="text-gray-600">{category.count}</p>
              <Link
  href={`/category/${category.id}`}
  className="mt-3 w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 text-center block"
>
  Explore
</Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">No categories match your search</h3>
            <button 
              onClick={() => {
                setSearchQuery('');
                setShowResults(false);
              }}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
      </div>
    
    </div>
  );
}