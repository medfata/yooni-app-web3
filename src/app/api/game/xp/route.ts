import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parse, stringify } from 'csv/sync';

// Define the type for our CSV record
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

// Path to the CSV file in the public directory
const csvFilePath = path.join(process.cwd(), 'public', 'data', 'xp_records.csv');

// Ensure the data directory exists
const ensureDirectoryExists = () => {
  const dir = path.dirname(csvFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Read records from CSV or initialize if it doesn't exist
const readRecords = (): XpRecord[] => {
  ensureDirectoryExists();
  
  if (!fs.existsSync(csvFilePath)) {
    // If file doesn't exist, create it with headers
    fs.writeFileSync(csvFilePath, 'account,score,total_games\n');
    return [];
  }
  
  // Read and parse CSV content
  const content = fs.readFileSync(csvFilePath, 'utf8');
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
};

// Write records to CSV
const writeRecords = (records: XpRecord[]) => {
  ensureDirectoryExists();
  
  const csv = stringify(records, {
    header: true,
    columns: ['account', 'score', 'total_games']
  });
  
  fs.writeFileSync(csvFilePath, csv);
};

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
    const records = readRecords();
    
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
    
    // Write updated records back to CSV
    writeRecords(records);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing XP update:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 