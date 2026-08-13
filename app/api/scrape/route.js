import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';
import { promisify } from 'util';
import { getScrapeLogs } from '@/lib/db';

const execPromise = promisify(exec);

export async function GET() {
  try {
    const logs = getScrapeLogs();
    return NextResponse.json({ success: true, logs });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST() {
  try {
    const scraperScriptPath = path.join(process.cwd(), 'scraper', 'scraper.py');
    const command = `python "${scraperScriptPath}"`;
    
    const { stdout, stderr } = await execPromise(command);
    
    return NextResponse.json({
      success: true,
      message: 'Scraper executed successfully',
      output: stdout,
      errors: stderr,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Scraper execution error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to run python scraper: ' + error.message
    }, { status: 500 });
  }
}
