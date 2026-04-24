/**
 * Converts YouTube URLs to embed format for iframe embedding.
 * Supports both standard watch URLs and short youtu.be URLs.
 */
export function convertToEmbedUrl(url: string): string {
  if (!url) return url;

  // YouTube watch URL: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/watch\?.*&v=)([^&\s?]+)/);
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

  // YouTube short URL: https://youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^&\s?]+)/);
  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  // Return original URL if not a YouTube URL
  return url;
}

/**
 * Checks if a URL is a YouTube URL
 */
export function isYouTubeUrl(url: string): boolean {
  if (!url) return false;
  return /youtube\.com|youtu\.be/.test(url);
}