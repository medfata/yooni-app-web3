import { NextResponse } from 'next/server';
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

// The blob URL - must match the one in xp/route.ts
const BLOB_URL = '3ue4pf82fw2lybxo.public.blob.vercel-storage.com/xp_records-PeORT6NTuZ938SrC9o0ttCXAIFRfed.csv';

// Read records from Blob storage
async function readRecords(): Promise<XpRecord[]> {
  try {
    // Fetch the blob directly
    const response = await fetch(BLOB_URL);
    
    // If file doesn't exist or response is not ok
    if (!response.ok) {
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