import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { parse, stringify } from 'csv/sync';

// Define the type for our record
interface XpRecord {
  account: string;
  score: number;
  total_games: number;
}

// Define the context type for CSV parsing based on the library's expectations
interface CastingContext {
  column: string | number;
  header: boolean;
  index: number;
  records: number;
}

// The blob URL 
const BLOB_URL = '3ue4pf82fw2lybxo.public.blob.vercel-storage.com/xp_records-PeORT6NTuZ938SrC9o0ttCXAIFRfed.csv';

// Read records from Blob storage
async function readRecords(): Promise<XpRecord[]> {
  try {
    // Fetch the blob directly
    const response = await fetch(BLOB_URL);
    
    // If file doesn't exist or response is not ok, create it with headers
    if (!response.ok) {
      await put('xp_records-PeORT6NTuZ938SrC9o0ttCXAIFRfed.csv', 'account,score,total_games\n', { access: 'public' });
      return [];
    }
    
    // Read and parse CSV content
    const content = await response.text();
    return parse(content, {
      columns: true,
      skip_empty_lines: true,
      cast: (value: string, context: CastingContext) => {
        // Convert numeric columns to numbers
        if (context.column === 'score' || context.column === 'total_games') {
          return parseInt(value, 10);
        }
        return value;
      }
    }) as XpRecord[];
  } catch (error) {
    console.error('Error reading records:', error);
    return [];
  }
}

// Write records to Blob storage
async function writeRecords(records: XpRecord[]) {
  try {
    const csv = stringify(records, {
      header: true,
      columns: ['account', 'score', 'total_games']
    });
    
    await put('xp_records-PeORT6NTuZ938SrC9o0ttCXAIFRfed.csv', csv, { access: 'public' });
  } catch (error) {
    console.error('Error writing records:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { account, score } = body;
    
    // Validate the input
    if (!account || typeof account !== 'string') {
      return NextResponse.json({ error: 'Invalid account' }, { status: 400 });
    }
    
    if (score === undefined || typeof score !== 'number') {
      return NextResponse.json({ error: 'Invalid score' }, { status: 400 });
    }
    
    // Read existing records
    const records = await readRecords();
    
    // Find if account already exists
    const existingRecordIndex = records.findIndex(record => record.account === account);
    
    if (existingRecordIndex !== -1) {
      // Update existing record
      records[existingRecordIndex].score += score;
      records[existingRecordIndex].total_games += 1;
    } else {
      // Add new record
      records.push({
        account,
        score,
        total_games: 1
      });
    }
    
    // Write updated records back to Blob storage
    await writeRecords(records);
    
    return NextResponse.json({ 
      success: true,
      message: "Score updated successfully in Vercel Blob storage"
    });
  } catch (error) {
    console.error('Error processing XP update:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 