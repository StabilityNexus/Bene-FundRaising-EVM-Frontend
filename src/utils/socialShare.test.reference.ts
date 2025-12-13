/**
 * Unit tests for social share utilities
 * These tests ensure robustness and proper error handling
 */

import {
  generateTwitterShareUrl,
  generateTelegramShareUrl,
  generateLinkedInShareUrl,
  copyToClipboard,
  ShareContent,
} from './socialShare';

describe('Social Share Utilities', () => {
  const validContent: ShareContent = {
    title: 'Test Campaign',
    description: 'This is a test campaign for fundraising',
    url: 'https://example.com/campaign/123',
    hashtags: ['Test', 'Campaign'],
  };

  describe('generateTwitterShareUrl', () => {
    it('should generate valid Twitter share URL', () => {
      const url = generateTwitterShareUrl(validContent);
      expect(url).toContain('https://twitter.com/intent/tweet');
      expect(url).toContain('text=');
      expect(url).toContain('url=');
    });

    it('should include hashtags in the URL', () => {
      const url = generateTwitterShareUrl(validContent);
      expect(url).toContain('BeneFundRaising');
      expect(url).toContain('Test');
    });

    it('should throw error for empty title', () => {
      expect(() => {
        generateTwitterShareUrl({ ...validContent, title: '' });
      }).toThrow('Share title is required');
    });

    it('should throw error for invalid URL', () => {
      expect(() => {
        generateTwitterShareUrl({ ...validContent, url: 'not-a-url' });
      }).toThrow('Invalid share URL format');
    });

    it('should sanitize and truncate long text', () => {
      const longContent = {
        ...validContent,
        title: 'A'.repeat(300),
        description: 'B'.repeat(300),
      };
      const url = generateTwitterShareUrl(longContent);
      expect(url.length).toBeLessThan(4096); // URL length limit
    });
  });

  describe('generateTelegramShareUrl', () => {
    it('should generate valid Telegram share URL', () => {
      const url = generateTelegramShareUrl(validContent);
      expect(url).toContain('https://t.me/share/url');
      expect(url).toContain('text=');
    });

    it('should include URL in the text', () => {
      const url = generateTelegramShareUrl(validContent);
      expect(url).toContain(encodeURIComponent(validContent.url));
    });
  });

  describe('generateLinkedInShareUrl', () => {
    it('should generate valid LinkedIn share URL', () => {
      const url = generateLinkedInShareUrl(validContent);
      expect(url).toContain('https://www.linkedin.com/sharing/share-offsite');
      expect(url).toContain('url=');
    });
  });

  describe('copyToClipboard', () => {
    it('should return false for empty text', async () => {
      const result = await copyToClipboard('');
      expect(result).toBe(false);
    });

    // Note: Actual clipboard tests require browser environment
    // These would need to be run in a browser test environment like Jest with jsdom
  });
});
