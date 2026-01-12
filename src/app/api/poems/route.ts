import { NextResponse } from 'next/server';
import { getPoemsData } from '@/lib/poems-server';

export async function GET() {
  try {
    const poems = await getPoemsData();
    return NextResponse.json(poems);
  } catch (error) {
    console.error('Error in /api/poems:', error);
    return NextResponse.json({ error: 'Failed to fetch poems' }, { status: 500 });
  }
}
