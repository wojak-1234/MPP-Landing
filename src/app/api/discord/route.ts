import { NextResponse } from "next/server";

const DISCORD_INVITE_CODE = "mpplanet";

// In-Memory Cache Storage for Rate Limiting mitigation
let cachedData: { members: number; presence: number } | null = null;
let lastFetchedTime = 0;
const CACHE_TTL = 60 * 1000; // 60 seconds (1 minute) Time-To-Live

export async function GET() {
  const now = Date.now();

  // Return cached result if TTL is valid to prevent hitting Discord rate limits
  if (cachedData && now - lastFetchedTime < CACHE_TTL) {
    return NextResponse.json({
      success: true,
      members: cachedData.members,
      presence: cachedData.presence,
      cached: true,
    });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`https://discord.com/api/v9/invites/${DISCORD_INVITE_CODE}?with_counts=true`, {
      signal: controller.signal,
      next: { revalidate: 60 }
    });
    
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error("Discord API response is not OK");
    }

    const data = await res.json();
    const members = data.approximate_member_count || 30000;
    const presence = data.approximate_presence_count || 5800;

    // Save fetched response to server-side memory
    cachedData = { members, presence };
    lastFetchedTime = now;
    
    return NextResponse.json({
      success: true,
      members,
      presence,
      cached: false,
    });
  } catch (error) {
    console.error("Failed to fetch Discord members, using fallback/cached data:", error);
    
    // Return cache if it exists, otherwise default fallback values
    return NextResponse.json({
      success: false,
      members: cachedData ? cachedData.members : 29847,
      presence: cachedData ? cachedData.presence : 5820,
    });
  }
}
