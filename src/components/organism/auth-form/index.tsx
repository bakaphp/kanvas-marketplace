"use client";
import { FormCheckbox } from "@/components/molecules/form-checkbox";
import { FormField } from "@/components/molecules/form-field";
import { Atoms } from "@kanvas/phoenix";
import { AuthFormHeader } from "./auth-form-header";
import { FormFieldProps } from "@/models/types/forms/form-field";

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
  isValid,
}: AuthFormProps) {
  return (
    <>
      {header && <AuthFormHeader title={header} />}
      <form
        onSubmit={onSubmit}
        className="rounded-md border border-default py-[50px] px-6 flex flex-col gap-10"
      >
        <h5 className="text-2xl font-bold text-white">{title}</h5>
        <div className="flex flex-col gap-3 w-[350px]">
          {Boolean(formFields.length) &&
            formFields.map((formFieldProps, i) => (
              <FormField key={`form-field-${i}`} {...formFieldProps} />
            ))}

          {(rememberMe || forgotPassword) && (
            <div className="flex justify-between items-center w-full">
              {rememberMe && (
                <FormCheckbox label={rememberMe.label} name="remember" />
              )}
              {forgotPassword && (
                <Atoms.Button.Link
                  type="button"
                  className="text-primary-100 py-[10px] px-0 text-sm font-normal"
                >
                  {forgotPassword.label}
                </Atoms.Button.Link>
              )}
            </div>
          )}

          <Atoms.Button.Solid
            type="submit"
            className="flex bg-primary-100 justify-center items-center py-[10px] px-[14px] rounded-md text-sm font-normal w-full disabled:opacity-70"
            disabled={isSubmitting || !isValid}
          >
            {submitButton.label}
          </Atoms.Button.Solid>
          {bottomSection && (
            <div className="flex items-center w-full justify-start text-sm font-normal">
              {bottomSection.text && <p>{bottomSection.text}</p>}
              <Atoms.Button.Link
                type="button"
                className="text-primary-100 py-[10px] px-[14px] text-sm font-normal"
              >
                {bottomSection.link.label}
              </Atoms.Button.Link>
            </div>
          )}
        </div>
      </form>
    </>
  );
}
