import React from 'react'
import RewardItemDetails from './RewardItemDetails'
import Preview from './Preview'
const StepReward = () => {
  return (
    <section className="w-full max-w-5xl mx-auto flex mt-10">
      {/* Left section - 60% width */}
      <div className="w-[60%] pr-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          {/* <h1 className="text-2xl font-bold text-gray-900 mb-6">Show off the value of your Giveaway to entice participants!</h1> */}
          <RewardItemDetails />
         
          
          {/* <div className="space-y-4"> */}
            {/* First Accordion */}
            {/* <div className="border rounded-lg">
              <div className="p-4">
                <h2 className="text-xl font-semibold">Reward Item Details</h2>
                <p className="text-gray-600 mt-1">For each item in your Giveaway, provide the following</p>
              </div>
            </div> */}

            {/* Second Accordion */}
            {/* <div className="border rounded-lg">
              <div className="p-4">
                <h2 className="text-xl font-semibold">Agreement on Rules</h2>
              </div>
            </div> */}

            {/* Note */}
            {/* <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Note: If your Giveaway is a bundle of rewards, list each item separately</p>
            </div> */}
          {/* </div> */}
        </div>
      </div>

      {/* Right section - 40% width */}
      <div className="w-[40%]">
        <Preview />
      </div>
    </section>
  )
}

export default StepReward
