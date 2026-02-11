# Social Share Feature Documentation

## Overview

A robust, production-ready social sharing system for campaign pages with support for Twitter/X, Telegram, and LinkedIn platforms.

## Features

### ✅ Core Functionality
- **Multi-platform Support**: Share to Twitter/X, Telegram, and LinkedIn
- **Copy Link**: Direct clipboard copy with fallback support
- **Intent URLs**: Uses platform-specific intent URLs for proper sharing
- **Organization Branding**: Auto-includes #BeneFundRaising tag

### ✅ Robustness & Quality
- **TypeScript**: Full type safety with comprehensive interfaces
- **Input Validation**: Validates all inputs before processing
- **Error Handling**: Comprehensive error handling with user feedback
- **URL Sanitization**: Prevents injection and handles special characters
- **Accessibility**: ARIA labels, keyboard navigation (ESC to close)
- **Responsive Design**: Works on mobile, tablet, and desktop

### ✅ Security & Best Practices
- **URL Validation**: Validates URLs before sharing
- **Content Sanitization**: Removes/escapes problematic characters
- **Popup Blocking Detection**: Handles blocked popups gracefully
- **Secure Clipboard**: Uses modern Clipboard API with fallback
- **No XSS Vulnerabilities**: Proper encoding and sanitization

## Usage

### Basic Usage

```tsx
import ShareButton from './ShareButton';

function MyComponent() {
  return (
    <ShareButton
      title="My Campaign Title"
      description="Campaign description goes here"
      url="https://example.com/campaign/123"
      hashtags={["Fundraising", "Blockchain", "Web3"]}
    />
  );
}
```

### Icon-Only Mode

```tsx
<ShareButton
  title="Campaign Title"
  description="Description"
  iconOnly={true}
  buttonClassName="p-2 bg-purple-600 rounded-lg"
/>
```

### With Callbacks

```tsx
<ShareButton
  title="Campaign Title"
  description="Description"
  onShareComplete={(platform) => {
    console.log(`Shared on ${platform}`);
    analytics.track('share', { platform });
  }}
  onShareError={(error) => {
    console.error('Share failed:', error);
  }}
/>
```

## Props API

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | ✅ Yes | - | Campaign title (max 280 chars) |
| `description` | `string` | ✅ Yes | - | Campaign description (max 500 chars) |
| `url` | `string` | ❌ No | `window.location.href` | URL to share |
| `hashtags` | `string[]` | ❌ No | `["Fundraising", "Blockchain", "Crypto"]` | Hashtags without # |
| `buttonClassName` | `string` | ❌ No | Default styling | Custom button CSS class |
| `buttonText` | `string` | ❌ No | `"Share"` | Button text |
| `iconOnly` | `boolean` | ❌ No | `false` | Show only icon |
| `onShareComplete` | `(platform: string) => void` | ❌ No | - | Success callback |
| `onShareError` | `(error: Error) => void` | ❌ No | - | Error callback |

## Integration Points

### Details Page
Located in `src/Details.tsx`:
- Shows full "Share" button with text
- Positioned in page header next to campaign title
- Uses campaign details from vault data

### Home Page (Campaign Cards)
Located in `src/Home.tsx`:
- Shows icon-only button for space efficiency
- Positioned in top-right corner of each card
- Semi-transparent background for card overlay

## Technical Implementation

### File Structure
```
src/
├── ShareButton.tsx          # Main component
├── utils/
│   └── socialShare.ts       # Utility functions
│   └── socialShare.test.ts  # Unit tests
└── SHARE_FEATURE.md         # This file
```

### Share URLs Format

**Twitter/X:**
```
https://twitter.com/intent/tweet?text=[title + description + hashtags]&url=[campaign_url]
```

**Telegram:**
```
https://t.me/share/url?text=[title + description + url + hashtags]&url=[campaign_url]
```

**LinkedIn:**
```
https://www.linkedin.com/sharing/share-offsite/?url=[campaign_url]
```

## Error Handling

### Handled Error Cases
1. ✅ Invalid/empty title or description
2. ✅ Malformed URLs
3. ✅ Popup blocker detection
4. ✅ Clipboard access denied
5. ✅ Network errors
6. ✅ Special characters in content

### User Feedback
- Error messages shown in modal
- Visual feedback for copy success (2-second indicator)
- Console warnings for debugging
- Callbacks for external error tracking

## Accessibility

### Keyboard Support
- **ESC**: Close modal
- **Tab**: Navigate between buttons
- **Enter/Space**: Activate buttons

### Screen Readers
- Proper ARIA labels on all interactive elements
- Role attributes for modal and alerts
- Focus management when modal opens/closes

### Visual Indicators
- Focus rings on keyboard navigation
- Hover states for all interactive elements
- Loading/success states clearly indicated

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Fallbacks
- Legacy clipboard API for older browsers
- `execCommand` fallback for clipboard
- Graceful degradation for non-secure contexts

## Performance

- **Memoized Share Content**: Prevents unnecessary recalculations
- **Callback Optimization**: Uses `useCallback` for stable function references
- **Lazy Modal**: Modal content only renders when opened
- **No External Dependencies**: Only uses React built-ins

## Testing

### Manual Test Checklist
- [ ] Share button opens modal
- [ ] All three platforms open correct URLs
- [ ] Copy link works and shows success
- [ ] ESC key closes modal
- [ ] Click outside modal closes it
- [ ] Error messages display properly
- [ ] Works on mobile devices
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly

### Automated Tests
Run tests with:
```bash
npm test socialShare.test.ts
```

## Future Enhancements

### Potential Additions
1. **WhatsApp Support**: Add WhatsApp sharing
2. **Facebook Support**: Add Facebook sharing
3. **Custom Preview**: Open Graph meta tags
4. **Analytics**: Built-in share tracking
5. **Native Share API**: Use Web Share API on mobile
6. **QR Code**: Generate QR code for URL
7. **Email Share**: Open email client with pre-filled content

## Troubleshooting

### Popup Blocked
**Issue**: Share window doesn't open
**Solution**: Error message tells user to allow popups

### Clipboard Fails
**Issue**: Copy button doesn't work
**Solution**: Fallback to legacy method automatically

### Invalid URL
**Issue**: Share button disabled
**Solution**: Check console for validation error, ensure URL is valid

## Security Considerations

1. **No Sensitive Data**: Never share sensitive information
2. **URL Validation**: All URLs validated before use
3. **Content Sanitization**: Special characters handled properly
4. **No eval()**: No dynamic code execution
5. **CSP Friendly**: Works with Content Security Policy

## Maintenance

### Code Quality Standards
- ✅ TypeScript strict mode
- ✅ ESLint compliant
- ✅ No console errors/warnings
- ✅ Proper error handling
- ✅ Comprehensive JSDoc comments

### Dependencies
- React 18+
- No external libraries required

## License

Part of Bene FundRaising EVM Frontend project.

---

**Last Updated**: December 14, 2025
**Version**: 1.0.0
**Maintainer**: Development Team
