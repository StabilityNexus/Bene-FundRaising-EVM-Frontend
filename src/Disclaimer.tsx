import { useState, useEffect } from "react";

const Disclaimer = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true); // Opens automatically when page loads
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4">
      <div className="bg-[#1c1c24] border border-gray-700 p-6 rounded-2xl shadow-2xl max-w-md w-full text-center relative animate-fade-in-up">
        
        <div className="mb-4 text-yellow-500 text-5xl">⚠️</div>

        <h2 className="text-2xl font-bold text-white mb-3">Disclaimer</h2>

        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          This project is for <strong>educational purposes only</strong>. 
          The information and features provided are a simulation 
          and should not be used for real financial transactions.
        </p>

        <button
          onClick={() => setIsOpen(false)}
          className="w-full py-3 bg-[#4acd8d] hover:bg-[#3db87c] text-[#1c1c24] font-bold rounded-xl transition-all duration-300"
        >
          I Understand
        </button>
      </div>
    </div>
  );
};

export default Disclaimer;