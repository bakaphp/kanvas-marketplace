import { FormCheckboxProps } from '@/models/types/forms/form-checkbox';
import { Checkbox } from '@kanvas/phoenix-rebirth/dist/components/base/checkbox.mjs';

export function FormCheckbox({ label, name }: FormCheckboxProps) {
  return (
    <div className='flex gap-2 items-center text-sm font-normal'>
      <Checkbox className='w-4 h-4' name={name} id={`form-checkbox-${name}`} />{' '}
      <label htmlFor={`form-checkbox-${name}`}>{label}</label>
    </div>
  );
}
