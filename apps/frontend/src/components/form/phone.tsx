import Image from "next/image";
import { useState } from "react";
import { COUNTRIES, IPrefix, prefixes } from "../../constants/countries";
import Select, { SelectOption } from "./select";

interface Props {
  label?: string;
  full?: boolean;
  error?: string;
  inputProps?: Object;
  className?: string;
  defaultPrefix?: string;
  onPrefixChange: (prefix: string) => void;
}

const PhoneInput: React.FC<Props> = ({
  className,
  full,
  label,
  error,
  inputProps,
  defaultPrefix,
  onPrefixChange,
}) => {
  const [selectedPrefix, setSelectedPrefix] = useState<IPrefix>(() => {
    let prefix = prefixes["1"];

    if (defaultPrefix && prefixes[defaultPrefix]) {
      prefix = prefixes[defaultPrefix];
    }

    return prefix;
  });

  function handlePrefixChange(option: SelectOption) {
    onPrefixChange(option.value);
  }

  return (
    <div>
      {label ? (
        <label htmlFor="name" className="label mb-2 inline-block">
          {label}
        </label>
      ) : null}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center px-2">
          <Select
            items={COUNTRIES.map((country) => ({
              value: country.prefix,
              component: (
                <div className="flex items-center">
                  <Image
                    src={`/icons/countries/${country.code}.svg`}
                    alt={country.code}
                    width={15}
                    height={15}
                    className="rounded-sm mr-2"
                  />
                  <span>({country.prefix})</span>
                </div>
              ),
            }))}
            onChange={handlePrefixChange}
            className="p-1"
            selectedOption={{
              value: selectedPrefix.value,
              component: (
                <div className="flex items-center">
                  <Image
                    src={`/icons/countries/${selectedPrefix.country}.svg`}
                    alt={selectedPrefix.country}
                    width={15}
                    height={15}
                    className="rounded-sm mr-2"
                  />
                  <span>({selectedPrefix.value})</span>
                </div>
              ),
            }}
            optionsContainerClassname="w-20"
          />
        </span>
        <input
          id="name"
          className={`${error ? "input-error" : "input"} ${className} ${
            full && "w-full"
          } p-3 pl-24`}
          type="text"
          {...inputProps}
        />
      </div>
      {error ? (
        <span className="input-error-message mt-2 inline-block">{error}</span>
      ) : null}
    </div>
  );
};

export default PhoneInput;
