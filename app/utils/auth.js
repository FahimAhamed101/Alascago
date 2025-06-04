// utils/auth.ts
export const isSkippedAuth = () => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('skipToken');
  }
  return false;
};

export const clearSkipAuth = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('skipToken');
    document.cookie = 'skipToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
};