import type { ChangeEventHandler } from "react";

interface MyInputProps {
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  type?: string;
  id?: string;
  value?: string;
}

export const MyInput = ({placeholder, onChange, className, type, value}: MyInputProps) => {
  return (
    <input
      placeholder={placeholder}
      onChange={onChange}
      type={type}
      value={value}
      className={"transition text-4 text-theme-text border-1 border-theme-text w-full px-8 py-1 rounded-xl focus:shadow shadow-theme-text  " + className}
    />
  )
}



