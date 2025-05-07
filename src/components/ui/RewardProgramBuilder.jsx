"use client";
import { useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { PhotoIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

// Constants
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
    description: "Winner receives the reward in person at your booth."
  },
  {
    label: "Email Delivery",
    value: "email",
    description: "Winner receives the reward via email."
  },
  {
    label: "Shipping",
    value: "shipping",
    description: "Winner receives the reward by mail."
  },
];

const MAX_DESCRIPTION = 300;
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

// Components
function ToggleSwitch({ value, onChange, error, name }) {
  return (
    <fieldset className="mb-4">
      <legend className="block text-sm font-medium text-gray-700 mb-2">Do you have ASIN for the product?</legend>
      <div className="flex gap-4" role="radiogroup" aria-label="ASIN Toggle">
        {[true, false].map((val) => (
          <button
            key={val ? "yes" : "no"}
            type="button"
            className={`px-6 py-2 rounded-full border transition-colors duration-150 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              value === val ? "bg-blue-500 text-white border-blue-500" : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
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

function InputField({ label, id, error, ...props }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        id={id}
        className={`w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          error ? "border-red-400" : ""
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && <div id={`${id}-error`} className="text-xs text-red-500 mt-1" role="alert">{error}</div>}
    </div>
  );
}

function TextArea({ label, id, value, onChange, onBlur, error, maxLength, ...props }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        id={id}
        className={`resize-none w-full rounded-xl p-4 border border-gray-300 min-h-[120px] shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          error ? "border-red-400" : ""
        }`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      <div className="flex justify-end text-xs mt-1">
        <span className={value.length > maxLength ? "text-red-500" : "text-gray-500"}>
          {value.length}/{maxLength}
        </span>
      </div>
      {error && <div id={`${id}-error`} className="text-xs text-red-500 mt-1" role="alert">{error}</div>}
    </div>
  );
}

function RewardCardOption({ label, description, selected, onClick, ...props }) {
  return (
    <button
      type="button"
      className={`rounded-xl border p-4 w-full cursor-pointer flex flex-col items-center justify-center text-center font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        selected ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 bg-white text-gray-700"
      }`}
      onClick={onClick}
      aria-pressed={selected}
      {...props}
    >
      <span className="font-semibold mb-1">{label}</span>
      <span className="text-xs text-gray-500">{description}</span>
    </button>
  );
}

function ImageUpload({ value, onChange, error, id }) {
  const fileInputRef = useRef();
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) onChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) onChange(file);
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">Upload a Featured Image</label>
      <div
        className={`border-2 border-dashed rounded-xl p-6 flex flex-col justify-center items-center gap-2 cursor-pointer transition-colors duration-150 ${
          dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-50 hover:border-blue-400"
        } ${error ? "border-red-400 bg-red-50" : ""}`}
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
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
      {value && (
        <div className="mt-2 flex justify-center">
          <img
            src={URL.createObjectURL(value)}
            alt="Preview"
            className="max-h-32 rounded-lg shadow"
          />
        </div>
      )}
    </div>
  );
}

function RewardItemForm({ idx, reward, onChange, onRemove, canRemove, isOpen, setOpen }) {
  const errors = {
    hasASIN: reward.hasASIN === null ? "Select Yes or No" : "",
    title: !reward.title ? "Title is required" : "",
    description: !reward.description
      ? "Description is required"
      : reward.description.length > MAX_DESCRIPTION
      ? `Max ${MAX_DESCRIPTION} characters`
      : "",
    retailValue:
      !reward.retailValue || isNaN(Number(reward.retailValue)) || Number(reward.retailValue) <= 0
        ? "Enter a positive number"
        : "",
    rewardType: !reward.rewardType ? "Reward type is required" : "",
    distribution: !reward.distribution ? "Distribution method is required" : "",
    image:
      reward.image && reward.image.size > MAX_FILE_SIZE
        ? "File size exceeds 25MB"
        : "",
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-300 mb-6"
      aria-labelledby={`reward-item-${idx}-heading`}
    >
      <button
        type="button"
        className="w-full flex justify-between items-center px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl"
        onClick={() => setOpen(isOpen ? null : idx)}
        aria-expanded={isOpen}
        aria-controls={`reward-item-${idx}-panel`}
        id={`reward-item-${idx}-heading`}
      >
        <span className="text-lg font-semibold text-gray-900">
          {reward.title || `Reward Item ${idx + 1}`}
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            id={`reward-item-${idx}-panel`}
            aria-labelledby={`reward-item-${idx}-heading`}
            role="region"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden px-6 pb-6"
          >
            <form className="space-y-6" aria-label={`Reward Item ${idx + 1} Form`}>
              <ToggleSwitch
                value={reward.hasASIN}
                onChange={(val) => onChange({ ...reward, hasASIN: val })}
                error={errors.hasASIN}
                name={`asin-toggle-${idx}`}
              />
              <InputField
                label="Reward Title"
                id={`reward-title-${idx}`}
                value={reward.title}
                onChange={(e) => onChange({ ...reward, title: e.target.value })}
                error={errors.title}
                placeholder="e.g., Gift Basket of Organic Baby Products"
              />
              <TextArea
                label="Description"
                id={`reward-desc-${idx}`}
                value={reward.description}
                onChange={(e) => onChange({ ...reward, description: e.target.value })}
                error={errors.description}
                placeholder="e.g., Includes eco-friendly baby wipes, plush toy, and more!"
                maxLength={MAX_DESCRIPTION}
              />
              <InputField
                label="Retail Value"
                id={`reward-value-${idx}`}
                type="number"
                value={reward.retailValue}
                onChange={(e) => onChange({ ...reward, retailValue: e.target.value })}
                error={errors.retailValue}
                placeholder="$50.00"
              />
              <div className="mb-4">
                <label htmlFor={`reward-type-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Reward Type
                </label>
                <select
                  id={`reward-type-${idx}`}
                  className={`appearance-none border rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.rewardType ? "border-red-400" : "border-gray-300"
                  }`}
                  value={reward.rewardType}
                  onChange={(e) => onChange({ ...reward, rewardType: e.target.value })}
                  aria-invalid={!!errors.rewardType}
                  aria-describedby={errors.rewardType ? `reward-type-error-${idx}` : undefined}
                >
                  <option value="">Select a reward type</option>
                  {rewardTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.rewardType && (
                  <div id={`reward-type-error-${idx}`} className="text-xs text-red-500 mt-1" role="alert">
                    {errors.rewardType}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Distribution Method</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  {distributionMethods.map((method) => (
                    <RewardCardOption
                      key={method.value}
                      label={method.label}
                      description={method.description}
                      selected={reward.distribution === method.value}
                      onClick={() => onChange({ ...reward, distribution: method.value })}
                      role="button"
                      tabIndex={0}
                      aria-pressed={reward.distribution === method.value}
                    />
                  ))}
                </div>
                {errors.distribution && (
                  <div className="text-xs text-red-500 mt-1" role="alert">{errors.distribution}</div>
                )}
              </div>
              <ImageUpload
                value={reward.image}
                onChange={(file) => onChange({ ...reward, image: file })}
                error={errors.image}
                id={`reward-image-${idx}`}
              />
              {canRemove && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={onRemove}
                    className="text-red-500 border border-red-200 rounded-full px-5 py-2 mt-2 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    aria-label="Remove this reward item"
                  >
                    <TrashIcon className="w-5 h-5 inline-block mr-1" />
                    Remove
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function RewardPreview({ rewards }) {
  const totalValue = rewards.reduce((sum, r) => sum + Number(r.retailValue || 0), 0);
  
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h2 className="font-bold text-lg mb-4">Reward Preview</h2>
      <ul className="mb-4 space-y-4">
        {rewards.map((r, idx) => (
          <li key={idx} className="flex items-start space-x-4">
            {r.image && (
              <img
                src={URL.createObjectURL(r.image)}
                alt={r.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
            )}
            <div className="flex-1">
              <div className="font-semibold">{r.title || "[No Title]"}</div>
              <div className="text-sm text-gray-500">{r.description}</div>
              <div className="text-xs text-gray-400">Value: ${r.retailValue}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="font-bold text-blue-600">Total Value: ${totalValue.toFixed(2)}</div>
    </div>
  );
}

export default function RewardProgramBuilder() {
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

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(rewards);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    
    setRewards(items);
    setOpen(result.destination.index);
  };

  const addReward = () => {
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
  };

  const removeReward = (idx) => {
    if (rewards.length === 1) return;
    setRewards(rewards.filter((_, i) => i !== idx));
    setOpen(0);
  };

  const updateReward = (idx, newReward) => {
    setRewards(rewards.map((r, i) => (i === idx ? newReward : r)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate and submit form
    console.log("Form submitted:", rewards);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reward Program Builder</h1>
          <p className="mt-2 text-gray-600">Create and manage your rewards with ease</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form (2/3) */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="rewards">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {rewards.map((reward, idx) => (
                        <Draggable key={idx} draggableId={`reward-${idx}`} index={idx}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`mb-4 ${snapshot.isDragging ? "ring-2 ring-blue-400" : ""}`}
                            >
                              <RewardItemForm
                                idx={idx}
                                reward={reward}
                                onChange={(r) => updateReward(idx, r)}
                                onRemove={() => removeReward(idx)}
                                canRemove={rewards.length > 1}
                                isOpen={open === idx}
                                setOpen={setOpen}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  onClick={addReward}
                  className="inline-flex items-center px-6 py-3 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  aria-label="Add another reward item"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Add More Rewards
                </button>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-500 text-white py-3 px-8 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  aria-label="Submit all reward items"
                >
                  Save & Continue
                </button>
              </div>
            </form>
          </div>

          {/* Preview Panel (1/3) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <RewardPreview rewards={rewards} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 