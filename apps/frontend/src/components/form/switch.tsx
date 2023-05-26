interface Props {
  className?: string;
  position?: string;
  checked?: boolean;
  onChange?: () => void;
}

const Switch: React.FC<Props> = ({
  className,
  position,
  checked,
  onChange = () => {},
}) => {
  return (
    <label
      className={`inline-flex items-center ${
        position ? position : "relative"
      } cursor-pointer ${className}`}
    >
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-200 dark:peer-focus:ring-purple-400/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-800" />
    </label>
  );
};

export default Switch;
