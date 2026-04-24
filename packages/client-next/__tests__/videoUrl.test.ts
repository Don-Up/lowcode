import { convertToEmbedUrl, isYouTubeUrl } from '../utils/videoUrl';

describe('videoUrl utilities', () => {
  describe('convertToEmbedUrl', () => {
    it('converts standard YouTube watch URL', () => {
      const url = 'https://www.youtube.com/watch?v=mZ3Dj0sRqlk';
      const result = convertToEmbedUrl(url);
      expect(result).toBe('https://www.youtube.com/embed/mZ3Dj0sRqlk');
    });

    it('converts YouTube watch URL with additional params', () => {
      const url = 'https://www.youtube.com/watch?v=mZ3Dj0sRqlk&list=PL123';
      const result = convertToEmbedUrl(url);
      expect(result).toBe('https://www.youtube.com/embed/mZ3Dj0sRqlk');
    });

    it('converts YouTube short URL', () => {
      const url = 'https://youtu.be/mZ3Dj0sRqlk';
      const result = convertToEmbedUrl(url);
      expect(result).toBe('https://www.youtube.com/embed/mZ3Dj0sRqlk');
    });

    it('passes through non-YouTube URLs unchanged', () => {
      const url = 'https://example.com/video.mp4';
      const result = convertToEmbedUrl(url);
      expect(result).toBe(url);
    });

    it('returns empty string unchanged', () => {
      expect(convertToEmbedUrl('')).toBe('');
    });
  });

  describe('isYouTubeUrl', () => {
    it('returns true for standard YouTube URL', () => {
      expect(isYouTubeUrl('https://www.youtube.com/watch?v=abc')).toBe(true);
    });

    it('returns true for YouTube short URL', () => {
      expect(isYouTubeUrl('https://youtu.be/abc')).toBe(true);
    });

    it('returns false for non-YouTube URL', () => {
      expect(isYouTubeUrl('https://example.com/video.mp4')).toBe(false);
    });

    it('returns false for empty string', () => {
      expect(isYouTubeUrl('')).toBe(false);
    });
  });
});