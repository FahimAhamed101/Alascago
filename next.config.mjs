/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: [
      'plus.unsplash.com', // Add this
      'images.unsplash.com','res.cloudinary.com', // You might need this too
      'example.com',"media.istockphoto.com","lh3.googleusercontent.com"// Add other domains you use
    ],
  },
};

export default nextConfig;
