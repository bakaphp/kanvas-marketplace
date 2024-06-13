'use client';
import { FormCheckbox } from '@/components/molecules/form-checkbox';
import { FormField } from '@/components/molecules/form-field';
import { Button } from '@kanvas/phoenix-rebirth/dist/components/base/button';
import { Checkbox } from '@kanvas/phoenix-rebirth/dist/components/base/checkbox';
import { Show, For } from '@kanvas/phoenix-rebirth/dist/utils/server';

import { AuthFormHeader } from './auth-form-header';
import { FormFieldProps } from '@/models/types/forms/form-field';
import Link from 'next/link';
import { cn } from '@kanvas/phoenix-rebirth/dist/lib/utils';

type AuthFormProps = {
  onSubmit: (arg: any) => void;
  header?: string;
  title: string;
  forgotPassword?: {
    label: string;
    href: string;
  };
  rememberMe?: {
    label: string;
  };
  formFields: FormFieldProps[];
  bottomSection?: {
    text?: string;
    link: {
      label: string;
      href: string;
    };
  };
  submitButton: {
    label: string;
  };
  isSubmitting: boolean;
  isValid: boolean;
};

export default function AuthForm({
  header,
  title,
  forgotPassword,
  formFields,
  rememberMe,
  bottomSection,
  submitButton,
  onSubmit,
  isSubmitting,
}: AuthFormProps) {
  return (
    <>
      {header && <AuthFormHeader title={header} />}
      <form
        onSubmit={onSubmit}
        className='rounded-md border border-default py-[50px] px-6 flex flex-col gap-10 text-foreground'
      >
        <h5 className='text-2xl font-bold'>{title}</h5>
        <div className='flex flex-col gap-3 w-[350px]'>
          <Show when={Boolean(formFields.length)} deps={[formFields.length]}>
            <For each={formFields}>
              {(formFieldProps, { index }) => (
                <FormField key={`form-field-${index}`} {...formFieldProps} />
              )}
            </For>
          </Show>

          {(rememberMe || forgotPassword) && (
            <div className='flex justify-between items-center w-full'>
              {rememberMe && (
                <FormCheckbox label={rememberMe.label} name='remember' />
              )}
              {forgotPassword && (
                <Button variant='link'>{forgotPassword.label}</Button>
              )}
            </div>
          )}

          <Button type='submit' disabled={isSubmitting}>
            {submitButton.label}
          </Button>

          <Show when={bottomSection} deps={[bottomSection]}>
            <div className='flex items-center w-full justify-start text-sm font-normal'>
              <p className={cn({ hidden: !bottomSection!?.text })}>
                {bottomSection!?.text}
              </p>
              <Button variant='link'>
                <Link href={bottomSection!?.link.href}>
                  {bottomSection!?.link?.label}
                </Link>
              </Button>
            </div>
          </Show>
        </div>
      </form>
    </>
  );
}
