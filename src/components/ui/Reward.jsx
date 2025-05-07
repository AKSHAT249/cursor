"use client";
import { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// --- WizardSteps Component (Stub) ---
function WizardSteps({ currentStep }) {
  const steps = ["Set Your Goals", "Define Your Giveaway", "Add Rewards", "Finalize and Visuals", "Advance Configuration"];
  return (
    <nav className="mb-8">
      <ol className="flex space-x-4">
        {steps.map((step, idx) => (
          <li key={step} className={`px-4 py-2 rounded-full text-sm font-semibold ${idx === currentStep ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"}`}>{step}</li>
        ))}
      </ol>
    </nav>
  );
}

// --- RewardForm Component (Stub) ---
function RewardForm({ reward, onChange, onDelete, disableDelete, errors }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">Reward</h3>
        <button onClick={onDelete} disabled={disableDelete} className="text-red-500 hover:text-red-700 disabled:opacity-50">Delete</button>
      </div>
      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="Title"
        value={reward.title}
        onChange={e => onChange({ ...reward, title: e.target.value })}
      />
      {errors.title && <div className="text-xs text-red-500 mb-1">{errors.title}</div>}
      <textarea
        className="w-full mb-2 p-2 border rounded"
        placeholder="Description"
        value={reward.description}
        onChange={e => onChange({ ...reward, description: e.target.value })}
      />
      {errors.description && <div className="text-xs text-red-500 mb-1">{errors.description}</div>}
      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="Retail Value"
        type="number"
        value={reward.retailValue}
        onChange={e => onChange({ ...reward, retailValue: e.target.value })}
      />
      {errors.retailValue && <div className="text-xs text-red-500 mb-1">{errors.retailValue}</div>}
      {/* Add more fields as needed */}
    </div>
  );
}

// --- RewardPreview Component (Stub) ---
function RewardPreview({ rewards }) {
  const totalValue = rewards.reduce((sum, r) => sum + Number(r.retailValue || 0), 0);
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h2 className="font-bold text-lg mb-4">Reward Preview</h2>
      <ul className="mb-4">
        {rewards.map((r, idx) => (
          <li key={idx} className="mb-2">
            <div className="font-semibold">{r.title || "[No Title]"}</div>
            <div className="text-sm text-gray-500">{r.description}</div>
            <div className="text-xs text-gray-400">Value: ${r.retailValue}</div>
          </li>
        ))}
      </ul>
      <div className="font-bold text-indigo-600">Total Value: ${totalValue}</div>
    </div>
  );
}

// --- FormSummaryModal Component (Stub) ---
function FormSummaryModal({ open, rewards, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full">
        <h2 className="font-bold text-xl mb-4">Summary</h2>
        <ul className="mb-4">
          {rewards.map((r, idx) => (
            <li key={idx} className="mb-2">
              <div className="font-semibold">{r.title}</div>
              <div className="text-sm text-gray-500">{r.description}</div>
              <div className="text-xs text-gray-400">Value: ${r.retailValue}</div>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Close</button>
      </div>
    </div>
  );
}

// --- Main Reward Wizard Page ---
export default function Reward() {
  const [rewards, setRewards] = useState([
    { title: "", hasASIN: false, description: "", retailValue: "", rewardType: "", distributionMethod: "", image: null, imagePreview: null }
  ]);
  const [errors, setErrors] = useState([{}]);
  const [showSummary, setShowSummary] = useState(false);

  // Drag and drop handlers
  function onDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(rewards);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setRewards(items);
  }

  // Add new reward
  function addReward() {
    setRewards([...rewards, { title: "", hasASIN: false, description: "", retailValue: "", rewardType: "", distributionMethod: "", image: null, imagePreview: null }]);
    setErrors([...errors, {}]);
  }

  // Delete reward
  function deleteReward(idx) {
    if (rewards.length === 1) return;
    setRewards(rewards.filter((_, i) => i !== idx));
    setErrors(errors.filter((_, i) => i !== idx));
  }

  // Update reward
  function updateReward(idx, newReward) {
    const newRewards = rewards.map((r, i) => (i === idx ? newReward : r));
    setRewards(newRewards);
  }

  // Validate all rewards
  function validate() {
    const newErrors = rewards.map(r => ({
      title: !r.title ? "Title is required" : "",
      description: !r.description ? "Description is required" : "",
      retailValue: !r.retailValue ? "Retail value is required" : ""
    }));
    setErrors(newErrors);
    return newErrors.every(e => !e.title && !e.description && !e.retailValue);
  }

  // Submit handler
  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) setShowSummary(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <WizardSteps currentStep={2} />
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Form (2/3) */}
            <div className="md:col-span-2">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Add Rewards</h2>
                <button type="button" onClick={addReward} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none">Add Reward</button>
              </div>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="rewards-droppable">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {rewards.map((reward, idx) => (
                        <Draggable key={idx} draggableId={"reward-" + idx} index={idx}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`mb-4 ${snapshot.isDragging ? "ring-2 ring-indigo-400" : ""}`}
                            >
                              <RewardForm
                                reward={reward}
                                onChange={r => updateReward(idx, r)}
                                onDelete={() => deleteReward(idx)}
                                disableDelete={rewards.length === 1}
                                errors={errors[idx] || {}}
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
              <div className="flex justify-end mt-6">
                <button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                  Submit & Continue
                </button>
              </div>
            </div>
            {/* Preview Panel (1/3) */}
            <div>
              <RewardPreview rewards={rewards} />
            </div>
          </div>
        </form>
        <FormSummaryModal open={showSummary} rewards={rewards} onClose={() => setShowSummary(false)} />
      </div>
    </div>
  );
} 