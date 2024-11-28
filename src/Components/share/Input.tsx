import React, { forwardRef, useState } from "react";

interface InputPropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder?: string;
  id: string;
  label: string;
  error? : string;
}

const Input = forwardRef<HTMLInputElement, InputPropsType>(
  ({ type, placeholder, id, label, value, error , ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);

    const handleBlur = (e : React.ChangeEvent<HTMLInputElement>) => {
      if(!e.target.value){
        setIsFocused(false)
      }
    }

    return (
      <div className="relative flex flex-col w-full">
        <label
          htmlFor={id}
          className={`absolute left-2 transition-all duration-300 ${
            isFocused || value
              ? "-top-0 text-[10px] text-gray-600"
              : "top-2 text-gray-600 text-xs"
          }`}
        >
          {label}
        </label>
        <input
          type={type}
          ref={ref}
          placeholder={placeholder}
          id={id}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          {...props}
          className={`outline-none bg-[#fafafa] border ${error ? "border-red-500": "border-gray-300"} rounded-sm h-9 w-full px-2 text-xs focus:border-gray-400 transition-all duration-100`}
        />
        {error && <span className="text-red-500 text-[10px]">{error}</span>}
      </div>
    );
  }
);

export default Input;
