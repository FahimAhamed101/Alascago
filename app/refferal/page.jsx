'use client';
import { useRouter } from 'next/navigation';
import Input from "../components/Input";
import Image from "next/image";
import { useEffect, useState } from 'react';

export default function ReferralPage() { 
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiToken, setApiToken] = useState("");

  useEffect(() => {
    // Check for skip token
    const hasToken = typeof window !== 'undefined' && 
                    (document.cookie.includes('ReferrelskipToken=') || 
                     localStorage.getItem('ReferrelskipToken'));
    
    if (hasToken) {
      router.push('/category');
    }

    // Get API token from localStorage if available
    const token = localStorage.getItem('apiToken');
    if (token) {
      setApiToken(token);
    }
  }, [router]);

  const handleSkip = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/skip-auth');
      
      if (!response.ok) {
        throw new Error('Failed to skip referral');
      }
      
      const { token } = await response.json();
      
      // Store token in both localStorage and cookie
      localStorage.setItem('ReferrelskipToken', token);
      document.cookie = `ReferrelskipToken=${token}; path=/; max-age=${60 * 60 * 24 * 30}; Secure; SameSite=Lax`;
      
      router.push('/category');
    } catch (error) {
      console.error('Skip failed:', error);
      setError(error.message || 'Failed to skip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!fullname.trim()) {
      setError('Please enter a referral name');
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Get the latest token in case it was updated
      const token = localStorage.getItem('apiToken') || apiToken;
      if (!token) {
        throw new Error('Authentication required - please login again');
      }

      const response = await fetch(
        `https://newrepo-4pyc.onrender.com/user/add-referral/${encodeURIComponent(fullname)}`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit referral');
      }

      // Store token after successful referral submission
      const { referralToken } = await response.json();
      localStorage.setItem('ReferrelskipToken', referralToken);
      document.cookie = `ReferrelskipToken=${referralToken}; path=/; max-age=${60 * 60 * 24 * 30}; Secure; SameSite=Lax`;
      
      router.push('/');
    } catch (error) {
      console.error('Submission error:', error);
      setError(error.message || 'Failed to submit referral');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image 
            src="/logo.svg" 
            alt="Alaska Go" 
            width={200} 
            height={100} 
            className="h-auto" 
            priority
          />
        </div>

        <div className="py-2">
          <h1 className="text-2xl font-medium text-gray-800">Referral Name</h1>
          <p className="text-gray-600 mt-1">Please enter the name of the person who referred you.</p>
        </div>
    
        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input 
              id="fullName" 
              value={fullname} 
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Enter referral name" 
              className="w-full border-gray-300" 
              required 
              disabled={loading}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full bg-[#76b82a] hover:bg-[#68a325] text-white py-3 rounded-md transition-colors ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Processing...' : 'Next'}
          </button>
        </form>

        {/* Skip Link */}
        <div className="text-center mt-6">
          <button 
            onClick={handleSkip} 
            disabled={loading}
            className={`text-blue-500 hover:underline ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Processing...' : 'Skip'}
          </button>
        </div>
      </div>
    </div>
  );
}