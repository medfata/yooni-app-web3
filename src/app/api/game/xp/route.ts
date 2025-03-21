import { NextRequest, NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';
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

// Blob pathname
const BLOB_PATH = 'data/xp_records.csv';

// Read records from Blob storage
async function readRecords(): Promise<XpRecord[]> {
  try {
    // List all blobs with our path prefix
    const response = await list({ prefix: BLOB_PATH });
    
    // Check if our file exists in the list
    const xpRecordBlob = response.blobs.find(blob => blob.pathname === BLOB_PATH);
    
    // If file doesn't exist, create it with headers
    if (!xpRecordBlob) {
      await put(BLOB_PATH, 'account,score,total_games\n', { access: 'public' });
      return [];
    }
    
    // Fetch the blob content
    const blobResponse = await fetch(xpRecordBlob.url);
    const content = await blobResponse.text();
    
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
    
    await put(BLOB_PATH, csv, { access: 'public' });
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