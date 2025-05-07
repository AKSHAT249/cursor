"use client";
import { useState, useRef } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";

const rewardTypes = [
  "Gift Basket",
  "Gift Card",
  "Product Sample",
  "Coupon",
  "Other",
];

const distributionMethods = [
  { label: "Distributed at the Show", value: "show" },
  { label: "Email Delivery", value: "email" },
  { label: "Shipping", value: "shipping" },
];

function RewardItemAccordion() {
  const [open, setOpen] = useState(true);
  const [hasASIN, setHasASIN] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [retailValue, setRetailValue] = useState("");
  const [rewardType, setRewardType] = useState("");
  const [distribution, setDistribution] = useState("show");
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [touched, setTouched] = useState({});
  const fileInputRef = useRef();

  const maxDescription = 300;
  const maxFileSize = 25 * 1024 * 1024; // 25MB

  // Validation
  const errors = {
    title: !title ? "Title is required" : "",
    description: !description ? "Description is required" : description.length > maxDescription ? `Max ${maxDescription} characters` : "",
    retailValue: !retailValue ? "Retail value is required" : "",
    rewardType: !rewardType ? "Reward type is required" : "",
    distribution: !distribution ? "Distribution method is required" : "",
    image: imageError,
  };
  const isValid = Object.values(errors).every((e) => !e);

  // Image upload handler
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      if (file.size > maxFileSize) {
        setImageError("File size exceeds 25MB");
        setImage(null);
      } else {
        setImage(file);
        setImageError("");
      }
    }
  }

  // Drag and drop
  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size > maxFileSize) {
        setImageError("File size exceeds 25MB");
        setImage(null);
      } else {
        setImage(file);
        setImageError("");
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
      {/* Accordion Header */}
      <button
        type="button"
        className="w-full flex justify-between items-center px-6 py-4 focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="text-lg font-semibold text-gray-900">Reward Item</span>
        <svg className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {/* Accordion Content */}
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[2000px] opacity-100 py-4 px-6" : "max-h-0 opacity-0 p-0"}`}>
        {/* ASIN Toggle */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-2">Do you have ASIN for the product?</label>
          <div className="flex space-x-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-lg border ${hasASIN === true ? "bg-indigo-600 text-white border-indigo-600" : "bg-gray-100 text-gray-700 border-gray-300"}`}
              onClick={() => setHasASIN(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-lg border ${hasASIN === false ? "bg-indigo-600 text-white border-indigo-600" : "bg-gray-100 text-gray-700 border-gray-300"}`}
              onClick={() => setHasASIN(false)}
            >
              No
            </button>
          </div>
        </div>
        {/* Title */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
          <input
            className={`w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${errors.title && touched.title ? "border-red-400" : "border-gray-300"}`}
            placeholder="Gift Basket of Organic Baby Products"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, title: true }))}
          />
          {errors.title && touched.title && <div className="text-xs text-red-500 mt-1">{errors.title}</div>}
        </div>
        {/* Description */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
          <textarea
            className={`w-full rounded-md border px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none ${errors.description && touched.description ? "border-red-400" : "border-gray-200"}`}
            placeholder="Describe the reward, e.g. 'A curated basket of organic baby products including lotions, wipes, and more.'"
            value={description}
            maxLength={maxDescription}
            rows={3}
            onChange={e => setDescription(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, description: true }))}
          />
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-500">{description.length}/{maxDescription} characters</span>
            {errors.description && touched.description && <span className="text-red-500">{errors.description}</span>}
          </div>
        </div>
        {/* Retail Value */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Retail Value <span className="text-red-500">*</span></label>
          <input
            className={`w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${errors.retailValue && touched.retailValue ? "border-red-400" : "border-gray-300"}`}
            placeholder="$50.00"
            value={retailValue}
            onChange={e => setRetailValue(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, retailValue: true }))}
          />
          {errors.retailValue && touched.retailValue && <div className="text-xs text-red-500 mt-1">{errors.retailValue}</div>}
        </div>
        {/* Reward Type Dropdown */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Reward Type <span className="text-red-500">*</span></label>
          <select
            className={`w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${errors.rewardType && touched.rewardType ? "border-red-400" : "border-gray-300"}`}
            value={rewardType}
            onChange={e => setRewardType(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, rewardType: true }))}
          >
            <option value="">Select a reward type</option>
            {rewardTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.rewardType && touched.rewardType && <div className="text-xs text-red-500 mt-1">{errors.rewardType}</div>}
        </div>
        {/* Distribution Method */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Distribution Method <span className="text-red-500">*</span></label>
          <div className="flex space-x-4">
            {distributionMethods.map((method) => (
              <label key={method.value} className={`flex items-center px-4 py-2 rounded-lg border cursor-pointer transition-colors duration-150 ${distribution === method.value ? "bg-indigo-600 text-white border-indigo-600" : "bg-gray-100 text-gray-700 border-gray-300"}`}>
                <input
                  type="radio"
                  name="distribution"
                  value={method.value}
                  checked={distribution === method.value}
                  onChange={() => setDistribution(method.value)}
                  className="hidden"
                />
                {method.label}
              </label>
            ))}
          </div>
          {errors.distribution && touched.distribution && <div className="text-xs text-red-500 mt-1">{errors.distribution}</div>}
        </div>
        {/* Image Upload */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Featured Image</label>
          <div
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors duration-150 ${imageError ? "border-red-400 bg-red-50" : "border-gray-300 bg-gray-50 hover:border-indigo-400"}`}
            onClick={() => fileInputRef.current.click()}
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
          >
            <PhotoIcon className="w-10 h-10 text-indigo-400 mb-2" />
            <span className="text-gray-500 text-sm mb-1">Drag & drop or click to upload</span>
            <span className="text-xs text-gray-400">Max file size: 25MB</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {image && <span className="text-xs text-gray-700 mt-2">Selected: {image.name}</span>}
            {imageError && <span className="text-xs text-red-500 mt-2">{imageError}</span>}
          </div>
        </div>
        {/* Submit Button (disabled if not valid) */}
        <div className="flex justify-end mt-6">
          <button
            type="button"
            disabled={!isValid}
            className="bg-gradient-to-r from-blue-600 to-purple-500 text-white py-2 px-6 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Reward
          </button>
        </div>
      </div>
    </div>
  );
};

export default function GiftPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-2 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <RewardItemAccordion />
      </div>
    </div>
  );
} 