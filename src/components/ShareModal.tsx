import type { FC } from "react";
import "../styles/footer.css";

type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ShareModal: FC<ShareModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareMessage = `Check out this fundraising campaign on Bene by @StabilityNexus: ${currentUrl}`;

  const handleTwitterShare = () => {
    const encodedText = encodeURIComponent(shareMessage);
    const encodedUrl = encodeURIComponent(currentUrl);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    window.open(twitterUrl, "_blank", "width=550,height=420");
  };

  const handleTelegramShare = () => {
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedText = encodeURIComponent(shareMessage);
    const telegramUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
    window.open(telegramUrl, "_blank", "width=550,height=420");
  };

  const handleLinkedInShare = () => {
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent("Bene Fundraising Campaign");
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`;
    window.open(linkedInUrl, "_blank", "width=550,height=420");
  };

  return (
    <div className="kya-modal-overlay" onClick={onClose}>
      <div className="kya-modal-content share-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="kya-modal-header">
          <h2 className="kya-modal-title">Share Campaign</h2>
          <button className="kya-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="kya-modal-body">
          <p className="share-modal-description">
            Share this fundraising campaign with your network:
          </p>

          <div className="share-modal-buttons">
            <button
              className="share-button share-button-twitter"
              onClick={handleTwitterShare}
            >
              <svg
                className="share-button-icon"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
              </svg>
              <span>Share on Twitter</span>
            </button>

            <button
              className="share-button share-button-telegram"
              onClick={handleTelegramShare}
            >
              <svg
                className="share-button-icon"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12.3583 9.38244C11.3857 9.787 9.44177 10.6243 6.52657 11.8944C6.05318 12.0827 5.8052 12.2669 5.78263 12.4469C5.74448 12.7513 6.12559 12.8711 6.64455 13.0343C6.71515 13.0565 6.78829 13.0795 6.86327 13.1038C7.37385 13.2698 8.06068 13.464 8.41773 13.4717C8.74161 13.4787 9.1031 13.3452 9.50219 13.0711C12.226 11.2325 13.632 10.3032 13.7202 10.2831C13.7825 10.269 13.8688 10.2512 13.9273 10.3032C13.9858 10.3552 13.98 10.4536 13.9738 10.48C13.9361 10.641 12.4401 12.0318 11.6659 12.7515C11.4246 12.9759 11.2534 13.135 11.2184 13.1714C11.14 13.2528 11.0601 13.3298 10.9833 13.4038C10.509 13.8611 10.1532 14.204 11.003 14.764C11.4114 15.0331 11.7381 15.2556 12.0641 15.4776C12.4201 15.7201 12.7752 15.9619 13.2347 16.2631C13.3517 16.3398 13.4635 16.4195 13.5724 16.4971C13.9867 16.7925 14.3589 17.0579 14.8188 17.0155C15.086 16.991 15.362 16.7397 15.5022 15.9903C15.8335 14.2193 16.4847 10.382 16.6352 8.80081C16.6484 8.66228 16.6318 8.48498 16.6185 8.40715C16.6051 8.32932 16.5773 8.21842 16.4761 8.13633C16.3563 8.03911 16.1714 8.01861 16.0886 8.02C15.7125 8.0267 15.1354 8.22735 12.3583 9.38244Z"
                />
              </svg>
              <span>Share on Telegram</span>
            </button>

            <button
              className="share-button share-button-linkedin"
              onClick={handleLinkedInShare}
            >
              <svg
                className="share-button-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.5 18h3V6.9h-3V18zM4 2c-1 0-1.8.8-1.8 1.8S3 5.6 4 5.6s1.8-.8 1.8-1.8S5 2 4 2zm6.6 6.6V6.9h-3V18h3v-5.7c0-3.2 4.1-3.4 4.1 0V18h3v-6.8c0-5.4-5.7-5.2-7.1-2.6z" />
              </svg>
              <span>Share on LinkedIn</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
