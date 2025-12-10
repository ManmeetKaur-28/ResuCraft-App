import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600 hover:bg-blue-700",
  textColor = "text-white",
  className = "",
  cursorStyle = "cursor-pointer",
  ...props
}) {
  return (
    <div className="w-fit m-2">
      <button
        type={type}
        className={`px-4 py-1 rounded-lg font-['Unna'] 
                 border border-blue-500/60
                 active:scale-95 shadow-md ${cursorStyle}
                 transition-all duration-300 ease-in-out ${className} ${bgColor} ${textColor}`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
