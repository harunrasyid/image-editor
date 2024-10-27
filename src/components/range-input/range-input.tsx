import { classNames } from "@/utils";
import { IRangeInputProps } from "./range-input.props";

export const RangeInput = ({
  id,
  label,
  value,
  onChange = () => {},
  min,
  max,
  step,
  labelClassName,
  inputClassName,
}: IRangeInputProps) => {
  return (
    <div>
      {label ? (
        <label
          htmlFor={id}
          className={classNames(
            "block text-sm font-satoshi font-medium text-gray-700",
            labelClassName,
          )}
        >
          {label}
        </label>
      ) : null}
      <input
        id={id}
        type="range"
        value={value}
        className={classNames(
          "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer cursor:",
          inputClassName,
        )}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
};
