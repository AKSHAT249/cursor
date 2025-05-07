"use client";
import { useState, useRef } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

// --- Constants ---
const rewardTypes = [
  "Gift Card",
  "Physical Product",
  "Coupon",
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
const MAX_FILE_SIZE = 25 * 1024 * 1024;

// --- Zod Schema ---
const rewardSchema = z.object({
  hasASIN: z.boolean({ required_error: "Select Yes or No" }),
  title: z.string().min(1, "Reward Title is required"),
  description: z.string().min(1, "Description is required").max(MAX_DESCRIPTION, `Max ${MAX_DESCRIPTION} characters`),
  retailValue: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().positive("Enter a positive number").finite("Enter a valid number")
  ),
  rewardType: z.string().min(1, "Reward Type is required"),
  distribution: z.string().min(1, "Distribution Method is required"),
  image: z
    .any()
    .refine(
      (file) => !file || (file && file.size <= MAX_FILE_SIZE),
      "File size must be 25MB or less"
    )
    .refine(
      (file) => !file || ["image/jpeg", "image/png"].includes(file.type),
      "File must be JPEG or PNG"
    )
    .optional(),
});

const initialFormState = {
  hasASIN: false,
  title: "",
  description: "",
  retailValue: "",
  rewardType: "",
  distribution: "show",
  image: null,
};

// --- Components ---
function ToggleSwitch({ value, onChange, error, name }) {
  return (
    <fieldset className="mb-4">
      <legend className="block text-sm font-medium text-gray-700 mb-2">Do you have ASIN for the product?</legend>
      <div className="flex gap-4" role="radiogroup" aria-label="ASIN Toggle">
        {[true, false].map((val) => (
          <button
            key={val ? "yes" : "no"}
            type="button"
            className={`px-6 py-2 rounded-full border transition-colors duration-150 font-semibold text-sm focus:outline-none shadow-sm ${value === val ? "bg-blue-500 text-white border-blue-500" : "bg-gray-100 text-gray-700 border-gray-300"}`}
            aria-pressed={value === val}
            onClick={() => onChange(val)}
            name={name}
            role="button"
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
        className={`w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${error ? "border-red-400" : ""}`}
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
        className={`resize-none w-full rounded-xl p-4 border border-gray-300 min-h-[120px] shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${error ? "border-red-400" : ""}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
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

function RewardCardOption({ label, description, selected, onClick, ...props }) {
  return (
    <button
      type="button"
      className={`rounded-xl border p-4 w-full cursor-pointer flex flex-col items-center justify-center text-center font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 ${selected ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 bg-white text-gray-700"}`}
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
        className={`border-2 border-dashed rounded-xl p-6 flex flex-col justify-center items-center gap-2 cursor-pointer transition-colors duration-150 ${dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-50 hover:border-blue-400"} ${error ? "border-red-400 bg-red-50" : ""}`}
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={e => { e.preventDefault(); setDragActive(true); }}
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

function RewardItemForm({ idx, control, register, errors, setValue, watch, remove, isOpen, setOpen }) {
  const image = watch(`rewards.${idx}.image`);
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
        className="w-full flex justify-between items-center px-6 py-4 focus:outline-none"
        onClick={() => setOpen(isOpen ? null : idx)}
        aria-expanded={isOpen}
        aria-controls={`reward-item-${idx}-panel`}
        id={`reward-item-${idx}-heading`}
      >
        <span className="text-lg font-semibold text-gray-900">Reward Item {idx + 1}</span>
        <svg className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
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
              <Controller
                name={`rewards.${idx}.hasASIN`}
                control={control}
                render={({ field }) => (
                  <ToggleSwitch
                    value={field.value}
                    onChange={field.onChange}
                    error={errors?.rewards?.[idx]?.hasASIN?.message}
                    name={`asin-toggle-${idx}`}
                  />
                )}
              />
              <InputField
                label="Reward Title"
                id={`reward-title-${idx}`}
                {...register(`rewards.${idx}.title`)}
                error={errors?.rewards?.[idx]?.title?.message}
                placeholder="e.g., Gift Basket of Organic Baby Products"
              />
              <Controller
                name={`rewards.${idx}.description`}
                control={control}
                render={({ field }) => (
                  <TextArea
                    label="Description"
                    id={`reward-desc-${idx}`}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors?.rewards?.[idx]?.description?.message}
                    placeholder="e.g., Includes eco-friendly baby wipes, plush toy, and more!"
                    maxLength={MAX_DESCRIPTION}
                  />
                )}
              />
              <InputField
                label="Retail Value"
                id={`reward-value-${idx}`}
                type="number"
                {...register(`rewards.${idx}.retailValue`)}
                error={errors?.rewards?.[idx]?.retailValue?.message}
                placeholder="$50.00"
              />
              <div className="mb-4">
                <label htmlFor={`reward-type-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">Reward Type</label>
                <select
                  id={`reward-type-${idx}`}
                  className={`appearance-none border rounded-xl px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors?.rewards?.[idx]?.rewardType ? "border-red-400" : "border-gray-300"}`}
                  {...register(`rewards.${idx}.rewardType`)}
                  aria-invalid={!!errors?.rewards?.[idx]?.rewardType}
                  aria-describedby={errors?.rewards?.[idx]?.rewardType ? `reward-type-error-${idx}` : undefined}
                >
                  <option value="">Select a reward type</option>
                  {rewardTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors?.rewards?.[idx]?.rewardType && <div id={`reward-type-error-${idx}`} className="text-xs text-red-500 mt-1" role="alert">{errors.rewards[idx].rewardType.message}</div>}
              </div>
              <Controller
                name={`rewards.${idx}.distribution`}
                control={control}
                render={({ field }) => (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Distribution Method</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                      {distributionMethods.map((method) => (
                        <RewardCardOption
                          key={method.value}
                          label={method.label}
                          description={method.description}
                          selected={field.value === method.value}
                          onClick={() => field.onChange(method.value)}
                          role="button"
                          tabIndex={0}
                          aria-pressed={field.value === method.value}
                        />
                      ))}
                    </div>
                    {errors?.rewards?.[idx]?.distribution && <div className="text-xs text-red-500 mt-1" role="alert">{errors.rewards[idx].distribution.message}</div>}
                  </div>
                )}
              />
              <Controller
                name={`rewards.${idx}.image`}
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    error={errors?.rewards?.[idx]?.image?.message}
                    id={`reward-image-${idx}`}
                  />
                )}
              />
              {remove && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={remove}
                    className="text-red-500 border border-red-200 rounded-full px-5 py-2 mt-2 hover:bg-red-50"
                    aria-label="Remove this reward item"
                  >
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

export default function FifthPage() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: { rewards: [initialFormState] },
    resolver: zodResolver(z.object({ rewards: z.array(rewardSchema) })),
    mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({ control, name: "rewards" });
  const [open, setOpen] = useState(0);

  const onSubmit = (data) => {
    // handle form submission
    alert("Form submitted! " + JSON.stringify(data, null, 2));
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-gray-900">Reward Items</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence initial={false}>
            {fields.map((field, idx) => (
              <RewardItemForm
                key={field.id}
                idx={idx}
                control={control}
                register={register}
                errors={errors}
                setValue={setValue}
                watch={watch}
                remove={fields.length > 1 ? () => remove(idx) : undefined}
                isOpen={open === idx}
                setOpen={setOpen}
              />
            ))}
          </AnimatePresence>
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={() => {
                append(initialFormState);
                setOpen(fields.length);
              }}
              className="mt-6 border border-blue-500 text-blue-500 rounded-full px-5 py-2 hover:bg-blue-50 transition-all font-semibold"
              aria-label="Add another reward item"
            >
              Add More +
            </button>
          </div>
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-500 text-white py-2 px-8 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Submit all reward items"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
} 