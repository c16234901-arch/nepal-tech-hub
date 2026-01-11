import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/**
 * Edge function to fetch Nepal technology news from GNews API
 * This proxies the API call to avoid CORS issues in the browser
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// GNews API key
const GNEWS_API_KEY = "b773cf42d9d759247e5e29e05850867f";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Fetching Nepal tech news from GNews API...");
    
    // Fetch news from GNews API
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=Nepal+technology&lang=en&max=10&apikey=${GNEWS_API_KEY}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GNews API error:", response.status, errorText);
      throw new Error(`GNews API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log(`Successfully fetched ${data.articles?.length || 0} articles`);

    return new Response(JSON.stringify(data), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch news';
    console.error('Error fetching news:', errorMessage);
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        articles: [] 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
