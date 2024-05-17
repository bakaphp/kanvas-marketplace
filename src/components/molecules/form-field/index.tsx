import { FormFieldProps } from "@/models/types/forms/form-field";

export function FormField({
  type,
  name,
  label,
  error,
  placeholder,
  value,
  onChange,
  onBlur,
}: FormFieldProps) {
  return (
    <div className="flex flex-col w-full gap-[6px] text-sm font-normal">
      <label htmlFor={`form-field-${name}`}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className="rounded-md p-2 gap-[10px] bg-transparent border-default border outline-none placeholder:text-white"
        type={type ?? "text"}
        name={name}
        id={`form-field-${name}`}
      />
      <p className="text-red-500 h-5">{error ? `${error}*` : ""}</p>
    </div>
  );
}
