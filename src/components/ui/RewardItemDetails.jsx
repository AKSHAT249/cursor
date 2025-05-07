"use client";
import { useState } from "react";
import RewardForm from "./RewardForm";
import RewardFormOne from "./RewardFormOne";

export default function RewardItemDetails() {
  const [open, setOpen] = useState(true);
  return (
    <div className="max-w-4xl mx-auto mt-8 px-2">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
        Show off the value of your Giveaway to entice participants!
      </h1>
      <div className="rounded-2xl border-2 border-blue-300 bg-blue-50/60 shadow-sm overflow-hidden">
        <button
          type="button"
          className="w-full flex justify-between items-center px-6 py-5 focus:outline-none"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          <div>
            <span className="block text-xl font-bold text-blue-700">Reward Item Details</span>
            <span className="block text-base text-blue-500 mt-1">For each item in your Giveaway, provide the following</span>
          </div>
          <svg
            className={`w-6 h-6 text-blue-700 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {/* Accordion content can go here if needed */}
        {open && (
          <div className="px-6 pb-6">
            {/* Content goes here */}
            {/* <RewardForm /> */}
            <RewardFormOne />
          </div>
        )}
      </div>
    </div>
  );
} 