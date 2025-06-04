// app/api/skip-auth/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET() {
  const token = jwt.sign(
    { skipped: true }, 
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
  
  return NextResponse.json({ token });
}