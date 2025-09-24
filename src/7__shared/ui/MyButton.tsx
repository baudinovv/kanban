import type { MouseEventHandler } from "react";

interface MyInputProps {
  children?: string;
  onClick?: MouseEventHandler;
  className?: string;
}

export const MyButton = (props: MyInputProps) => {
  return (
    <button
      {...props}
      className={"text-xm transition text-4 text-theme-text  border-1 border-theme-text w-full px-8 py-1 rounded-xl  hover:bg-button-hover hover:text-opposite cursor-pointer hover:border-button-hover " + props.className} 
    >{props.children}</button>
  ) 
}



