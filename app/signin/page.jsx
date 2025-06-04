'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Input from "@/app/components/Input";
import { useAuth } from '@/app/context/AuthContext';
import Link from "next/link";
import { isSkippedAuth } from '@/app/utils/auth';

export default function Page() {
  const router = useRouter();
  const { user, googleSignIn, logOut, loading } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle skip authentication
  const handleSkip = async () => {
    try {
      const response = await fetch('/api/skip-auth');
      if (!response.ok) throw new Error('Failed to skip auth');
      const { token } = await response.json();
      localStorage.setItem('skipToken', token);
      document.cookie = `skipToken=${token}; path=/; max-age=${60 * 60 * 24 * 30}`;
      router.push('/');
    } catch (error) {
      console.error('Skip failed:', error);
      setFormError('Failed to skip authentication');
    }
  };

  // Handle clear skip
  const handleClearSkip = () => {
    if (isSkippedAuth()) {
      localStorage.removeItem('skipToken');
      document.cookie = 'skipToken=; path=/; max-age=0';
    }
    router.push('/');
  };

  // Check for existing skip token
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasToken = document.cookie.includes('skipToken=') || localStorage.getItem('skipToken');
      if (hasToken) {
        router.push('/refferal');
      }
    }
  }, [user, router]);

  // Handle Google Sign-In
  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await googleSignIn();
      router.push('/refferal');
    } catch (error) {
      console.error('Sign-in error:', error);
      setFormError('Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setIsLoading(true);

    try {
      const userData = {
        name: formData.fullName,
        email: formData.email,
      };

      // First try to sign up
      const signupResponse = await fetch('https://newrepo-4pyc.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      let token;
      if (signupResponse.ok) {
        const data = await signupResponse.json();
        token = data.accessToken;
      } else {
        const errorData = await signupResponse.json();
        
        // If user exists, try to login
        if (errorData.message?.includes('already exists')) {
          const loginResponse = await fetch('https://newrepo-4pyc.onrender.com/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: formData.email }),
          });

          if (!loginResponse.ok) {
            const loginError = await loginResponse.json();
            throw new Error(loginError.message || 'Login failed');
          }

          const loginData = await loginResponse.json();
          token = loginData.accessToken;
        } else {
          throw new Error(errorData.message || 'Signup failed');
        }
      }

      if (!token) {
        throw new Error('No access token received');
      }

      // Store the token and handle successful auth
      localStorage.setItem('apiToken', token);
      router.push('/category');
    } catch (error) {
      console.error('Authentication error:', error);
      setFormError(error.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.svg"
            alt="Alaska Go"
            width={200}
            height={100}
            className="h-auto transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Welcome to Alaska Go</h1>

        {/* Error Message */}
        {formError && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
            {formError}
          </div>
        )}

        {/* Google Sign-In Button */}
        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg py-3 px-4 mb-6 text-gray-700 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 0, 0)">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </g>
          </svg>
          <span className="font-medium">Sign in with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-4 text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Email Sign-Up Form */}
        <form className="space-y-5" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full border-gray-200 rounded-lg py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full border-gray-200 rounded-lg py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-sky-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Processing...' : 'Sign Up'}
          </button>
        </form>

        {/* Skip Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleSkip}
            disabled={isLoading}
            className="text-sky-500 hover:text-sky-700 font-medium hover:underline transition-colors duration-300"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}