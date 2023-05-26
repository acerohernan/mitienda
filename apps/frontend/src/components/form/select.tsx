import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

export interface SelectOption {
  value: any;
  component: JSX.Element | JSX.Element[];
}

interface Props {
  items: SelectOption[];
  selectedOption?: SelectOption;
  className?: string;
  optionsContainerClassname?: string;
  onChange: (option: SelectOption) => void;
}

const Select: React.FC<Props> = ({
  items,
  optionsContainerClassname,
  selectedOption,
  className,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SelectOption>(() => {
    if (selectedOption) return selectedOption;

    return items[0];
  });

  const clickRef = useRef(null);

  useClickOutside({ ref: clickRef, callback: () => setOpen(false) });

  function handleChange(option: SelectOption) {
    onChange(option);
    setSelected(option);
  }

  return (
    <div className="relative" ref={clickRef}>
      <button
        className={`focus:shadow-outline  flex items-center justify-between dark:text-slate-300 ${className}`}
        type="button"
        onClick={() => setOpen(!open)}
      >
        <div>{selected.component}</div>
        {open ? (
          <ChevronUpIcon className="w-4 h-4 ml-2" />
        ) : (
          <ChevronDownIcon className="w-4 h-4 ml-2" />
        )}
      </button>
      <div
        className={`absolute rounded-md bottom-100 shadow-lg bg-white dark:bg-dark-500  ease-in-out duration-300 origin-top z-10 ${
          open
            ? "transform opacity-100 scale-100"
            : "transform opacity-0 scale-0"
        } dark:bg-dark-500 ${optionsContainerClassname}`}
      >
        {items.map((item, i) => {
          if (item.value === selected.value) return;

          return (
            <button
              className={`text-start w-full p-3 text-sm hover:bg-gray-400/10 dark:hover:bg-gray-700/30`}
              key={i}
              tabIndex={open ? 0 : -1}
              onClick={() => handleChange(item)}
            >
              {item.component}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Select;
