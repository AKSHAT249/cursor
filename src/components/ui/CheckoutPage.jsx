"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, CreditCardIcon, TruckIcon, UserIcon } from "@heroicons/react/24/outline";

// Constants
const STEPS = [
  { id: "shipping", label: "Shipping", icon: UserIcon },
  { id: "payment", label: "Payment", icon: CreditCardIcon },
  { id: "review", label: "Review", icon: CheckCircleIcon },
];

const PAYMENT_METHODS = [
  {
    id: "credit",
    label: "Credit Card",
    description: "Pay with your credit card",
    icon: CreditCardIcon,
  },
  {
    id: "paypal",
    label: "PayPal",
    description: "Pay with your PayPal account",
    icon: CreditCardIcon,
  },
];

// Components
function ProgressBar({ currentStep }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${
                  isCompleted
                    ? "bg-blue-500 border-blue-500 text-white"
                    : isCurrent
                    ? "border-blue-500 text-blue-500"
                    : "border-gray-300 text-gray-300"
                }`}
              >
                {isCompleted ? (
                  <CheckCircleIcon className="w-6 h-6" />
                ) : (
                  <Icon className="w-6 h-6" />
                )}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  isCurrent ? "text-blue-500" : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="relative mt-4">
        <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
        <div
          className="absolute top-0 left-0 h-1 bg-blue-500 transition-all duration-300"
          style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

function InputField({ label, id, error, type = "text", ...props }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          error ? "border-red-400" : ""
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <div id={`${id}-error`} className="text-xs text-red-500 mt-1" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

function PaymentMethodCard({ method, selected, onSelect }) {
  const Icon = method.icon;
  return (
    <button
      type="button"
      className={`w-full p-4 rounded-xl border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        selected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-blue-400"
      }`}
      onClick={() => onSelect(method.id)}
      aria-pressed={selected}
    >
      <div className="flex items-center space-x-4">
        <Icon className="w-6 h-6 text-blue-500" />
        <div className="text-left">
          <div className="font-medium">{method.label}</div>
          <div className="text-sm text-gray-500">{method.description}</div>
        </div>
      </div>
    </button>
  );
}

function ShippingForm({ data, onChange, errors }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="First Name"
          id="firstName"
          value={data.firstName}
          onChange={(e) => onChange({ ...data, firstName: e.target.value })}
          error={errors.firstName}
          required
        />
        <InputField
          label="Last Name"
          id="lastName"
          value={data.lastName}
          onChange={(e) => onChange({ ...data, lastName: e.target.value })}
          error={errors.lastName}
          required
        />
      </div>
      <InputField
        label="Email"
        id="email"
        type="email"
        value={data.email}
        onChange={(e) => onChange({ ...data, email: e.target.value })}
        error={errors.email}
        required
      />
      <InputField
        label="Address"
        id="address"
        value={data.address}
        onChange={(e) => onChange({ ...data, address: e.target.value })}
        error={errors.address}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          label="City"
          id="city"
          value={data.city}
          onChange={(e) => onChange({ ...data, city: e.target.value })}
          error={errors.city}
          required
        />
        <InputField
          label="State"
          id="state"
          value={data.state}
          onChange={(e) => onChange({ ...data, state: e.target.value })}
          error={errors.state}
          required
        />
        <InputField
          label="ZIP Code"
          id="zipCode"
          value={data.zipCode}
          onChange={(e) => onChange({ ...data, zipCode: e.target.value })}
          error={errors.zipCode}
          required
        />
      </div>
    </motion.div>
  );
}

function PaymentForm({ data, onChange, errors }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        {PAYMENT_METHODS.map((method) => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            selected={data.paymentMethod === method.id}
            onSelect={(id) => onChange({ ...data, paymentMethod: id })}
          />
        ))}
      </div>
      {data.paymentMethod === "credit" && (
        <div className="space-y-4">
          <InputField
            label="Card Number"
            id="cardNumber"
            value={data.cardNumber}
            onChange={(e) => onChange({ ...data, cardNumber: e.target.value })}
            error={errors.cardNumber}
            placeholder="1234 5678 9012 3456"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Expiry Date"
              id="expiryDate"
              value={data.expiryDate}
              onChange={(e) => onChange({ ...data, expiryDate: e.target.value })}
              error={errors.expiryDate}
              placeholder="MM/YY"
              required
            />
            <InputField
              label="CVV"
              id="cvv"
              type="password"
              value={data.cvv}
              onChange={(e) => onChange({ ...data, cvv: e.target.value })}
              error={errors.cvv}
              placeholder="123"
              required
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

function ReviewForm({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-semibold text-lg mb-4">Shipping Information</h3>
        <div className="space-y-2 text-gray-600">
          <p>{`${data.firstName} ${data.lastName}`}</p>
          <p>{data.email}</p>
          <p>{data.address}</p>
          <p>{`${data.city}, ${data.state} ${data.zipCode}`}</p>
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-semibold text-lg mb-4">Payment Information</h3>
        <div className="space-y-2 text-gray-600">
          <p>
            {data.paymentMethod === "credit"
              ? `Credit Card ending in ${data.cardNumber.slice(-4)}`
              : "PayPal"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const validateStep = () => {
    const newErrors = {};
    
    if (currentStep === 0) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";
    } else if (currentStep === 1) {
      if (!formData.paymentMethod) {
        newErrors.paymentMethod = "Please select a payment method";
      }
      if (formData.paymentMethod === "credit") {
        if (!formData.cardNumber) {
          newErrors.cardNumber = "Card number is required";
        } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
          newErrors.cardNumber = "Invalid card number";
        }
        if (!formData.expiryDate) {
          newErrors.expiryDate = "Expiry date is required";
        } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
          newErrors.expiryDate = "Invalid expiry date format (MM/YY)";
        }
        if (!formData.cvv) {
          newErrors.cvv = "CVV is required";
        } else if (!/^\d{3,4}$/.test(formData.cvv)) {
          newErrors.cvv = "Invalid CVV";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Handle form submission
        console.log("Form submitted:", formData);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ShippingForm
            data={formData}
            onChange={setFormData}
            errors={errors}
          />
        );
      case 1:
        return (
          <PaymentForm
            data={formData}
            onChange={setFormData}
            errors={errors}
          />
        );
      case 2:
        return <ReviewForm data={formData} />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="mt-2 text-gray-600">Complete your purchase</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <ProgressBar currentStep={currentStep} />
          
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className={`ml-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                  currentStep === 0 ? "w-full md:w-auto" : ""
                }`}
              >
                {currentStep === STEPS.length - 1 ? "Place Order" : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 