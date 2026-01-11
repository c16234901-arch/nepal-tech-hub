import { ExternalLink } from "lucide-react";

interface NewsCardProps {
  title: string;
  description: string;
  source: string;
  publishedAt: string;
  url: string;
  image?: string;
}

/**
 * Individual news card displaying article information
 */
const NewsCard = ({ title, description, source, publishedAt, url, image }: NewsCardProps) => {
  // Format the date to a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <article className="news-card bg-card border border-border rounded-lg overflow-hidden">
      {/* News image */}
      {image && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              // Hide image on error
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
      
      <div className="p-4 sm:p-5">
        {/* Source and date */}
        <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
          <span className="font-medium text-primary">{source}</span>
          <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {description}
        </p>
        
        {/* Read more link */}
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Read more
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
};

export default NewsCard;
