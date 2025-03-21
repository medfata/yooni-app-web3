import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'redis';

// Define the type for our record
interface XpRecord {
  account: string;
  score: number;
  total_games: number;
}

// Redis key for XP records
const REDIS_KEY = 'xp_records';

// Helper function to connect to Redis
async function getRedisClient() {
  const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  });
  
  await client.connect();
  return client;
}

// Read records from Redis
async function readRecords(): Promise<XpRecord[]> {
  try {
    const client = await getRedisClient();
    
    // Get the records from Redis
    const data = await client.get(REDIS_KEY);
    await client.disconnect();
    
    // If no data found, return empty array
    if (!data) {
      return [];
    }
    
    // Parse the JSON data
    return JSON.parse(data) as XpRecord[];
  } catch (error) {
    console.error('Error reading records from Redis:', error);
    return [];
  }
}

// Write records to Redis
async function writeRecords(records: XpRecord[]) {
  try {
    const client = await getRedisClient();
    
    // Store records as JSON string
    await client.set(REDIS_KEY, JSON.stringify(records));
    await client.disconnect();
  } catch (error) {
    console.error('Error writing records to Redis:', error);
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
    
    // Write updated records back to Redis
    await writeRecords(records);
    
    return NextResponse.json({ 
      success: true
    });
  } catch (error) {
    console.error('Error processing XP update:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 