'use client';
import { useRouter,useParams } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';

// Dummy blog data (should match your blog section data)
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
  {
    id: 3,
    title: 'Optimizing Next.js Applications',
    excerpt: 'Performance tips and tricks to make your Next.js applications lightning fast.',
    content: 'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
    date: 'June 18, 2023',
    author: 'Alex Johnson',
    authorAvatar: 'https://images.unsplash.com/photo-1724322609052-109c472fcc8b?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Performance',
    readTime: '8 min read',
    slug: 'optimizing-nextjs-applications',
    featured: true,
    image: 'https://images.unsplash.com/photo-1574944982455-1c850c6e0fe9?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 4,
    title: 'State Management in Modern React',
    excerpt: 'Comparing different state management solutions for React applications.',
    content: 'Aenean lacinia bibendum nulla sed consectetur. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
    date: 'July 5, 2023',
    author: 'Sarah Williams',
    authorAvatar: 'https://images.unsplash.com/photo-1724322609052-109c472fcc8b?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Development',
    readTime: '10 min read',
    slug: 'state-management-in-modern-react',
    featured: false,
    image: 'https://images.unsplash.com/photo-1574944982455-1c850c6e0fe9?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 5,
    title: 'The Complete Guide to CSS Grid',
    excerpt: 'Master CSS Grid layout with this comprehensive guide.',
    content: 'Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    date: 'July 22, 2023',
    author: 'Michael Brown',
    authorAvatar: 'https://images.unsplash.com/photo-1724322609052-109c472fcc8b?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'CSS',
    readTime: '12 min read',
    slug: 'complete-guide-to-css-grid',
    featured: true,
    image: 'https://images.unsplash.com/photo-1574944982455-1c850c6e0fe9?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 6,
    title: 'Authentication in Next.js Applications',
    excerpt: 'Implement secure authentication in your Next.js apps using various strategies.',
    content: 'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    date: 'August 10, 2023',
    author: 'Emily Davis',
    authorAvatar: 'https://images.unsplash.com/photo-1724322609052-109c472fcc8b?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Security',
    readTime: '9 min read',
    slug: 'authentication-in-nextjs',
    featured: false,
    image: 'https://images.unsplash.com/photo-1574944982455-1c850c6e0fe9?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
  // ... other posts (same as in your BlogSection)
];

export default function BlogPost() {
  const router = useRouter();
  const { slug }  = useParams();
  
  // Find the post with matching slug
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="text-indigo-600 hover:text-indigo-800 font-medium">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | My Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
      </Head>

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <Link href="/blog" className="ml-1 text-sm font-medium text-gray-700 hover:text-indigo-600 md:ml-2">
                  Blog
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{post.title}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Post Header */}
        <header className="mb-10">
          <div className="flex items-center mb-4">
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {post.category}
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm text-gray-500">{post.date}</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm text-gray-500">{post.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
          <div className="flex items-center">
            <img 
              src={post.authorAvatar} 
              alt={post.author} 
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{post.author}</p>
              <p className="text-sm text-gray-500">Author</p>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-10 rounded-xl overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Post Content */}
        <div 
          className="prose max-w-none prose-lg prose-headings:font-semibold prose-a:text-indigo-600 hover:prose-a:text-indigo-800 prose-img:rounded-xl prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="mt-12 flex flex-wrap gap-2">
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            #NextJS
          </span>
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            #TailwindCSS
          </span>
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            #WebDevelopment
          </span>
        </div>

        {/* Author Bio */}
        <div className="mt-12 bg-gray-50 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center">
            <img 
              src={post.authorAvatar} 
              alt={post.author} 
              className="w-16 h-16 rounded-full mb-4 md:mb-0 md:mr-6"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">About {post.author}</h3>
              <p className="text-gray-600 mt-2">
                {post.author} is a professional web developer with over 5 years of experience building modern web applications. 
                Specializing in React and Next.js, they love sharing knowledge through blog posts and tutorials.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between gap-4 border-t border-gray-200 pt-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            ← Back to Blog
          </Link>
          <div className="flex gap-4">
            <Link 
              href="#" 
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Previous Post
            </Link>
            <Link 
              href="#" 
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700"
            >
              Next Post →
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts
              .filter(p => p.id !== post.id && p.category === post.category)
              .slice(0, 3)
              .map(relatedPost => (
                <div key={relatedPost.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-medium text-indigo-600">{relatedPost.category}</span>
                      <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2">{relatedPost.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{relatedPost.excerpt}</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </article>
    </>
  );
}