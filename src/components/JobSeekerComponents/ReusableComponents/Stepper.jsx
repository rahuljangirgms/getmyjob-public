import React from "react";

const Stepper = ({ steps, currentStep, onStepChange }) => {
  return (
    <div>
      <ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse cursor-pointer">
        {steps.map((step, index) => (
          <li
            key={index}
            onClick={() => onStepChange(index)} // ✅ Update parent state directly
            className={`flex items-center space-x-2.5 rtl:space-x-reverse transition duration-300 ${
              currentStep === index ? "text-blue-600 font-bold" : "text-gray-600"
            }`}
          >
            {/* Step Number */}
            <span
              className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 border transition duration-300
                ${
                  currentStep === index
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-600 text-gray-500"
                }`}
            >
              {index + 1}
            </span>

            {/* Step Label */}
            <span>
              <h3 className="font-medium leading-tight">{step.title}</h3>
              <p className="text-sm">{step.description}</p>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Stepper;
