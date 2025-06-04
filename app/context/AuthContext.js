'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/app/lib/firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const AuthContext = createContext();

export  function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiToken, setApiToken] = useState(null);
  const [googleAccessToken, setGoogleAccessToken] = useState(null);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('openid email profile');
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Get the Google access token
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      setGoogleAccessToken(accessToken);
      localStorage.setItem('googleAccessToken', accessToken);

      // Prepare user data
      const userData = {
        email: user.email,
        name: user.displayName || '',
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
            body: JSON.stringify({ email: user.email }),
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

      // Store the API token
      setApiToken(token);
      localStorage.setItem('apiToken', token);
      console.log('API Token stored:', token);

      return user.email;

    } catch (error) {
      console.error('Authentication error:', error);
      // Clean up on error
      await signOut(auth);
      localStorage.removeItem('apiToken');
      localStorage.removeItem('googleAccessToken');
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setApiToken(null);
      setGoogleAccessToken(null);
      localStorage.removeItem('apiToken');
      localStorage.removeItem('googleAccessToken');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        const storedApiToken = localStorage.getItem('apiToken');
        const storedGoogleToken = localStorage.getItem('googleAccessToken');
        if (storedApiToken) setApiToken(storedApiToken);
        if (storedGoogleToken) setGoogleAccessToken(storedGoogleToken);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      googleSignIn, 
      logOut, 
      loading, 
      apiToken, 
      googleAccessToken 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}