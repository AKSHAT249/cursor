"use client";

export default function Preview({
  retailPrice = 300.98,
  title = "Reward Item Title",
  description = "Short Description",
  imageUrl = null,
}) {
  return (
    <div className="max-w-xs mx-auto mt-8">
      <div className="rounded-xl border-2 border-blue-300 p-4 bg-white shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <span className="font-medium text-gray-700 text-base">Rewards Retail Price:</span>
          <span className="font-semibold text-gray-700 text-lg">${retailPrice.toFixed(2)}</span>
        </div>
        <div className="rounded-xl border border-blue-100 bg-blue-50 flex items-center p-3 gap-4">
          <div className="w-20 h-20 rounded-lg bg-gray-200 flex-shrink-0" />
          <div className="flex flex-col justify-center">
            <span className="font-semibold text-gray-700 text-base leading-tight">{title}</span>
            <span className="text-sm text-gray-400 mt-1">{description}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 