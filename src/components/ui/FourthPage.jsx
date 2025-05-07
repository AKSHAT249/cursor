"use client";
import { useState, useRef } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";

const rewardTypes = [
  "Gift Card",
  "Physical Product",
  "Coupon",
  "Other",
];

const distributionMethods = [
  { label: "Distributed at the Show", value: "show" },
  { label: "Email Delivery", value: "email" },
  { label: "Shipping", value: "shipping" },
];

function Toggle({ label, value, onChange, error, name }) {
  return (
    <fieldset className="mb-4">
      <legend className="block text-sm font-medium text-gray-700 mb-2">{label}</legend>
      <div className="flex gap-4" role="radiogroup" aria-label={label}>
        {[true, false].map((val) => (
          <button
            key={val ? "yes" : "no"}
            type="button"
            className={`px-6 py-2 rounded-full border transition-colors duration-150 font-semibold text-sm focus:outline-none shadow-sm ${value === val ? "bg-blue-500 text-white border-blue-500" : "bg-gray-100 text-gray-700 border-gray-300"}`}
            aria-pressed={value === val}
            onClick={() => onChange(val)}
            name={name}
          >
            {val ? "Yes" : "No"}
          </button>
        ))}
      </div>
      {error && <div className="text-xs text-red-500 mt-1" role="alert">{error}</div>}
    </fieldset>
  );
}

function TextField({ label, id, value, onChange, onBlur, error, placeholder, type = "text", ...props }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        id={id}
        type={type}
        className={`w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors ${error ? "border-red-400" : ""}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && <div id={`${id}-error`} className="text-xs text-red-500 mt-1" role="alert">{error}</div>}
    </div>
  );
}

function TextAreaField({ label, id, value, onChange, onBlur, error, placeholder, maxLength, ...props }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        id={id}
        className={`resize-none w-full rounded-xl p-4 border border-gray-300 min-h-[120px] shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors ${error ? "border-red-400" : ""}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      <div className="flex justify-end text-xs mt-1">
        <span className={value.length > maxLength ? "text-red-500" : "text-gray-500"}>{value.length}/{maxLength}</span>
      </div>
      {error && <div id={`${id}-error`} className="text-xs text-red-500 mt-1" role="alert">{error}</div>}
    </div>
  );
}

function RadioCardGroup({ label, value, onChange, options, error, name, helper }) {
  return (
    <fieldset className="mb-4">
      <legend className="block text-sm font-medium text-gray-700 mb-1">{label}</legend>
      {helper && <div className="text-xs text-gray-500 mb-2">{helper}</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`rounded-xl border p-4 w-full cursor-pointer flex items-center justify-center text-center font-medium transition-colors duration-150 ${value === option.value ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 bg-white text-gray-700"}`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="hidden"
            />
            {option.label}
          </label>
        ))}
      </div>
      {error && <div className="text-xs text-red-500 mt-1" role="alert">{error}</div>}
    </fieldset>
  );
}

function FileUploader({ label, helper, value, onChange, error, id }) {
  const fileInputRef = useRef();
  const maxFileSize = 25 * 1024 * 1024;
  function handleFile(e) {
    const file = e.target.files[0];
    if (file) onChange(file);
  }
  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onChange(file);
  }
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {helper && <div className="text-xs text-gray-500 mb-2">{helper}</div>}
      <div
        className={`border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col justify-center items-center gap-2 cursor-pointer ${value && value.size > maxFileSize ? "border-red-400 bg-red-50" : "hover:border-blue-400"}`}
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        <PhotoIcon className="w-10 h-10 text-blue-400 mb-2" aria-hidden="true" />
        <span className="text-gray-500 text-sm mb-1">Click to Upload or drag and drop (Max. File size: 25 MB)</span>
        <input
          ref={fileInputRef}
          id={id}
          type="file"
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={handleFile}
        />
        {value && <span className="text-xs text-gray-700 mt-2">Selected: {value.name}</span>}
        {error && <span id={`${id}-error`} className="text-xs text-red-500 mt-2" role="alert">{error}</span>}
      </div>
    </div>
  );
}

function validateReward(reward) {
  const maxDescription = 300;
  const maxFileSize = 25 * 1024 * 1024;
  return {
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
      reward.image && (reward.image.size > maxFileSize || !["image/jpeg", "image/png"].includes(reward.image.type))
        ? "File must be JPEG/PNG and <= 25MB"
        : "",
  };
}

function RewardItemForm({ idx, reward, onChange, onRemove, canRemove, open, setOpen, showErrors }) {
  const errors = validateReward(reward);
  const isValid = Object.values(errors).every((e) => !e);
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
          <Toggle
            label="Do you have ASIN for the product?"
            value={reward.hasASIN}
            onChange={val => onChange({ ...reward, hasASIN: val })}
            error={showErrors ? errors.hasASIN : ""}
            name={`asin-toggle-${idx}`}
          />
          <TextField
            label="Reward Title"
            id={`reward-title-${idx}`}
            value={reward.title}
            onChange={e => onChange({ ...reward, title: e.target.value })}
            error={showErrors ? errors.title : ""}
            placeholder="e.g., Gift Basket of Organic Baby Products"
          />
          <TextAreaField
            label="Description"
            id={`reward-desc-${idx}`}
            value={reward.description}
            onChange={e => onChange({ ...reward, description: e.target.value })}
            error={showErrors ? errors.description : ""}
            placeholder="e.g., Includes eco-friendly baby wipes, plush toy, and more!"
            maxLength={300}
          />
          <TextField
            label="Retail Value"
            id={`reward-value-${idx}`}
            value={reward.retailValue}
            onChange={e => onChange({ ...reward, retailValue: e.target.value })}
            error={showErrors ? errors.retailValue : ""}
            placeholder="$50.00"
            type="number"
          />
          <div className="mb-4">
            <label htmlFor={`reward-type-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">Reward Type</label>
            <select
              id={`reward-type-${idx}`}
              className={`appearance-none border rounded-xl px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500 transition-colors ${showErrors && errors.rewardType ? "border-red-400" : "border-gray-300"}`}
              value={reward.rewardType}
              onChange={e => onChange({ ...reward, rewardType: e.target.value })}
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
          <RadioCardGroup
            label="Distribution Method"
            value={reward.distribution}
            onChange={val => onChange({ ...reward, distribution: val })}
            options={distributionMethods}
            error={showErrors ? errors.distribution : ""}
            name={`distribution-${idx}`}
            helper="How will the winner receive this reward?"
          />
          <FileUploader
            label="Upload a Featured Image"
            helper="Add a high-quality image. Recommended size 800x800px. JPEG or PNG only."
            value={reward.image}
            onChange={file => onChange({ ...reward, image: file })}
            error={showErrors ? errors.image : ""}
            id={`reward-image-${idx}`}
          />
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

export default function FourthPage() {
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
    setOpen(rewards.length);
  }

  function removeReward(idx) {
    setRewards(rewards.filter((_, i) => i !== idx));
    setOpen(0);
  }

  function updateReward(idx, newReward) {
    setRewards(rewards.map((r, i) => (i === idx ? newReward : r)));
  }

  function allValid() {
    return rewards.every((reward) => {
      const errors = validateReward(reward);
      return Object.values(errors).every((e) => !e);
    });
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-gray-900">Reward Items</h1>
        {rewards.map((reward, idx) => (
          <RewardItemForm
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
            className="mt-6 border border-blue-500 text-blue-500 rounded-full px-5 py-2 hover:bg-blue-50 transition-all font-semibold"
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
  );
} 