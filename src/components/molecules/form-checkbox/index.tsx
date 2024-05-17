import { FormCheckboxProps } from "@/models/types/forms/form-checkbox";

export function FormCheckbox({ label, name }: FormCheckboxProps) {
  return (
    <div className="flex gap-2 items-center text-sm font-normal">
      <input
        className="w-4 h-4"
        type="checkbox"
        name={name}
        id={`form-checkbox-${name}`}
      />{" "}
      <label htmlFor={`form-checkbox-${name}`}>{label}</label>
    </div>
  );
}
