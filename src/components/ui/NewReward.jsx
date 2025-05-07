"use client"

import { useState } from "react"
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import NewRewardForm from "./NewRewardForm";
// import NewRewardForm from "./reward-form"
// import WizardSteps from "./wizard-steps"
// import RewardPreview from "./reward-preview"
// import FormSummaryModal from "./form-summary-modal"

export default function NewReward() {
  const [rewards, setRewards] = useState([
    {
      id: "reward-1",
      title: "",
      hasASIN: null,
      description: "",
      retailValue: "",
      rewardType: "",
      distributionMethod: "show",
      image: null,
      imagePreview: null,
    },
  ])

  const [errors, setErrors] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  const addReward = () => {
    const newRewardId = `reward-${rewards.length + 1}`
    setRewards([
      ...rewards,
      {
        id: newRewardId,
        title: "",
        hasASIN: null,
        description: "",
        retailValue: "",
        rewardType: "",
        distributionMethod: "show",
        image: null,
        imagePreview: null,
      },
    ])
  }

  const deleteReward = (id) => {
    if (rewards.length <= 1) {
      alert("You must have at least one reward")
      return
    }

    const updatedRewards = rewards.filter((reward) => reward.id !== id)
    const renumberedRewards = updatedRewards.map((reward, index) => ({
      ...reward,
      displayNumber: index + 1,
    }))

    setRewards(renumberedRewards)

    // Clear errors for deleted reward
    const newErrors = { ...errors }
    Object.keys(newErrors).forEach((key) => {
      if (key.startsWith(`${id}-`)) {
        delete newErrors[key]
      }
    })
    setErrors(newErrors)
  }

  const updateReward = (id, field, value) => {
    setRewards(
      rewards.map((reward) => {
        if (reward.id === id) {
          if (field === "image" && value) {
            const imagePreview = URL.createObjectURL(value)
            return { ...reward, [field]: value, imagePreview }
          }
          return { ...reward, [field]: value }
        }
        return reward
      }),
    )

    // Clear field error
    if (errors[`${id}-${field}`]) {
      setErrors({
        ...errors,
        [`${id}-${field}`]: null,
      })
    }
  }

  const validateRewards = () => {
    const newErrors = {}
    let isValid = true

    rewards.forEach((reward) => {
      if (!reward.title) {
        newErrors[`${reward.id}-title`] = "Title is required"
        isValid = false
      }

      if (reward.hasASIN === null) {
        newErrors[`${reward.id}-hasASIN`] = "Please select Yes or No"
        isValid = false
      }

      if (!reward.description) {
        newErrors[`${reward.id}-description`] = "Description is required"
        isValid = false
      }

      if (!reward.retailValue) {
        newErrors[`${reward.id}-retailValue`] = "Retail value is required"
        isValid = false
      } else if (isNaN(Number.parseFloat(reward.retailValue))) {
        newErrors[`${reward.id}-retailValue`] = "Retail value must be a number"
        isValid = false
      }

      if (!reward.rewardType) {
        newErrors[`${reward.id}-rewardType`] = "Reward type is required"
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateRewards()) {
      console.log("Form submitted successfully", rewards)
      setIsModalOpen(true)
    }
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const reorderedRewards = reorderRewards(rewards, result.source.index, result.destination.index)
    setRewards(reorderedRewards)
  }

  const reorderRewards = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result.map((item, index) => ({
      ...item,
      displayNumber: index + 1,
    }))
  }

  const totalRetailPrice = rewards.reduce((total, reward) => {
    const value = Number.parseFloat(reward.retailValue) || 0
    return total + value
  }, 0)

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        New Reward <span className="text-gray-500">Setup</span>
      </h1>

      <WizardSteps currentStep={2} />

      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">Create and manage your rewards with ease!</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Reward Item Details</h3>
                <button type="button" className="text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Add and manage your rewards. Drag and drop to reorder them as needed.
              </p>

              <form onSubmit={handleSubmit}>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="rewards-list">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-6">
                        {rewards.map((reward, index) => (
                          <Draggable key={reward.id} draggableId={reward.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`${snapshot.isDragging ? "opacity-70" : ""}`}
                              >
                                <NewRewardForm
                                  reward={reward}
                                  updateReward={updateReward}
                                  deleteReward={deleteReward}
                                  errors={errors}
                                  index={index}
                                  dragHandleProps={provided.dragHandleProps}
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
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add More
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Terms and Conditions</h3>
                <button type="button" className="text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Total Retail Value:</h3>
                <p className="text-lg font-medium">${totalRetailPrice.toFixed(2)}</p>
              </div>

              {rewards.map((reward) => (
                <RewardPreview key={reward.id} reward={reward} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <FormSummaryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} rewards={rewards} />
    </div>
  )
} 