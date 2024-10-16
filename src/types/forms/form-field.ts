import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type FormFieldProps = {
  label: string;
  type?: InputProps["type"];
  name?: string;
  error?: string;
  placeholder?: string;
  value?: string;
  onChange?: (arg: any) => void;
  onBlur?: (arg: any) => void;
};
