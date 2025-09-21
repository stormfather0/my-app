import React, { useState, useEffect } from "react";

export default function AdditionalOptionsDropdown({ selectedOptions = [], onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [localSelected, setLocalSelected] = useState(selectedOptions);

  const additionalOptions = [
    { id: "guarantee-1y", label: "Additional guarantee for 1 year", price: 50, img: "/my-app/additional-services-1.png.webp" },
    { id: "service-breakdowns", label: "Service for unexpected breakdowns", price: 80, img: "/my-app/additional-services-2.png.webp" },
    { id: "guarantee-2y", label: "Full guarantee for 2 years", price: 100, img: "/my-app/additional-services-3.png.webp" },
  ];

  // Sync prop changes
  useEffect(() => {
    setLocalSelected(selectedOptions);
  }, [selectedOptions]);

  const toggleOption = (option) => {
    let updated;
    if (localSelected.some((o) => o.id === option.id)) {
      updated = localSelected.filter((o) => o.id !== option.id);
    } else {
      updated = [...localSelected, option];
    }
    setLocalSelected(updated);
    onChange(updated); // notify parent
  };

  return (
    <div className="w-full mt-2 border-gray-300 pb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-start items-center px-3 py-2 rounded-lg bg-gray-100 cursor-pointer transition"
      >
        <span className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 ${isOpen ? "rotate-180" : "rotate-0"}`}
            viewBox="0 0 512 298.04"
            fill="currentColor"
          >
            <path d="M12.08 70.78c-16.17-16.24-16.09-42.54.15-58.7 16.25-16.17 42.54-16.09 58.71.15L256 197.76 441.06 12.23c16.17-16.24 42.46-16.32 58.71-.15 16.24 16.16 16.32 42.46.15 58.7L285.27 285.96c-16.24 16.17-42.54 16.09-58.7-.15L12.08 70.78z" />
          </svg>
        </span>
        Options
      </button>

      {isOpen && (
        <div className="flex flex-col mt-2 rounded-lg bg-white">
          {additionalOptions.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={localSelected.some((o) => o.id === option.id)}
                onChange={() => toggleOption(option)}
                className="accent-green-600 w-4 h-4"
              />
              <img src={option.img} alt={option.label} className="w-6 h-6 object-contain" />
              <div className="flex justify-between w-full">
              <span className="text-gray-800">{option.label} </span>
              <p  >${option.price}</p>
              </div>
            
            </label>
          ))}
        </div>
      )}
    </div>
  );
}