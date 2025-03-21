import { NextResponse } from 'next/server';
import { createClient } from 'redis';

// Define the type for our record
interface XpRecord {
  account: string;
  score: number;
  total_games: number;
}

// Redis key for XP records - must match the one in xp/route.ts
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

export async function GET() {
  try {
    // Read records from Redis
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
      message: "Leaderboard data retrieved from Redis"
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