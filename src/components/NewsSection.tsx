import { useQuery } from "@tanstack/react-query";
import NewsCard from "./NewsCard";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

interface GNewsResponse {
  totalArticles: number;
  articles: Article[];
}

// GNews API key (publishable - used client-side)
const GNEWS_API_KEY = "b773cf42d9d759247e5e29e05850867f";

/**
 * Fetches Nepal technology news from GNews API
 * Results are cached for 24 hours (controlled by staleTime)
 */
const fetchNepalTechNews = async (): Promise<Article[]> => {
  // Search for Nepal + technology news
  const response = await fetch(
    `https://gnews.io/api/v4/search?q=Nepal+technology&lang=en&max=10&apikey=${GNEWS_API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }
  
  const data: GNewsResponse = await response.json();
  return data.articles || [];
};

/**
 * News section displaying the latest Nepal tech news
 */
const NewsSection = () => {
  const { 
    data: articles, 
    isLoading, 
    isError, 
    error,
    refetch,
    isFetching 
  } = useQuery({
    queryKey: ["nepal-tech-news"],
    queryFn: fetchNepalTechNews,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - news refreshes once per day
    gcTime: 24 * 60 * 60 * 1000, // Keep in cache for 24 hours
    retry: 2,
  });

  return (
    <section className="container-main py-8 sm:py-12">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Latest Nepal Tech News
        </h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
          className="text-muted-foreground hover:text-foreground"
        >
          <RefreshCw className={`h-4 w-4 mr-1 ${isFetching ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading latest news...</p>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <AlertCircle className="h-8 w-8 text-destructive mb-4" />
          <p className="text-foreground font-medium mb-2">Failed to load news</p>
          <p className="text-muted-foreground text-sm mb-4">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
          <Button onClick={() => refetch()} variant="outline">
            Try again
          </Button>
        </div>
      )}

      {/* News grid */}
      {articles && articles.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <div 
              key={article.url} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <NewsCard
                title={article.title}
                description={article.description || article.content?.slice(0, 150) || ""}
                source={article.source.name}
                publishedAt={article.publishedAt}
                url={article.url}
                image={article.image}
              />
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {articles && articles.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No news articles found at the moment.</p>
        </div>
      )}
    </section>
  );
};

export default NewsSection;
