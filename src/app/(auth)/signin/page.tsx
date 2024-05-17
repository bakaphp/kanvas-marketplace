"use client";
import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";
import AuthForm from "@/components/organism/auth-form";
import { useRouter } from "next/navigation";
import { login } from "@/models/api/login";

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

type SignInFormValues = yup.InferType<typeof validationSchema>;

const initialValues: SignInFormValues = {
  email: "",
  password: "",
};

function useSignInPage() {
  const router = useRouter();

  async function onSubmit(
    { email, password }: SignInFormValues,
    { setSubmitting }: FormikHelpers<SignInFormValues>
  ) {
    try {
      await login(email, password);
      router.push("/search");
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    values,
    touched,
    isSubmitting,
    isValid,
  } = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit,
  });

  return {
    models: {
      isValid,
      isSubmitting,
      values,
      errors,
      touched,
    },
    operations: {
      handleBlur,
      handleChange,
      handleSubmit,
    },
  };
}

export default function SignInPage() {
  const {
    models: { isValid, isSubmitting, values, errors, touched },
    operations: { handleBlur, handleChange, handleSubmit },
  } = useSignInPage();
  return (
    <main className="flex flex-col gap-[50px] items-center">
      <AuthForm
        header="Sign in to your account"
        isValid={isValid}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        title="Sign in"
        formFields={[
          {
            label: "Email",
            placeholder: "Add your email",
            name: "email",
            type: "email",
            value: values.email,
            error: errors.email && touched.email ? errors.email : undefined,
            onChange: handleChange,
            onBlur: handleBlur,
          },
          {
            label: "Password",
            placeholder: "Add your password",
            name: "password",
            type: "password",
            value: values.password,
            error:
              errors.password && touched.password ? errors.password : undefined,
            onChange: handleChange,
            onBlur: handleBlur,
          },
        ]}
        submitButton={{ label: "Login" }}
        bottomSection={{
          text: "Don't have an account?",
          link: {
            href: "/",
            label: "Sign up",
          },
        }}
        forgotPassword={{
          href: "/",
          label: "Forgot your password?",
        }}
        rememberMe={{
          label: "Remember me",
        }}
      />
    </main>
  );
}
