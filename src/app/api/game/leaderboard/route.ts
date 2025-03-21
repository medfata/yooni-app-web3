import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';
import { parse } from 'csv/sync';

// Define the type for our record
interface XpRecord {
  account: string;
  score: number;
  total_games: number;
}

// Define the context type for CSV parsing
interface CastingContext {
  column: string | number;
  header: boolean;
  index: number;
  records: number;
}

// Blob pathname - must match the one in xp/route.ts
const BLOB_PATH = 'data/xp_records.csv';

// Read records from Blob storage
async function readRecords(): Promise<XpRecord[]> {
  try {
    // List all blobs with our path prefix
    const response = await list({ prefix: BLOB_PATH });
    
    // Check if our file exists in the list
    const xpRecordBlob = response.blobs.find(blob => blob.pathname === BLOB_PATH);
    
    // If file doesn't exist
    if (!xpRecordBlob) {
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

export async function GET() {
  try {
    // Read records from Blob storage
    const records = await readRecords();
    
    // Calculate level for each record (score / 50)
    const recordsWithLevel = records.map((record: XpRecord) => ({
      ...record,
      level: Math.floor(record.score / 50)
    }));
    
    // Sort by score (highest first)
    const sortedRecords = recordsWithLevel.sort((a, b) => b.score - a.score);
    
    // Return top 100 records
    return NextResponse.json({
      success: true,
      data: sortedRecords.slice(0, 100),
      message: "Leaderboard data retrieved from Vercel Blob storage"
    });
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { 
      status: 500 
    });
  }
} 