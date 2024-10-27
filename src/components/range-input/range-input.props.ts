export interface IRangeInputProps {
  id?: string;
  label?: string;
  value?: number;
  onChange?(newValue: number): void;
  min?: number;
  max?: number;
  step?: number;
  labelClassName?: string;
  inputClassName?: string;
}
