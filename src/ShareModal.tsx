import { useEffect, useRef } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  projectUrl: string;
  organizationTag?: string;
}

const ShareModal = ({
  isOpen,
  onClose,
  projectTitle,
  projectUrl,
  organizationTag = "@BeneFundRaising",
}: ShareModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Generate share message
  const generateMessage = (): string => {
    const baseMessage = `Check out this amazing funding opportunity: "${projectTitle}"`;
    const message = `${baseMessage} on Bene! ${organizationTag}`;
    return message;
  };

  // Share to Twitter/X
  const shareToTwitter = () => {
    const message = generateMessage();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(projectUrl)}`;
    window.open(twitterUrl, "twitter-share", "width=550,height=420");
  };

  // Share to Telegram
  const shareToTelegram = () => {
    const message = generateMessage();
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(projectUrl)}&text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, "telegram-share", "width=550,height=420");
  };

  // Share to LinkedIn
  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(projectUrl)}`;
    window.open(linkedInUrl, "linkedin-share", "width=550,height=420");
  };

  // Handle click outside modal to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-slate-900 border border-slate-950 rounded-lg shadow-lg p-6 max-w-sm w-full mx-4"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Share Campaign</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Campaign Preview */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 mb-6">
          <p className="text-slate-300 text-sm">
            <span className="text-slate-400">Campaign:</span>{" "}
            <span className="text-white font-semibold">{projectTitle}</span>
          </p>
        </div>

        {/* Social Media Buttons */}
        <div className="space-y-3 mb-6">
          {/* Twitter Button */}
          <button
            onClick={shareToTwitter}
            className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8.29 20c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-7.678 3.744A11.651 11.651 0 012.251 3.154a4.106 4.106 0 001.273 5.48A4.065 4.065 0 012.97 8.6v.051a4.109 4.109 0 003.296 4.022 4.093 4.093 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
            <span>Share on X (Twitter)</span>
          </button>

          {/* Telegram Button */}
          <button
            onClick={shareToTelegram}
            className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.5-1.359 8.627-.168.879-.535 1.17-.992 1.201-.418.03-.838-.4-1.3-.773l-1.622-1.246c-.881-.67-1.386-1.095-2.252-1.759-.505-.384-.952-.798-1.265-1.386-.11-.192-.24-.437-.132-.703a.478.478 0 0 1 .531-.331c.105.007.949.148 1.767.433l.356.1c.779.165 1.659.419 1.979.494.375.1.711.032.976-.522.265-.552.744-1.869 1.3-4.514.066-.310.131-.653.141-.822.025-.606-.483-.608-.863-.562-.217.03-.381.115-.558.252-.506.386-1.702 1.505-2.764 2.372-.564.425-1.009.577-1.418.544-.39-.03-.567-.266-.767-.919l-.204-.52c-.105-.253-.completing-.437-.376-.637C5.122 10.966 4.242 10.467 3.629 9.8c-.743-.797-1.34-1.374-1.84-1.802-.5-.427-.949-.847-1.294-1.372-.096-.144-.19-.3-.282-.458-.08-.147-.15-.285-.2-.425a.341.341 0 0 1 .062-.315.294.294 0 0 1 .298-.118.502.502 0 0 1 .372.286c.024.053.047.1.068.15.118.29.35.81.637 1.262.288.45.724 1.063 1.193 1.563.201.2.406.404.617.604a65.896 65.896 0 0 1 1.076.997c.348.328.674.661.968.978.148.16.291.319.428.474.277.308.506.545.719.748.106.11.21.216.31.318.283.298.513.537.657.723.073.095.14.187.202.275" />
            </svg>
            <span>Share on Telegram</span>
          </button>

          {/* LinkedIn Button */}
          <button
            onClick={shareToLinkedIn}
            className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.39v-1.2h-2.84v8.37h2.84v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.84M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
            <span>Share on LinkedIn</span>
          </button>
        </div>

        {/* Copy Link Button */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(projectUrl);
            alert("Campaign link copied to clipboard!");
          }}
          className="w-full px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-colors"
        >
          📋 Copy Campaign Link
        </button>

        {/* Footer */}
        <div className="mt-4 text-center text-slate-400 text-sm">
          <p>Share this amazing campaign with your network!</p>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
