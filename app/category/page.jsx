"use client";
import Image from "next/image";
import Input from "../components/Input";
import { Search } from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import SliderComponent from "../components/juneau-slider";
import BlogSection from "../components/Blog/BlogSection";
import CarApprovalSection from "../components/CarApproval/CarSection";

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://newrepo-4pyc.onrender.com/user/get-all-categories"
      );
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();
      const transformed = data.map((cat, i) => ({
        id: cat._id || i + 1,
        title: cat.name || `Category ${i + 1}`,
        count: `${cat.count || Math.floor(Math.random() * 20) + 1} Places`,
        image: cat.image || getFallbackImage(i),
      }));
      setCategories(transformed);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setCategories(getSampleCategories());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const getFallbackImage = (i) => {
    const imgs = [
      "https://plus.unsplash.com/premium_photo-1686878940830-9031355ec98c?q=80&w=2070",
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=2071",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
    ];
    return imgs[i % imgs.length];
  };

  const getSampleCategories = () => [
    { id: 1, title: "Restaurants", count: "10 Restaurants", image: getFallbackImage(0) },
    { id: 2, title: "Cafés", count: "15 Cafés", image: getFallbackImage(1) },
    { id: 3, title: "Bars", count: "8 Bars", image: getFallbackImage(2) },
    { id: 4, title: "Hotels", count: "12 Hotels", image: getFallbackImage(3) },
  ];

  const filtered = useMemo(() => {
    if (!searchQuery) return categories;
    return categories.filter((c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  const onSearchChange = (e) => {
    const v = e.target.value;
    setSearchQuery(v);
    setShowResults(v.length > 0);
  };
  const onFocus = () => { if (searchQuery) setShowResults(true); };
  const onBlur = () => { setTimeout(() => setShowResults(false), 200); };
  const selectCat = (cat) => {
    setSearchQuery(cat.title);
    setShowResults(false);
    document.getElementById(`category-${cat.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600">Loading categories...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-red-600">Oops!</h2>
        <p className="mt-2 text-gray-700">{error}</p>
        <span className="text-sm text-gray-500 block mt-2">Displaying sample data.</span>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-green-50 to-white">
      <SliderComponent />
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 border-b-4 border-green-600 pb-2">
            All Categories
          </h1>
          <div className="relative mt-4 md:mt-0 w-full md:w-1/3">
            <div className="flex items-center bg-white shadow-md rounded-full px-4 py-2 focus-within:shadow-lg transition-shadow">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              <Input
                value={searchQuery}
                onChange={onSearchChange}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder="Search categories..."
                className="flex-grow outline-none"
              />
            </div>
            {showResults && searchQuery && (
              <div className="absolute z-20 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-green-300">
                {filtered.length ? filtered.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => selectCat(c)}
                    className="px-4 py-2 hover:bg-green-50 cursor-pointer transition-colors"
                  >
                    <div className="font-medium text-gray-800">{c.title}</div>
                    <div className="text-sm text-gray-500">{c.count}</div>
                  </div>
                )) : (
                  <div className="px-4 py-2 text-gray-500">No categories found.</div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((cat, idx) => (
            <motion.div
              key={cat.id}
              id={`category-${cat.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link href={`/category/${cat.id}`} className="group block overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                <div className="relative h-56 w-full">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-2xl font-bold">{cat.title}</h2>
                    <p className="mt-1 text-sm">{cat.count}</p>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <button className="w-full py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors flex items-center justify-center">
                    Explore
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl text-gray-600">No categories match your search.</h3>
            <button
              onClick={() => { setSearchQuery(""); setShowResults(false); }}
              className="mt-4 text-green-600 hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
      <BlogSection />
      <CarApprovalSection/>
    </div>
  );
}
