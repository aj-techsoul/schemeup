import { NextResponse } from 'next/server';
import { toggleSaveScheme } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { schemeId, userId = 1 } = body;
    if (!schemeId) {
      return NextResponse.json({ success: false, error: 'Missing schemeId' }, { status: 400 });
    }
    const isSaved = toggleSaveScheme(userId, schemeId);
    return NextResponse.json({ success: true, isSaved });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
