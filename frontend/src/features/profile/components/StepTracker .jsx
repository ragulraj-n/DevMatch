import React from "react";

const StepTracker = ({ currentStep = 1 }) => {
  const steps = [1, 2];

  return (
    <div className="w-full flex justify-center mt-6">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold
                ${
                  currentStep >= step
                    ? "bg-blue-500"
                    : "bg-gray-300 text-gray-600"
                }`}>{step}
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`w-14 h-1 mx-2
                  ${
                    currentStep > step
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepTracker;