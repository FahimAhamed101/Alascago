'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Input from '../../components/Input';
import { Search } from 'lucide-react';

export default function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const fetchCategoryData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      
      // Fetch places for the category
      const response = await fetch(
        `https://newrepo-4pyc.onrender.com/user/get-category-data/${id}`,
        
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch category data: ${response.status}`);
      }

      const data = await response.json();
      console.log(data)
      // Check if data is an array
      if (!Array.isArray(data)) {
        throw new Error('Expected an array of places from API');
      }

      // Set category with fallback data
      setCategory({
        id,
        name: `Category ${id}`, // Fallback; replace with API call if available
        description: 'No description available',
        image: getFallbackImage(),
        places: data.map(place => ({
          id: place._id,
          name: place.name,
          address: place.location,
          description: place.description || 'No description',
          rating: place.rating || 0,
          image: place.images[0] || getFallbackImage(),
          referralLink: place.referralLink || '#',
          category: place.category || 'Unknown',
          user: place.user || 'Unknown',
          createdAt: place.createdAt || new Date().toISOString(),
          updatedAt: place.updatedAt || new Date().toISOString(),
          __v: place.__v || 0,
        })),
      });
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);

  const getFallbackImage = () => {
    return 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  };

  // Memoized filtered places based on search query
  const filteredPlaces = useMemo(() => {
    if (!searchQuery || !category?.places) return category?.places || [];
    return category.places.filter(place =>
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [category, searchQuery]);

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

  const handlePlaceSelect = (place) => {
    setSearchQuery(place.name);
    setShowResults(false);
    document.getElementById(`place-${place.id}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading category details...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 hover:text-blue-800"
        >
           <p className="text-gray-600">No category Listing data found</p>
        </button>
      </div>
    </div>
  );

  if (!category) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">No category Listing data found</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Logo */}
        <div className="flex justify-between items-center mb-8">
          <div className="w-20">
            <Image
              src="/logo.svg"
              alt="Alaska Go"
              width={80}
              height={40}
              className="h-auto"
              priority
            />
          </div>
       
        </div>

        {/* Search Bar with Results */}
        <div className="relative mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Input
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              placeholder="Search places..."
              className="w-full pr-10 border-gray-300 rounded-lg py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Search Results Dropdown */}
          {showResults && searchQuery && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
              {filteredPlaces.length > 0 ? (
                filteredPlaces.map((place) => (
                  <div
                    key={place.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handlePlaceSelect(place)}
                  >
                    <div className="font-medium">{place.name}</div>
                    <div className="text-sm text-gray-500">{place.address}</div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No places found</div>
              )}
            </div>
          )}
        </div>

        {/* Category Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
         
          <div className="p-6">
 
            <Link href="/categories" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Categories
            </Link>
          </div>
        </div>

        {/* Places in this category */}
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          {filteredPlaces.length > 0 ? `Places` : 'No places found'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              id={`place-${place.id}`}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h4 className="text-xl font-bold text-gray-800 mb-1">{place.name}</h4>
              
                <p className="text-gray-600 mb-2"><strong>Location:</strong> {place.address}</p>
                <p className="text-gray-600 mb-2"><strong>Description:</strong> {place.description}</p>
         
        
                
               
              </div>
            </div>
          ))}
        </div>

        {filteredPlaces.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">No places match your search</h3>
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
  );
}