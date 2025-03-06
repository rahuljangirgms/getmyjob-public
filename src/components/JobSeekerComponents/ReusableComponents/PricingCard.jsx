import React from 'react'

/**
 * A reusable pricing card component.
 * 
 * @param {string}   planName      - The name of the plan (e.g. "Standard plan")
 * @param {string}   price         - The plan's price (e.g. "49")
 * @param {string}   frequency     - Billing frequency (e.g. "/month")
 * @param {Object[]} features      - Array of features: [{ text: string, included: boolean }, ...]
 * @param {string}   buttonText    - Text on the CTA button
 * @param {function} onClick       - Handler for the button click
 */
const PricingCard = ({
  planName = "Standard plan",
  price = "49",
  frequency = "/month",
  features = [
    { text: "2 team members", included: true },
    { text: "20GB Cloud storage", included: true },
    { text: "Integration help", included: true },
    { text: "Sketch Files", included: false },
    { text: "API Access", included: false },
    { text: "Complete documentation", included: false },
    { text: "24×7 phone & email support", included: false },
  ],
  buttonText = "Choose plan",
  onClick,
}) => {
  // A small helper component for the check icon
  const CheckIcon = ({ included }) => (
    <svg
      className={`shrink-0 w-4 h-4 ${
        included ? 'text-blue-700 dark:text-blue-500' : 'text-gray-400 dark:text-gray-500'
      }`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
    </svg>
  )

  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      {/* Plan Name */}
      <h5 className="mb-4 text-xl font-medium text-blue-800 dark:text-gray-400">
        {planName}
      </h5>

      {/* Price */}
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-semibold">₹</span>
        <span className="text-5xl font-extrabold tracking-tight">{price}</span>
        <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
          {frequency}
        </span>
      </div>

      {/* Features */}
      <ul role="list" className="space-y-5 my-7">
        {features.map((feature, index) => (
          <li
            key={index}
            className={`flex ${
              feature.included
                ? 'items-center'
                : 'line-through decoration-gray-500'
            }`}
          >
            <CheckIcon included={feature.included} />
            <span className="text-base font-semibold leading-tight text-gray-600 dark:text-gray-400 ml-3">
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        type="button"
        onClick={onClick}
        className="text-white bg-blue-700 hover:bg-blue-800 
                   focus:ring-4 focus:outline-none focus:ring-blue-200 
                   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 
                   font-medium rounded-lg text-sm px-5 py-2.5 
                   inline-flex justify-center w-full text-center"
      >
        {buttonText}
      </button>
    </div>
  )
}

export default PricingCard
