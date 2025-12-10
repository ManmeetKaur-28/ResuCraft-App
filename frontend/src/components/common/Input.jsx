import React from "react";
import { useId, forwardRef } from "react";

function Input(
  {
    type = "text",
    textColor = "text-gray-900",
    label,
    className = "",
    labelClass = "",
    labelColor = "text-blue-900",
    ...props
  },
  ref
) {
  const id = useId();
  return (
    <div className="flex flex-col space-y-2 w-full max-w-md mx-auto my-4">
      {label && (
        <label
          className={`font-['Unna'] ${labelColor} font-semibold text-lg tracking-wide px-2 ${labelClass}`}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        type={type}
        {...props}
        className={`w-full px-4 py-2 rounded-lg bg-white ${textColor} placeholder-gray-400
           border border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500
           outline-none transition-all duration-200 shadow-sm ${className}`}
      />
    </div>
  );
}

export default forwardRef(Input);
