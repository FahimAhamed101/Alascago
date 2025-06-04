import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextResponse } from 'next/server';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: 'openid email profile',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          console.log('Attempting Google sign-in for:', user.email);

          let apiToken;
          let authEndpoint = '/auth/signup'; // Default to signup

          // First attempt to sign up
          const signupResponse = await fetch('https://newrepo-4pyc.onrender.com/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
            }),
          });

          if (signupResponse.ok) {
            const data = await signupResponse.json();
            if (!data.accessToken) {
              console.error('Signup response missing accessToken');
              return false;
            }
            apiToken = data.accessToken;
            
            console.log('Signup successful. API Token:', apiToken);
          } else {
            const errorData = await signupResponse.json();
            console.log('Signup error:', errorData);

            // If user exists, attempt login
            if (errorData.message?.includes('already exists')) {
              authEndpoint = '/auth/login';
              const loginResponse = await fetch('https://newrepo-4pyc.onrender.com/auth/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: user.email,
                }),
              });

              if (!loginResponse.ok) {
                console.error('Login failed:', await loginResponse.text());
                return false;
              }

              const loginData = await loginResponse.json();
              if (!loginData.accessToken) {
                console.error('Login response missing accessToken');
                return false;
              }
              apiToken = loginData.accessToken;
              console.log('Login successful. API Token:', apiToken);
            } else {
              console.error('Signup failed:', errorData);
              return false;
            }
          }

          if (apiToken && account.access_token) {
            return {
              ...user,
              apiToken, // Store API token
              googleAccessToken: account.access_token, // Store Google OAuth token
            };
          }
        } catch (error) {
          console.error('Authentication error:', error);
          return false;
        }
      }
      return false;
    },
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        if (user.apiToken) {
          token.apiToken = user.apiToken;
          console.log('JWT - API Token stored:', token.apiToken);
        }
        if (user.googleAccessToken) {
          token.googleAccessToken = user.googleAccessToken;
          console.log('JWT - Google Access Token stored:', token.googleAccessToken);
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Expose both tokens to the client
      if (token.apiToken) {
        session.apiToken = token.apiToken;
        console.log('Session - API Token exposed:', session.apiToken);
      }
      if (token.googleAccessToken) {
        session.googleAccessToken = token.googleAccessToken;
        console.log('Session - Google Access Token exposed:', session.googleAccessToken);
      }
      return session;
    },
  },
};

// Initialize NextAuth handler
const handler = NextAuth(authOptions);

// Export named HTTP methods
export const GET = (req, res) => handler(req, res);
export const POST = (req, res) => handler(req, res);