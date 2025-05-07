"use client";

import { useState } from "react";
import { cn } from "../../lib/utils";
import Logo from "../../assets/Logo.png";
import AddRewards from "./AddRewards";
import StepFinalizeVisuals from "./StepFinalizeVisuals";
import RewardFormOne from "./RewardFormOne";
import RewardForm from "./RewardForm";
import StepReward from "./StepReward";
import StepPageOne from "./StepPageOne";

const steps = [
  "Set Your Goals",
  "Define Your Giveaway",
  "Add Rewards",
  "Finalize and Visuals",
  "Advance Configuration",
];

// Step content components
function StepSetGoals({ selectedGoal, setSelectedGoal, cardOpen, setCardOpen }) {

  console.log(selectedGoal, "selectedGoal in function");

  return (
    <section className="w-full max-w-xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">Set your Goals</h2>
      {/* Collapsible Card */}
      <div className={`transition-all duration-300 ${cardOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="border-2 border-blue-400 rounded-xl bg-white shadow-sm mb-6">
          <button
            className="w-full flex justify-between items-center px-6 py-4 focus:outline-none"
            onClick={() => setCardOpen((open) => !open)}
            aria-expanded={cardOpen}
            aria-controls="goal-card-content"
          >
            <span className="text-lg font-semibold text-blue-700">Let's create a Giveaway that meets your goals!</span>
            <svg className={`w-5 h-5 text-blue-400 transform transition-transform ${cardOpen ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <div id="goal-card-content" className="px-6 pb-6 pt-0">
            <p className="text-gray-600 mb-4">
              Giveaways are powerful tools to connect with participants. Before we get started, decide what you want to achieve with this giveaway:
            </p>
            {/* Goal Options */}
            <div className="flex flex-col gap-4">
              <label className={`flex flex-col sm:flex-row items-start sm:items-center border-2 rounded-lg p-4 cursor-pointer transition-colors duration-200
                ${selectedGoal === "lead-generation" ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}
              `}>
                <input
                  type="radio"
                  name="goal"
                  value="lead-generation"
                  checked={selectedGoal === "lead-generation"}
                  onChange={() => setSelectedGoal("lead-generation")}
                  className="form-radio text-blue-600 h-5 w-5 mr-3 mt-1 sm:mt-0"
                />
                <div>
                  <span className="block text-base font-semibold text-gray-900">Lead Generation</span>
                  <span className="block text-sm text-gray-600">Collect valuable participant information to build your sales funnel and follow up effectively after the show.</span>
                </div>
              </label>
              <label className={`flex flex-col sm:flex-row items-start sm:items-center border-2 rounded-lg p-4 cursor-pointer transition-colors duration-200
                ${selectedGoal === "brand-awareness" ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}
              `}>
                <input
                  type="radio"
                  name="goal"
                  value="brand-awareness"
                  checked={selectedGoal === "brand-awareness"}
                  onChange={() => setSelectedGoal("brand-awareness")}
                  className="form-radio text-blue-600 h-5 w-5 mr-3 mt-1 sm:mt-0"
                />
                <div>
                  <span className="block text-base font-semibold text-gray-900">Brand Awareness</span>
                  <span className="block text-sm text-gray-600">Drive excitement and attention to your booth without requiring participant data collection.</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* Info Note */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-blue-800">
          Note: Choose the option that aligns with your objectives for maximum impact. Don't worry—you'll be able to adjust this setting later if needed!
        </p>
      </div>
     
    </section>
  );
}

// ... existing code ...
function StepDefineGiveaway({ activeStep, setActiveStep }) {
    const [openAccordion, setOpenAccordion] = useState(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const maxTitleLength = 300;
    const titleCharsLeft = maxTitleLength - title.length;
  
    const handleAccordion = (idx) => {
      setOpenAccordion(idx === openAccordion ? null : idx);
    };
  
    return (
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Left Column */}
        <div className="col-span-1">
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            {/* Accordion 1: Giveaway Title */}
            <div className="border-b">
              <button
                className="w-full flex justify-between items-center py-3 focus:outline-none"
                onClick={() => handleAccordion(0)}
                aria-expanded={openAccordion === 0}
                aria-controls="giveaway-title-panel"
              >
                <div>
                  <span className="text-lg font-semibold text-gray-900">Giveaway Title</span>
                  <span className="block text-xs text-gray-500">What should we call the Giveaway?</span>
                </div>
                <svg className={`w-5 h-5 ml-2 text-indigo-600 transform transition-transform duration-300 ${openAccordion === 0 ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div
                id="giveaway-title-panel"
                className={`overflow-hidden transition-all duration-300 ${openAccordion === 0 ? "max-h-40 opacity-100 py-2" : "max-h-0 opacity-0 py-0"}`}
              >
                <input
                  type="text"
                  maxLength={maxTitleLength}
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Type the title here |"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
                <div className="text-xs text-gray-500 mt-1 text-right">{titleCharsLeft} characters left</div>
              </div>
            </div>
  
            {/* Accordion 2: Short Description */}
            <div className="border-b">
              <button
                className="w-full flex justify-between items-center py-3 focus:outline-none"
                onClick={() => handleAccordion(1)}
                aria-expanded={openAccordion === 1}
                aria-controls="giveaway-desc-panel"
              >
                <div>
                  <span className="text-lg font-semibold text-gray-900">Short Description</span>
                  <span className="block text-xs text-gray-500">Provide a quick summary of what participants can win and how they can enter.</span>
                </div>
                <svg className={`w-5 h-5 ml-2 text-indigo-600 transform transition-transform duration-300 ${openAccordion === 1 ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div
                id="giveaway-desc-panel"
                className={`overflow-hidden transition-all duration-300 ${openAccordion === 1 ? "max-h-60 opacity-100 py-2" : "max-h-0 opacity-0 py-0"}`}
              >
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Type a short description of your giveaway, e.g. 'Win a $100 gift card by entering your email and spinning the prize wheel!'"
                  rows={3}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                />
              </div>
            </div>
  
            {/* Accordion 3: Giveaway Hours */}
            <div>
              <button
                className="w-full flex justify-between items-center py-3 focus:outline-none"
                onClick={() => handleAccordion(2)}
                aria-expanded={openAccordion === 2}
                aria-controls="giveaway-hours-panel"
              >
                <span className="text-lg font-semibold text-gray-900">Giveaway Hours</span>
                <svg className={`w-5 h-5 ml-2 text-indigo-600 transform transition-transform duration-300 ${openAccordion === 2 ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div
                id="giveaway-hours-panel"
                className={`overflow-hidden transition-all duration-300 ${openAccordion === 2 ? "max-h-32 opacity-100 py-2" : "max-h-0 opacity-0 py-0"}`}
              >
                <div className="text-gray-400 text-sm">[Giveaway hours content coming soon]</div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Right Column: Preview */}
        <div className="col-span-1">
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col space-y-4 border border-gray-100">
            <div className="text-lg font-semibold text-gray-900 mb-2">{title || <span className="text-gray-400">[Title goes here]</span>}</div>
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-50 text-indigo-600 rounded-lg px-3 py-1 text-xs font-semibold">Day 1</div>
              <div className="bg-gray-100 text-gray-500 rounded-lg px-3 py-1 text-xs">12:00AM - 05:00 PM</div>
            </div>
            <div className="mt-2 text-gray-600 min-h-[60px]">{description || <span className="text-gray-400">[Short description will appear here]</span>}</div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={() => setActiveStep(activeStep + 1)}
              className="bg-gradient-to-r from-blue-600 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Submit & Continue
            </button>
          </div>
        </div>
      </div>
    );
  }
  // ... existing code ...

// function StepAddRewards() {
//   return (
//     <section className="w-full max-w-5xl mx-auto flex mt-10">
//       {/* Left section - 60% width */}
//       <div className="w-[60%] pr-8">
//         <div className="bg-white rounded-2xl shadow-md p-6">
//           <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Rewards</h1>
//           {/* <AddRewards /> */}
//         </div>
//       </div>

//       {/* Right section - 40% width */}
//       <div className="w-[40%]">
//         <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
//           <div className="text-gray-500">
//             Reward preview will appear here
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function StepFinalizeVisuals() {
//   return (
//     <section className="w-full max-w-xl mx-auto text-center mt-10">
//       <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Finalize and Visuals</h2>
//       <p className="text-gray-600">[Placeholder for Finalize and Visuals step content]</p>
//     </section>
//   );
// }

function StepAdvanceConfig() {
  return (
    <section className="w-full max-w-xl mx-auto text-center mt-10">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Advance Configuration</h2>
      <p className="text-gray-600">[Placeholder for Advance Configuration step content]</p>
    </section>
  );
}

export const GiveawayWizard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState("ggggs");
  const [cardOpen, setCardOpen] = useState(true);
  const isValid = selectedGoal !== "";
  console.log(selectedGoal, "selectedGoal");
  

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full flex flex-col items-center py-6 px-4 sm:px-8 bg-white">
        <div className="flex items-center w-full max-w-5xl">
          <img src="/mnt/data/Logo.png" alt="ShowTrail Logo" className="h-10 w-auto mr-4" />
          <h1 className="flex-1 text-center text-2xl sm:text-3xl font-bold text-gray-900">Giveaway Setup Wizard</h1>
        </div>
      </header>

      {/* Stepper */}
      <nav className="w-full flex justify-center mt-6 mb-10 px-2" aria-label="Progress">
        <ol className="flex items-center max-w-4xl">
          {steps.map((step, idx) => {
            const isActive = idx === activeStep;
            const isCompleted = idx < activeStep;
            return (
              <li key={step} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`inline-flex items-center px-3 py-2 rounded-full transition-colors duration-200 focus:outline-none
                    ${isActive ? "border-2 border-[#9458E2] bg-white shadow-sm" : "border border-[#ECECEB] bg-white"}
                  `}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={step}
                >
                  <span
                    className={`w-7 h-7 flex items-center justify-center rounded-full mr-2
                      ${isActive ? "bg-[#9458E2] text-white border-2 border-[#9458E2] font-bold" :
                        isCompleted ? "bg-[#9458E2] text-white border-2 border-[#9458E2] font-bold" :
                        "border border-[#ECECEB] text-gray-400 bg-white font-bold"}
                    `}
                  >
                    {idx + 1}
                  </span>
                  <span
                    className={`text-sm whitespace-nowrap
                      ${isActive ? "font-semibold text-black" : "font-medium text-gray-400"}
                    `}
                  >
                    {step}
                  </span>
                </button>
                {idx !== steps.length - 1 && (
                  <span className="h-1 w-6 bg-[#ECECEB] mx-2 rounded" aria-hidden="true"></span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
          
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-2">
        {activeStep === 0 && (
          <StepPageOne
            selectedGoal={selectedGoal}
            setSelectedGoal={setSelectedGoal}
            cardOpen={cardOpen}
            setCardOpen={setCardOpen}
            activeStep={activeStep} 
            setActiveStep={setActiveStep}
          />
        )}
        {activeStep === 1 && <StepDefineGiveaway activeStep={activeStep} setActiveStep={setActiveStep} />}
        {activeStep === 2 && <StepReward activeStep={activeStep} setActiveStep={setActiveStep} />}
        {activeStep === 3 && <StepFinalizeVisuals activeStep={activeStep} setActiveStep={setActiveStep} />}
        {activeStep === 4 && <StepAdvanceConfig activeStep={activeStep} setActiveStep={setActiveStep} />}
      </main>

      {/* Submit Button (only show on first step for now) */}
      {/* {activeStep === 0 && (
        <div className="w-full flex justify-center pb-8">
          <button
            type="button"
            className="w-full max-w-xs bg-gradient-to-r from-blue-600 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedGoal === ""}
          >
            Submit & Continue
          </button>
        </div>
      )} */}
    </div>
  );
}; 