import React from "react";

interface Props {
  checked?: boolean;
}

const Checkbox: React.FC<Props> = ({ checked }) => {
  return (
    <div
      className={`w-6 h-6 relative border rounded-md 
              border-slate-600 dark:border-slate-400
              ${checked ? "bg-purple-700" : ""}`}
    >
      {checked && (
        <span
          className="w-1 h-3
              bg-white  
               absolute
               rotate-45
               m-auto
               top-0
               bottom-0
               -right-1
               left-0
               border-b-2
               after:content-['']
               after:w-2
               after:h-1
               after:bg-white
               after:absolute
               after:-bottom-1
               after:right-0
               "
        ></span>
      )}
    </div>
  );
};

export default Checkbox;
