interface Props {
  label?: string;
  full?: boolean;
  error?: string;
  inputProps?: Object;
  className?: string;
  optional?: boolean;
  textarea?: boolean;
}

const TextInput: React.FC<Props> = ({
  className,
  full,
  label,
  error,
  inputProps,
  optional,
  textarea,
}) => {
  return (
    <div>
      {label ? (
        <label htmlFor={label} className="label mb-2 inline-block">
          {label}
          {!optional && " *"}
        </label>
      ) : null}
      {!textarea && (
        <input
          id={label}
          className={`${error ? "input-error" : "input"} p-3 ${className} ${
            full && "w-full"
          }`}
          type="text"
          {...inputProps}
        />
      )}
      {textarea && (
        <textarea
          id={label}
          className={`${error ? "input-error" : "input"} p-3 ${className} ${
            full && "w-full"
          }`}
          {...inputProps}
        />
      )}
      {error ? (
        <span className="input-error-message mt-2 inline-block">{error}</span>
      ) : null}
    </div>
  );
};

export default TextInput;
