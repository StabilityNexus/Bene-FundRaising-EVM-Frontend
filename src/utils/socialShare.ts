/**
 * Social Share Utilities
 * Generates intent URLs for sharing campaign content across social platforms
 * Implements proper URL encoding, validation, and error handling
 */

export interface ShareContent {
  /** Campaign/content title (required, max 280 chars) */
  title: string;
  /** Campaign/content description (required, max 500 chars) */
  description: string;
  /** URL to share (required, must be valid URL) */
  url: string;
  /** Optional hashtags without # symbol */
  hashtags?: string[];
}

/**
 * Validates and sanitizes share content
 * @param content - Content to validate
 * @throws Error if content is invalid
 */
const validateShareContent = (content: ShareContent): void => {
  if (!content.title?.trim()) {
    throw new Error('Share title is required');
  }
  if (!content.description?.trim()) {
    throw new Error('Share description is required');
  }
  if (!content.url?.trim()) {
    throw new Error('Share URL is required');
  }
  
  // Validate URL format
  try {
    new URL(content.url);
  } catch {
    throw new Error('Invalid share URL format');
  }
};

/**
 * Sanitizes text by removing or replacing problematic characters
 * @param text - Text to sanitize
 * @param maxLength - Maximum length
 * @returns Sanitized text
 */
const sanitizeText = (text: string, maxLength: number): string => {
  return text
    .trim()
    .replace(/[\r\n]+/g, ' ') // Replace newlines with spaces for URL compatibility
    .slice(0, maxLength)
    .trim();
};

/**
 * Sanitizes hashtags by removing special characters and ensuring proper format
 * @param hashtags - Array of hashtags
 * @returns Sanitized hashtags
 */
const sanitizeHashtags = (hashtags: string[]): string[] => {
  return hashtags
    .filter(tag => tag && tag.trim())
    .map(tag => tag.replace(/[^a-zA-Z0-9]/g, '')) // Remove special chars
    .filter(tag => tag.length > 0)
    .slice(0, 5); // Limit to 5 hashtags
};

/**
 * Generates a Twitter/X intent URL for sharing
 * @param content - Content details to share
 * @returns Twitter intent URL
 * @throws Error if content validation fails
 */
export const generateTwitterShareUrl = (content: ShareContent): string => {
  validateShareContent(content);
  
  const { title, description, url, hashtags = [] } = content;
  const sanitizedHashtags = sanitizeHashtags(hashtags);
  
  // Create share text with organization tag (Twitter has ~280 char limit)
  const baseText = `${sanitizeText(title, 100)}\n\n${sanitizeText(description, 150)}`;
  const hashtagText = `#BeneFundRaising ${sanitizedHashtags.map(tag => `#${tag}`).join(' ')}`;
  const text = `${baseText}\n\nSupport this campaign! 🚀\n\n${hashtagText}`;
  
  const params = new URLSearchParams({
    text: text.trim(),
    url: url,
  });
  
  return `https://twitter.com/intent/tweet?${params.toString()}`;
};

/**
 * Generates a Telegram share URL
 * @param content - Content details to share
 * @returns Telegram share URL
 * @throws Error if content validation fails
 */
export const generateTelegramShareUrl = (content: ShareContent): string => {
  validateShareContent(content);
  
  const { title, description, url, hashtags = [] } = content;
  const sanitizedHashtags = sanitizeHashtags(hashtags);
  
  // Create share text with organization tag
  const text = `${sanitizeText(title, 200)}\n\n${sanitizeText(description, 300)}\n\nSupport this campaign! 🚀\n\n${url}\n\n#BeneFundRaising ${sanitizedHashtags.map(tag => `#${tag}`).join(' ')}`;
  
  const params = new URLSearchParams({
    text: text.trim(),
    url: url,
  });
  
  return `https://t.me/share/url?${params.toString()}`;
};

/**
 * Generates a LinkedIn share URL
 * @param content - Content details to share
 * @returns LinkedIn share URL
 * @throws Error if content validation fails
 */
export const generateLinkedInShareUrl = (content: ShareContent): string => {
  validateShareContent(content);
  
  const { url } = content;
  
  // LinkedIn only accepts URL parameter for sharing
  const params = new URLSearchParams({
    url: url,
  });
  
  return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
};

/**
 * Copies text to clipboard with fallback support
 * @param text - Text to copy
 * @returns Promise that resolves to true if copy is successful, false otherwise
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (!text?.trim()) {
    console.error('Cannot copy empty text to clipboard');
    return false;
  }

  try {
    // Modern clipboard API (preferred)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      textArea.setAttribute('readonly', '');
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      let successful = false;
      try {
        successful = document.execCommand('copy');
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      
      textArea.remove();
      return successful;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};
