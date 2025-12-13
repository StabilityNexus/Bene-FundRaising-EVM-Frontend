import { useState } from "react";

const ShareBtn = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    // 1. Get the current URL
    const currentUrl = window.location.href;

    // 2. Copy to clipboard
    navigator.clipboard.writeText(currentUrl).then(() => {
      // 3. Change button state to show feedback
      setCopied(true);

      // 4. Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <button
      onClick={handleShare}
      className={`
        mt-4 w-full py-3 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2
        ${copied 
          ? "bg-green-500 text-white" 
          : "bg-[#2c2f32] text-gray-300 hover:bg-[#3a3d42] border border-gray-600"}
      `}
    >
      {/* Icon Logic */}
      {copied ? (
        <>
          <span>✅</span> Link Copied!
        </>
      ) : (
        <>
          <span>🔗</span> Share This Campaign
        </>
      )}
    </button>
  );
};

export default ShareBtn;