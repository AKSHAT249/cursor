import { useState, useRef } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const rewardTypes = [
  "Gift Card",
  "Physical Product",
  "Coupon",
  "Gift Basket",
  "Other",
];

const distributionMethods = [
  {
    label: "Distributed at the Show",
    value: "show",
    description: "I will provide the reward to the host by the start of the show day for distribution to the winner."
  },
  {
    label: "Email Delivery",
    value: "email",
    description: "I will provide proof of email delivery."
  },
  {
    label: "Shipping",
    value: "shipping",
    description: "I will provide a tracking number when I ship the reward."
  },
];

export default function RewardFormOne() {
  const [open, setOpen] = useState(true);
  const [hasASIN, setHasASIN] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [retailValue, setRetailValue] = useState("");
  const [rewardType, setRewardType] = useState("");
  const [distribution, setDistribution] = useState("show");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();
  const maxDescription = 297;
  const maxFileSize = 25 * 1024 * 1024;

  function handleFileChange(e) {
    const f = e.target.files[0];
    if (f && f.size <= maxFileSize) setFile(f);
  }
  function handleDrop(e) {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f && f.size <= maxFileSize) setFile(f);
  }

  return (
    <div className="max-w-2xl mx-auto my-8 px-2">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        {/* Accordion Header */}
        <button
          type="button"
          className="w-full flex justify-between items-center px-6 py-4 focus:outline-none"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          <span className="text-xl font-semibold text-gray-700 bg-[#F5F5F5] px-4 py-2 rounded-lg">Reward Item 1</span>
          <svg
            className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <form className="p-6 space-y-8" autoComplete="off">
            {/* ASIN Toggle */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <label className="font-medium text-gray-700 text-base" id="asin-label">Do you have ASIN for the product?</label>
              <div className="flex gap-2" role="group" aria-labelledby="asin-label">
                <button
                  type="button"
                  className={`px-6 py-2 rounded-md border font-semibold text-base transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 ${hasASIN ? "bg-blue-700 text-white border-blue-700" : "bg-white text-blue-700 border-blue-700 hover:bg-blue-50"}`}
                  onClick={() => setHasASIN(true)}
                  aria-pressed={hasASIN}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`px-6 py-2 rounded-md border font-semibold text-base transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!hasASIN ? "bg-blue-700 text-white border-blue-700" : "bg-white text-blue-700 border-blue-700 hover:bg-blue-50"}`}
                  onClick={() => setHasASIN(false)}
                  aria-pressed={!hasASIN}
                >
                  No
                </button>
              </div>
            </div>
            <hr className="my-2 border-gray-200" />
            {/* Reward Title Section */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
                <div className="flex flex-col flex-1 min-w-[180px]">
                  <label htmlFor="reward-title" className="font-medium text-gray-700 mb-1">Reward Title</label>
                  <span className="text-xs text-gray-400">e.g., Gift Basket of Organic Baby Products</span>
                </div>
                <input
                  id="reward-title"
                  className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-base placeholder:text-gray-400 min-w-[180px]"
                  placeholder="Title goes here |"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  autoComplete="off"
                />
              </div>
              {/* Description */}
              <div className="w-full flex items-center justify-between">
                <div>
                  <label htmlFor="reward-description" className="font-medium text-gray-700 mb-1">Description</label>
                  <span className="block text-xs text-gray-400">e.g., Includes eco-friendly baby wipes, a plush toy, and more!</span>
                </div>
                <div className="flex flex-col">
                  <textarea
                    id="reward-description"
                    className="border border-gray-300 rounded-md px-4 py-2 text-base text-left bg-[#F5F5F5] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    placeholder="Describe your reward..."
                    value={description}
                    onChange={e => {
                      if (e.target.value.length <= 300) {
                        setDescription(e.target.value)
                      }
                    }}
                    maxLength={300}
                    autoComplete="off"
                  />
                  <span className="text-xs text-gray-400 mt-1 text-right">{description.length}/300</span>
                </div>
              </div>
            </div>
            {/* Retail Value */}
            <div className="w-full flex items-center justify-between">
              <label htmlFor="retail-value" className=" font-medium text-gray-700 mb-1">Retail Value</label>
              <input
                id="retail-value"
                className="border border-gray-300 rounded-md px-4 py-2 text-base text-left placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="enter the retail value"
                value={retailValue}
                onChange={e => setRetailValue(e.target.value)}
                autoComplete="off"
              />
            </div>
            {/* Reward Type */}
            <div className="w-full flex items-center justify-between">
              <label htmlFor="reward-type" className="font-medium text-gray-700 mb-1">Reward Type</label>
              <select
                id="reward-type"
                className="border border-gray-300 rounded-md px-4 py-2 text-base text-left placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                value={rewardType}
                onChange={e => setRewardType(e.target.value)}
              >
                <option value="">Reward type</option>
                {rewardTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            {/* Distribution Method */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Distribution Method</label>
              <div className="flex flex-col gap-4 mt-2">
                {distributionMethods.map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-start border rounded-md p-4 cursor-pointer transition-colors ${distribution === method.value ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}`}
                  >
                    <input
                      type="radio"
                      name="distribution"
                      value={method.value}
                      checked={distribution === method.value}
                      onChange={() => setDistribution(method.value)}
                      className="form-radio accent-blue-600 mt-1 mr-4"
                    />
                    <div>
                      <span className={`block font-semibold text-base ${distribution === method.value ? "text-blue-700" : "text-gray-700"}`}>{method.label}</span>
                      {method.description && (
                        <span className="block text-xs text-gray-500 mt-1">{method.description}</span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
            {/* File Upload */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Upload a Featured Image</label>
              <span className="block text-xs text-gray-400 mb-2">Add a high-quality image to grab participants' attention. (Max. File size: 25 MB)</span>
              <div
                className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col justify-center items-center gap-2 cursor-pointer hover:border-blue-400 transition-colors"
                onClick={() => fileInputRef.current.click()}
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                tabIndex={0}
                role="button"
                aria-label="Upload a featured image"
              >
                <ArrowUpTrayIcon className="w-10 h-10 text-blue-400 mb-2" />
                <span className="text-gray-500 text-base font-medium mb-1">Click to Upload or drag and drop</span>
                <span className="text-xs text-gray-400">(Max. File size: 25 MB)</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {file && <span className="text-xs text-gray-700 mt-2">{file.name}</span>}
              </div>
              <span className="block text-xs text-gray-400 mt-2">*drag or browser from device</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 