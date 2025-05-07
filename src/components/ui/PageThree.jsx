"use client";
import { useState, useRef } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
// If using Next.js, uncomment the next line:
// import Head from "next/head";

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

function RewardItemAccordion({
  idx,
  reward,
  onChange,
  onRemove,
  canRemove,
  open,
  setOpen,
  showErrors,
}) {
  const fileInputRef = useRef();
  const maxDescription = 300;
  const maxFileSize = 25 * 1024 * 1024; // 25MB

  // Validation
  const errors = {
    hasASIN: reward.hasASIN === null ? "Select Yes or No" : "",
    title: !reward.title ? "Title is required" : "",
    description: !reward.description
      ? "Description is required"
      : reward.description.length > maxDescription
      ? `Max ${maxDescription} characters`
      : "",
    retailValue:
      !reward.retailValue || isNaN(Number(reward.retailValue)) || Number(reward.retailValue) <= 0
        ? "Enter a positive number"
        : "",
    rewardType: !reward.rewardType ? "Reward type is required" : "",
    distribution: !reward.distribution ? "Distribution method is required" : "",
    image:
      reward.image && reward.image.size > maxFileSize
        ? "File size exceeds 25MB"
        : "",
  };
  const isValid = Object.values(errors).every((e) => !e);

  // Image upload handler
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      onChange({ ...reward, image: file });
    }
  }

  // Drag and drop
  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      onChange({ ...reward, image: file });
    }
  }

  return (
    <section
      className="bg-white rounded-xl shadow-sm border border-gray-300 mb-6"
      aria-labelledby={`reward-item-${idx}-heading`}
    >
      <button
        type="button"
        className="w-full flex justify-between items-center px-6 py-4 focus:outline-none"
        onClick={() => setOpen(idx === open ? null : idx)}
        aria-expanded={open === idx}
        aria-controls={`reward-item-${idx}-panel`}
        id={`reward-item-${idx}-heading`}
      >
        <span className="text-lg font-semibold text-gray-900">Reward Item {idx + 1}</span>
        <svg className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${open === idx ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      <div
        id={`reward-item-${idx}-panel`}
        className={`overflow-hidden transition-all duration-300 ${open === idx ? "max-h-[2000px] opacity-100 py-6 px-6" : "max-h-0 opacity-0 p-0"}`}
        aria-labelledby={`reward-item-${idx}-heading`}
        role="region"
      >
        <form className="space-y-6" aria-label={`Reward Item ${idx + 1} Form`}>
          {/* ASIN Toggle */}
          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-2">Do you have ASIN for the product?</legend>
            <div className="flex gap-4" role="radiogroup" aria-label="ASIN Toggle">
              {[true, false].map((val) => (
                <button
                  key={val ? "yes" : "no"}
                  type="button"
                  className={`px-6 py-2 rounded-full border transition-colors duration-150 font-semibold text-sm focus:outline-none ${reward.hasASIN === val ? "bg-blue-500 text-white border-blue-500" : "bg-gray-100 text-gray-700 border-gray-300"}`}
                  aria-pressed={reward.hasASIN === val}
                  onClick={() => onChange({ ...reward, hasASIN: val })}
                >
                  {val ? "Yes" : "No"}
                </button>
              ))}
            </div>
            {showErrors && errors.hasASIN && <div className="text-xs text-red-500 mt-1" role="alert">{errors.hasASIN}</div>}
          </fieldset>
          {/* Reward Title */}
          <div>
            <label htmlFor={`reward-title-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">Reward Title</label>
            <input
              id={`reward-title-${idx}`}
              className={`w-full border border-gray-300 rounded-xl px-4 py-2 ${showErrors && errors.title ? "border-red-400" : ""}`}
              placeholder="e.g., Gift Basket of Organic Baby Products"
              value={reward.title}
              onChange={e => onChange({ ...reward, title: e.target.value })}
              required
              aria-invalid={!!(showErrors && errors.title)}
              aria-describedby={showErrors && errors.title ? `reward-title-error-${idx}` : undefined}
            />
            {showErrors && errors.title && <div id={`reward-title-error-${idx}`} className="text-xs text-red-500 mt-1" role="alert">{errors.title}</div>}
          </div>
          {/* Description */}
          <div>
            <label htmlFor={`reward-desc-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id={`reward-desc-${idx}`}
              className={`resize-none border rounded-xl p-3 w-full min-h-[100px] ${showErrors && errors.description ? "border-red-400" : ""}`}
              placeholder="Describe the reward, e.g. 'A curated basket of organic baby products including lotions, wipes, and more.'"
              value={reward.description}
              maxLength={maxDescription}
              onChange={e => onChange({ ...reward, description: e.target.value })}
              required
              aria-invalid={!!(showErrors && errors.description)}
              aria-describedby={showErrors && errors.description ? `reward-desc-error-${idx}` : undefined}
            />
            <div className="flex justify-end text-xs mt-1">
              <span className={reward.description.length > maxDescription ? "text-red-500" : "text-gray-500"}>{reward.description.length}/{maxDescription}</span>
            </div>
            {showErrors && errors.description && <div id={`reward-desc-error-${idx}`} className="text-xs text-red-500 mt-1" role="alert">{errors.description}</div>}
          </div>
          {/* Retail Value */}
          <div>
            <label htmlFor={`reward-value-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">Retail Value</label>
            <input
              id={`reward-value-${idx}`}
              className={`border rounded-xl px-4 py-2 w-full text-right ${showErrors && errors.retailValue ? "border-red-400" : ""}`}
              placeholder="e.g., $50.00"
              value={reward.retailValue}
              onChange={e => onChange({ ...reward, retailValue: e.target.value })}
              required
              aria-invalid={!!(showErrors && errors.retailValue)}
              aria-describedby={showErrors && errors.retailValue ? `reward-value-error-${idx}` : undefined}
            />
            {showErrors && errors.retailValue && <div id={`reward-value-error-${idx}`} className="text-xs text-red-500 mt-1" role="alert">{errors.retailValue}</div>}
          </div>
          {/* Reward Type Dropdown */}
          <div>
            <label htmlFor={`reward-type-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">Reward Type</label>
            <select
              id={`reward-type-${idx}`}
              className={`border rounded-xl px-4 py-2 w-full ${showErrors && errors.rewardType ? "border-red-400" : ""}`}
              value={reward.rewardType}
              onChange={e => onChange({ ...reward, rewardType: e.target.value })}
              required
              aria-invalid={!!(showErrors && errors.rewardType)}
              aria-describedby={showErrors && errors.rewardType ? `reward-type-error-${idx}` : undefined}
            >
              <option value="">Select a reward type</option>
              {rewardTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {showErrors && errors.rewardType && <div id={`reward-type-error-${idx}`} className="text-xs text-red-500 mt-1" role="alert">{errors.rewardType}</div>}
          </div>
          {/* Distribution Method */}
          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-1">Distribution Method</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              {distributionMethods.map((method) => (
                <label
                  key={method.value}
                  className={`rounded-xl border p-4 w-full cursor-pointer flex items-center justify-center text-center font-medium transition-colors duration-150 ${reward.distribution === method.value ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 bg-white text-gray-700"}`}
                >
                  <input
                    type="radio"
                    name={`distribution-${idx}`}
                    value={method.value}
                    checked={reward.distribution === method.value}
                    onChange={() => onChange({ ...reward, distribution: method.value })}
                    className="hidden"
                    required
                  />
                  {method.label}
                </label>
              ))}
            </div>
            {showErrors && errors.distribution && <div className="text-xs text-red-500 mt-1" role="alert">{errors.distribution}</div>}
          </fieldset>
          {/* Image Upload */}
          <div>
            <label htmlFor={`reward-image-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">Upload a Featured Image</label>
            <div
              className={`border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col justify-center items-center cursor-pointer ${reward.image && reward.image.size > maxFileSize ? "border-red-400 bg-red-50" : "hover:border-blue-400"}`}
              onClick={() => fileInputRef.current.click()}
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
              aria-describedby={showErrors && errors.image ? `reward-image-error-${idx}` : undefined}
            >
              <PhotoIcon className="w-10 h-10 text-blue-400 mb-2" aria-hidden="true" />
              <span className="text-gray-500 text-sm mb-1">Drag & drop or click to upload</span>
              <span className="text-xs text-gray-400">Max file size: 25MB</span>
              <input
                ref={fileInputRef}
                id={`reward-image-${idx}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              {reward.image && <span className="text-xs text-gray-700 mt-2">Selected: {reward.image.name}</span>}
              {showErrors && errors.image && <span id={`reward-image-error-${idx}`} className="text-xs text-red-500 mt-2" role="alert">{errors.image}</span>}
            </div>
          </div>
          {/* Remove Button (if more than one) */}
          {canRemove && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onRemove}
                className="text-red-500 border border-red-200 rounded-full px-5 py-2 mt-2 hover:bg-red-50"
                aria-label="Remove this reward item"
              >
                Remove
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default function PageThree() {
  const [rewards, setRewards] = useState([
    {
      hasASIN: null,
      title: "",
      description: "",
      retailValue: "",
      rewardType: "",
      distribution: "show",
      image: null,
    },
  ]);
  const [open, setOpen] = useState(0);
  const [showErrors, setShowErrors] = useState(false);

  // Add more reward items
  function addMore() {
    setRewards([
      ...rewards,
      {
        hasASIN: null,
        title: "",
        description: "",
        retailValue: "",
        rewardType: "",
        distribution: "show",
        image: null,
      },
    ]);
    setOpen(rewards.length); // open the new one
  }

  // Remove a reward item
  function removeReward(idx) {
    setRewards(rewards.filter((_, i) => i !== idx));
    setOpen(0);
  }

  // Update a reward item
  function updateReward(idx, newReward) {
    setRewards(rewards.map((r, i) => (i === idx ? newReward : r)));
  }

  // Validate all rewards
  function allValid() {
    return rewards.every((reward) => {
      return (
        reward.hasASIN !== null &&
        reward.title &&
        reward.description &&
        reward.description.length <= 300 &&
        reward.retailValue &&
        !isNaN(Number(reward.retailValue)) &&
        Number(reward.retailValue) > 0 &&
        reward.rewardType &&
        reward.distribution &&
        (!reward.image || reward.image.size <= 25 * 1024 * 1024)
      );
    });
  }

  return (
    <>
      {/* If using Next.js, uncomment below: */}
      {/* <Head>
        <title>Reward Item Form | Giveaway Setup Wizard</title>
        <meta name="description" content="Add and manage reward items for your giveaway. Fully accessible, SEO-optimized, and responsive form with validation." />
      </Head> */}
      <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-8 text-gray-900">Reward Items</h1>
          {rewards.map((reward, idx) => (
            <RewardItemAccordion
              key={idx}
              idx={idx}
              reward={reward}
              onChange={(r) => updateReward(idx, r)}
              onRemove={() => removeReward(idx)}
              canRemove={rewards.length > 1}
              open={open}
              setOpen={setOpen}
              showErrors={showErrors}
            />
          ))}
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={addMore}
              className="bg-white border border-blue-500 text-blue-500 rounded-full px-5 py-2 font-semibold hover:bg-blue-50 transition-colors"
              aria-label="Add another reward item"
            >
              Add More +
            </button>
          </div>
          <div className="flex justify-end mt-8">
            <button
              type="button"
              disabled={!allValid()}
              onClick={() => setShowErrors(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-500 text-white py-2 px-8 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Submit all reward items"
            >
              Submit
            </button>
          </div>
        </div>
      </main>
    </>
  );
} 