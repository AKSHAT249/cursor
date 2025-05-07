"use client"

import { useState, useRef } from "react"

export default function NewRewardForm({ reward, updateReward, deleteReward, errors, index, dragHandleProps }) {
  const MAX_CHARS = 300
  const [expanded, setExpanded] = useState(true)
  const [charCount, setCharCount] = useState(MAX_CHARS - (reward.description?.length || 0))
  const fileInputRef = useRef(null)

  const handleDescriptionChange = (e) => {
    const text = e.target.value
    if (text.length <= MAX_CHARS) {
      updateReward(reward.id, "description", text)
      setCharCount(MAX_CHARS - text.length)
    }
  }

  const handleFileClick = () => {
    fileInputRef.current.click()
  }

  const handleFileDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      updateReward(reward.id, "image", e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className="border rounded-lg mb-6">
      <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
        <div className="flex items-center">
          <div {...dragHandleProps} className="cursor-move mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          </div>
          <h4 className="font-medium">New Reward Item {index + 1}</h4>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => deleteReward(reward.id)}
            className="text-red-500 hover:text-red-700 mr-3"
            aria-label="Delete reward"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-gray-500"
            aria-label={expanded ? "Collapse section" : "Expand section"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform ${expanded ? "transform rotate-180" : ""}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {expanded && (
        <div className="p-4">
          <div className="mb-6">
            <p className="mb-2 font-medium">Do you have ASIN for the product?</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => updateReward(reward.id, "hasASIN", true)}
                className={`px-4 py-2 rounded-md border ${
                  reward.hasASIN === true
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => updateReward(reward.id, "hasASIN", false)}
                className={`px-4 py-2 rounded-md border ${
                  reward.hasASIN === false
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                No
              </button>
            </div>
            {errors[`${reward.id}-hasASIN`] && (
              <p className="text-red-500 text-sm mt-1">{errors[`${reward.id}-hasASIN`]}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2">
              <span className="font-medium">Reward Title</span>
              <span className="block text-sm text-gray-500">(e.g., "Premium Gift Box Set")</span>
            </label>
            <input
              type="text"
              value={reward.title || ""}
              onChange={(e) => updateReward(reward.id, "title", e.target.value)}
              placeholder="Enter reward title"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors[`${reward.id}-title`] && (
              <p className="text-red-500 text-sm mt-1">{errors[`${reward.id}-title`]}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2">
              <span className="font-medium">Description</span>
              <span className="block text-sm text-gray-500">
                (e.g., "A curated collection of premium items including...")
              </span>
            </label>
            <textarea
              value={reward.description || ""}
              onChange={handleDescriptionChange}
              placeholder="Enter a detailed description of the reward"
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <div className="text-right text-sm text-gray-500 mt-1">{charCount} characters left</div>
            {errors[`${reward.id}-description`] && (
              <p className="text-red-500 text-sm mt-1">{errors[`${reward.id}-description`]}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2">
              <span className="font-medium">Retail Value</span>
              <span className="block text-sm text-gray-500">
                Enter the retail value of this reward (e.g., "$99.99")
              </span>
            </label>
            <input
              type="text"
              value={reward.retailValue || ""}
              onChange={(e) => updateReward(reward.id, "retailValue", e.target.value)}
              placeholder="Enter retail value"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors[`${reward.id}-retailValue`] && (
              <p className="text-red-500 text-sm mt-1">{errors[`${reward.id}-retailValue`]}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2">
              <span className="font-medium">Reward Type</span>
              <span className="block text-sm text-gray-500">
                Select the type of reward you're offering
              </span>
            </label>
            <select
              value={reward.rewardType || ""}
              onChange={(e) => updateReward(reward.id, "rewardType", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select reward type</option>
              <option value="physical">Physical Product</option>
              <option value="digital">Digital Product</option>
              <option value="service">Service</option>
              <option value="experience">Experience</option>
            </select>
            {errors[`${reward.id}-rewardType`] && (
              <p className="text-red-500 text-sm mt-1">{errors[`${reward.id}-rewardType`]}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2">
              <span className="font-medium">Distribution Method</span>
              <span className="block text-sm text-gray-500">
                Choose how participants will receive their reward
              </span>
            </label>

            <div className="border rounded-md p-4 mb-2 bg-blue-50 border-blue-200 flex items-start">
              <input
                type="radio"
                id={`distribution-show-${reward.id}`}
                name={`distribution-${reward.id}`}
                checked={reward.distributionMethod === "show"}
                onChange={() => updateReward(reward.id, "distributionMethod", "show")}
                className="mt-1"
              />
              <div className="ml-2">
                <label htmlFor={`distribution-show-${reward.id}`} className="font-medium block">
                  Distributed at the Show
                </label>
                <p className="text-sm text-gray-600">
                  Reward will be provided to the host by the start of the show day.
                </p>
              </div>
            </div>

            <div className="border rounded-md p-4 mb-2 flex items-start">
              <input
                type="radio"
                id={`distribution-email-${reward.id}`}
                name={`distribution-${reward.id}`}
                checked={reward.distributionMethod === "email"}
                onChange={() => updateReward(reward.id, "distributionMethod", "email")}
                className="mt-1"
              />
              <div className="ml-2">
                <label htmlFor={`distribution-email-${reward.id}`} className="font-medium block">
                  Email Delivery
                </label>
                <p className="text-sm text-gray-600">Digital or email delivery will be provided.</p>
              </div>
            </div>

            <div className="border rounded-md p-4 flex items-start">
              <input
                type="radio"
                id={`distribution-shipping-${reward.id}`}
                name={`distribution-${reward.id}`}
                checked={reward.distributionMethod === "shipping"}
                onChange={() => updateReward(reward.id, "distributionMethod", "shipping")}
                className="mt-1"
              />
              <div className="ml-2">
                <label htmlFor={`distribution-shipping-${reward.id}`} className="font-medium block">
                  Shipping
                </label>
                <p className="text-sm text-gray-600">Tracking number will be provided upon shipping.</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2">
              <span className="font-medium">Upload a Featured Image</span>
              <span className="block text-sm text-gray-500">
                Add a high-quality image (Recommended: 800x800 pixels)
              </span>
            </label>

            <div
              className={`border border-dashed rounded-md p-4 text-center ${reward.imagePreview ? "border-blue-300 bg-blue-50" : ""}`}
              onClick={handleFileClick}
              onDrop={handleFileDrop}
              onDragOver={handleDragOver}
              style={{ cursor: "pointer" }}
            >
              {reward.imagePreview ? (
                <div className="flex flex-col items-center">
                  <div className="relative w-40 h-40 mb-2 overflow-hidden">
                    <img
                      src={reward.imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                  <p className="text-sm text-blue-600">Click to change image</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-center mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="mb-1">Click to Upload or drag and drop</p>
                  <p className="text-sm text-gray-500">Max. file size: 5 MB</p>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    updateReward(reward.id, "image", e.target.files[0])
                  }
                }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">*Drag or browse from device</p>
          </div>
        </div>
      )}
    </div>
  )
} 