/**
 * Semantic Search Utilities
 *
 * Provides semantic search across all Atlas patterns using OpenAI embeddings.
 * Embeddings are pre-computed at build time and semantic search is performed
 * via a serverless function to keep API keys secure.
 */

export interface SearchResult {
  id: string;
  type: string;
  name: string;
  similarity: number;
  matchReason?: string;
}

/**
 * Perform semantic search across all Atlas patterns
 *
 * Calls the /api/semantic-search serverless function which:
 * 1. Generates embedding for query (server-side)
 * 2. Compares to pre-computed embeddings
 * 3. Returns top matches above similarity threshold
 *
 * @param query - User's search query
 * @param topK - Number of results to return (default: 10)
 * @param threshold - Minimum similarity score (0-1, default: 0.5)
 * @returns Array of search results sorted by relevance
 */
export async function semanticSearch(query: string, topK: number = 10, threshold: number = 0.3): Promise<SearchResult[]> {
  // Validate query
  if (!query || query.trim().length === 0) {
    return [];
  }

  if (query.trim().length < 2) {
    return [];
  }

  try {
    // Call serverless function
    const response = await fetch(`/api/semantic-search?q=${encodeURIComponent(query.trim())}&top=${topK}&threshold=${threshold}`);

    if (!response.ok) {
      console.error('Semantic search API error:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data.results || [];

  } catch (error) {
    console.error('Error performing semantic search:', error);
    return [];
  }
}

/**
 * Check if semantic search is available
 * (checks if the API endpoint responds)
 */
export async function isSemanticSearchAvailable(): Promise<boolean> {
  try {
    // Quick health check with a simple query
    const response = await fetch('/api/semantic-search?q=test&top=1');
    return response.ok;
  } catch (error) {
    console.error('Semantic search not available:', error);
    return false;
  }
}
