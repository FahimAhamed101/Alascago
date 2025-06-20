import Link from 'next/link';
import { useState } from 'react';

// Dummy blog data
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Next.js and Tailwind CSS',
    excerpt: 'Learn how to set up a new project with Next.js and configure Tailwind CSS for rapid UI development.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.',
    date: 'May 15, 2023',
    author: 'Jane Doe',
    authorAvatar: 'https://images.unsplash.com/photo-1724322609052-109c472fcc8b?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Development',
    readTime: '5 min read',
    slug: 'getting-started-with-nextjs-and-tailwind',
    featured: true,
    image: 'https://images.unsplash.com/photo-1574944982455-1c850c6e0fe9?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 2,
    title: 'Building Responsive Layouts with Tailwind',
    excerpt: 'Discover how to create beautiful responsive layouts using Tailwind CSS utility classes.',
    content: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.',
    date: 'June 2, 2023',
    author: 'John Smith',
    authorAvatar: 'https://images.unsplash.com/photo-1724322609052-109c472fcc8b?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Design',
    readTime: '7 min read',
    slug: 'building-responsive-layouts-with-tailwind',
    featured: false,
    image: 'https://images.unsplash.com/photo-1574944982455-1c850c6e0fe9?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  // ...more posts
];

const categories = [
  { id: 1, name: 'All', slug: 'all' },
  { id: 2, name: 'Development', slug: 'development' },
  { id: 3, name: 'Design', slug: 'design' },
  { id: 4, name: 'Performance', slug: 'performance' },
  { id: 5, name: 'CSS', slug: 'css' },
  { id: 6, name: 'Security', slug: 'security' }
];

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category.toLowerCase() === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Blog Posts with Filter */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 md:mb-0">Latest Blog Articles</h2>
            
            <div className="w-full md:w-auto flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              
              <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.slug)}
                    className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      activeCategory === category.slug
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <span className="text-xs font-medium text-indigo-600">{post.category}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img 
                          src={post.authorAvatar} 
                          alt={post.author} 
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span className="text-xs text-gray-700">{post.author}</span>
                      </div>
                    <Link href={`/blog/${post.slug}`} className="text-indigo-600 hover:text-indigo-800 text-xs font-medium">
  Read more →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No articles found</h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-indigo-700 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Stay updated with our latest posts</h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss our latest articles, tips, and tutorials.
          </p>
          <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-white text-indigo-700 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
