import { useState, useEffect, useCallback, useMemo } from "react";
import {
  generateTwitterShareUrl,
  generateTelegramShareUrl,
  generateLinkedInShareUrl,
  copyToClipboard,
  ShareContent,
} from "./utils/socialShare";

interface ShareButtonProps {
  /**
   * Title of the campaign/content to share (required)
   */
  title: string;
  /**
   * Description of the campaign/content to share (required)
   */
  description: string;
  /**
   * URL to share (defaults to current page URL)
   */
  url?: string;
  /**
   * Optional hashtags to include (without # symbol)
   */
  hashtags?: string[];
  /**
   * Custom button className for styling
   */
  buttonClassName?: string;
  /**
   * Button text (defaults to "Share")
   */
  buttonText?: string;
  /**
   * Icon-only mode (no text)
   */
  iconOnly?: boolean;
  /**
   * Optional callback when share action completes
   */
  onShareComplete?: (platform: string) => void;
  /**
   * Optional callback when share action fails
   */
  onShareError?: (error: Error) => void;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  description,
  url,
  hashtags = ["Fundraising", "Blockchain", "Crypto"],
  buttonClassName = "",
  buttonText = "Share",
  iconOnly = false,
  onShareComplete,
  onShareError,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Set the share URL on mount with validation
  useEffect(() => {
    try {
      const finalUrl = url || window.location.href;
      // Validate URL
      new URL(finalUrl);
      setShareUrl(finalUrl);
      setError(null);
    } catch (err) {
      const errorMsg = 'Invalid share URL';
      setError(errorMsg);
      console.error(errorMsg, err);
      onShareError?.(err instanceof Error ? err : new Error(errorMsg));
    }
  }, [url, onShareError]);

  // Memoize share content to prevent unnecessary recalculations
  const shareContent: ShareContent = useMemo(() => ({
    title: title?.trim() || 'Untitled Campaign',
    description: description?.trim() || 'Check out this campaign!',
    url: shareUrl,
    hashtags,
  }), [title, description, shareUrl, hashtags]);

  const handleShare = useCallback((platform: "twitter" | "telegram" | "linkedin") => {
    try {
      let shareUrl = "";

      switch (platform) {
        case "twitter":
          shareUrl = generateTwitterShareUrl(shareContent);
          break;
        case "telegram":
          shareUrl = generateTelegramShareUrl(shareContent);
          break;
        case "linkedin":
          shareUrl = generateLinkedInShareUrl(shareContent);
          break;
      }

      // Open share window with proper dimensions and features
      const shareWindow = window.open(
        shareUrl, 
        `share-${platform}`, 
        "width=600,height=400,scrollbars=yes,resizable=yes"
      );
      
      if (!shareWindow) {
        throw new Error('Popup blocked. Please allow popups for this site.');
      }
      
      setIsModalOpen(false);
      setError(null);
      onShareComplete?.(platform);
    } catch (err) {
      const errorMsg = `Failed to share on ${platform}`;
      console.error(errorMsg, err);
      setError(err instanceof Error ? err.message : errorMsg);
      onShareError?.(err instanceof Error ? err : new Error(errorMsg));
    }
  }, [shareContent, onShareComplete, onShareError]);

  const handleCopyLink = useCallback(async () => {
    try {
      const success = await copyToClipboard(shareUrl);
      if (success) {
        setCopied(true);
        setError(null);
        setTimeout(() => setCopied(false), 2000);
        onShareComplete?.('clipboard');
      } else {
        throw new Error('Failed to copy link');
      }
    } catch (err) {
      const errorMsg = 'Failed to copy link to clipboard';
      console.error(errorMsg, err);
      setError(errorMsg);
      onShareError?.(err instanceof Error ? err : new Error(errorMsg));
    }
  }, [shareUrl, onShareComplete, onShareError]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setCopied(false);
    setError(null);
  }, []);

  // Close modal on escape key and manage body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen, closeModal]);

  // Prevent rendering if there's a critical error
  if (error && !shareUrl) {
    return null;
  }

  return (
    <>
      {/* Share Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={!!error && !shareUrl}
        className={
          buttonClassName ||
          "flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        }
        aria-label="Share campaign"
        title={error || "Share this campaign"}
      >
        {/* Share Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
        {!iconOnly && <span>{buttonText}</span>}
      </button>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4"
          onClick={closeModal}
        >
          {/* Modal Content */}
          <div
            className="bg-slate-900 rounded-lg shadow-2xl max-w-md w-full p-6 border border-slate-800 relative animate-[fadeIn_0.2s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Share Campaign
              </h2>
              <p className="text-slate-400 text-sm">
                Help spread the word about this campaign
              </p>
              {error && (
                <div className="mt-3 p-3 bg-red-900/30 border border-red-700 rounded-lg" role="alert">
                  <p className="text-red-400 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </p>
                </div>
              )}
            </div>

            {/* Social Share Buttons */}
            <div className="space-y-3 mb-6">
              {/* Twitter/X */}
              <button
                onClick={() => handleShare("twitter")}
                className="w-full flex items-center gap-4 p-4 bg-slate-800 hover:bg-slate-750 rounded-lg transition-all duration-200 group border border-slate-700 hover:border-blue-500"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-black rounded-full group-hover:scale-110 transition-transform">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div className="text-left flex-1">
                  <p className="text-white font-semibold">Share on X</p>
                  <p className="text-slate-400 text-xs">
                    Post to your X followers
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Telegram */}
              <button
                onClick={() => handleShare("telegram")}
                className="w-full flex items-center gap-4 p-4 bg-slate-800 hover:bg-slate-750 rounded-lg transition-all duration-200 group border border-slate-700 hover:border-blue-400"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full group-hover:scale-110 transition-transform">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                  </svg>
                </div>
                <div className="text-left flex-1">
                  <p className="text-white font-semibold">Share on Telegram</p>
                  <p className="text-slate-400 text-xs">
                    Send to your Telegram contacts
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* LinkedIn */}
              <button
                onClick={() => handleShare("linkedin")}
                className="w-full flex items-center gap-4 p-4 bg-slate-800 hover:bg-slate-750 rounded-lg transition-all duration-200 group border border-slate-700 hover:border-blue-600"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-blue-700 rounded-full group-hover:scale-110 transition-transform">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div className="text-left flex-1">
                  <p className="text-white font-semibold">Share on LinkedIn</p>
                  <p className="text-slate-400 text-xs">
                    Post to your professional network
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900 text-slate-400">
                  or copy link
                </span>
              </div>
            </div>

            {/* Copy Link Section */}
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  copied
                    ? "bg-green-600 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {copied ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default ShareButton;
