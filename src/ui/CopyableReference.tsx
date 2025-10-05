import React, { useState } from 'react';
import { FileText, Copy, Check } from 'lucide-react';

interface CopyableReferenceProps {
  referenceNumber: string;
}

const CopyableReference: React.FC<CopyableReferenceProps> = ({ referenceNumber }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="group relative flex items-center gap-1 text-sm text-gray-700 rounded-md hover:bg-gray-50  py-1 transition-colors"
      title="Click to copy"
    >
      {/* Icon */}
      <FileText className="w-4 h-4 text-gray-500 group-hover:text-blue-500 transition-colors" />

      {/* Reference text */}
      <span className="truncate max-w-[160px] mr-1 font-medium text-gray-600 group-hover:text-blue-600">
        {referenceNumber}
      </span>

      {/* Copy icon (changes when copied) */}
      {copied ? (
        <Check className="w-4 h-4 text-green-600 transition-transform duration-200 scale-110" />
      ) : (
        <Copy className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
      )}

      {/* Floating tooltip */}
      {copied && (
        <span className="absolute -top-6 right-0 bg-gray-800 text-white text-xs px-2 py-0.5 rounded-md animate-fade-in">
          Copied!
        </span>
      )}
    </button>
  );
};

export default CopyableReference;
