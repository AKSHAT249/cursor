import { useState } from 'react';

const goalOptions = [
  {
    id: 'lead-generation',
    title: 'Lead Generation',
    description: 'Collect valuable participant information to build your sales funnel and follow up effectively after the show.',
    defaultSelected: true
  },
  {
    id: 'brand-awareness',
    title: 'Brand Awareness',
    description: 'Drive excitement and attention to your booth without requiring participant data collection.',
    defaultSelected: false
  }
];

export default function StepPageOne( {activeStep, setActiveStep }) {
    

  // UI States
  const [isOpen, setIsOpen] = useState(true);
  const [selectedGoal, setSelectedGoal] = useState('lead-generation');
  
  // Form States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle goal selection
  const handleGoalChange = (goalId) => {
    console.log("goalId changed function called", goalId);
    setSelectedGoal(goalId);
    setError(null); // Clear any previous errors
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Validate selection
      if (!selectedGoal) {
        throw new Error('Please select a goal');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Handle successful submission
      setSuccess(true);
      
      // You can add navigation logic here
      // router.push('/next-step');
      
    } catch (err) {
      setError(err.message);
    } finally {
      
      setIsSubmitting(false);
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
        Set your Goals
      </h1>

      {/* Collapsible Card Panel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-4 flex items-center justify-between focus:outline-none"
          aria-expanded={isOpen}
          aria-controls="goal-content"
        >
          <div className="flex-1 text-left">
            <h2 className="text-lg font-semibold text-gray-900">
              Let's create a Giveaway that meets your goals!
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Giveaways are powerful tools to connect with participants. Before we get started, decide what you want to achieve with this giveaway.
            </p>
          </div>
          <svg
            className={`w-6 h-6 text-gray-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div id="goal-content" className="px-6 pb-6">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-600">Goals set successfully! Redirecting...</p>
              </div>
            )}

            {/* Goal Option Cards */}
            <div className="space-y-4">
              {goalOptions.map((option) => (
                <label
                  key={option.id}
                  className={`block cursor-pointer transition-colors duration-200
                    ${selectedGoal === option.id
                      ? 'border-2 border-blue-500 bg-blue-50'
                      : 'border border-gray-200 bg-white hover:border-blue-200'
                    } rounded-lg p-4`}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name="goal"
                      value={option.id}
                      checked={selectedGoal === option.id}
                      onChange={() => handleGoalChange(option.id)}
                      className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                    <div className="ml-3">
                      <span className={`block text-base font-semibold
                        ${selectedGoal === option.id ? 'text-blue-700' : 'text-gray-900'}`}>
                        {option.title}
                      </span>
                      <span className="block mt-1 text-sm text-gray-500">
                        {option.description}
                      </span>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {/* Info Note */}
            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <span className="font-semibold text-indigo-600">Note:</span> Choose the option that aligns with your objectives for maximum impact. Don't worry—you'll be able to adjust this setting later if needed!
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-full
                  hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  transition-all duration-200 transform hover:scale-[1.02]
                  ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Submit & Continue'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 