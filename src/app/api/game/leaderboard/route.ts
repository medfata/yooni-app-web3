import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv/sync';

// Define the type for our CSV record
interface XpRecord {
  account: string;
  score: number;
  total_games: number;
}

// Path to the CSV file
const csvFilePath = path.join(process.cwd(), 'public', 'data', 'xp_records.csv');

// Read records from CSV or return empty array if it doesn't exist
const readRecords = (): XpRecord[] => {
  if (!fs.existsSync(csvFilePath)) {
    return [];
  }
  
  // Read and parse CSV content
  const content = fs.readFileSync(csvFilePath, 'utf8');
  return parse(content, {
    columns: true,
    skip_empty_lines: true,
    cast: (value: string, context: { column: string | number }) => {
      // Convert numeric columns to numbers
      if (context.column === 'score' || context.column === 'total_games') {
        return parseInt(value, 10);
      }
      return value;
    }
  }) as XpRecord[];
};

export async function GET() {
  try {
    // Read records from CSV
    const records = readRecords();
    
    // Calculate level for each record (score / 50)
    const recordsWithLevel = records.map(record => ({
      ...record,
      level: Math.floor(record.score / 50)
    }));
    
    // Sort by score (highest first)
    const sortedRecords = recordsWithLevel.sort((a, b) => b.score - a.score);
    
    // Return top 100 records
    return NextResponse.json({
      success: true,
      data: sortedRecords.slice(0, 100)
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