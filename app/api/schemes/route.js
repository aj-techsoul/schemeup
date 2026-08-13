import { NextResponse } from 'next/server';
import { getAllSchemes } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || 'All';
    const userId = parseInt(searchParams.get('userId') || '1', 10);

    const data = getAllSchemes(query, category, userId);
    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    console.error('Error fetching schemes:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
