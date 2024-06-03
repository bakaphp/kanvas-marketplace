'use client';
import { FormikHelpers, useFormik } from 'formik';
import * as yup from 'yup';
import AuthForm from '@/components/organism/auth-form';
import { useRouter } from 'next/navigation';
import { login } from '@/models/api/login';
import { translate } from '@/translate';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

type SignInFormValues = yup.InferType<typeof validationSchema>;

const initialValues: SignInFormValues = {
  email: '',
  password: '',
};

function useSignInPage() {
  const router = useRouter();

  async function onSubmit(
    { email, password }: SignInFormValues,
    { setSubmitting }: FormikHelpers<SignInFormValues>,
  ) {
    try {
      const result = await login(email, password);
      if (!result.success) throw new Error(result.message);
      router.push('/account');
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
    <main className='flex flex-col gap-[50px] items-center'>
      <AuthForm
        header={translate('signin.title')}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        title={translate('signin.form.title')}
        formFields={[
          {
            label: translate('signin.form.email.label'),
            placeholder: translate('signin.form.email.placeholder'),
            name: 'email',
            type: 'email',
            value: values.email,
            error: errors.email,
            onChange: handleChange,
            onBlur: handleBlur,
          },
          {
            label: translate('signin.form.password.label'),
            placeholder: translate('signin.form.password.placeholder'),
            name: 'password',
            type: 'password',
            value: values.password,
            error: errors.password,
            onChange: handleChange,
            onBlur: handleBlur,
          },
        ]}
        submitButton={{ label: translate('signin.form.submit') }}
        bottomSection={{
          text: translate('signin.form.noAccount'),
          link: {
            href: '/register',
            label: translate('signin.form.signUp'),
          },
        }}
        forgotPassword={{
          href: '/',
          label: translate('signin.form.forgotPassword'),
        }}
        rememberMe={{
          label: translate('signin.form.rememberMe'),
        }}
      />
    </main>
  );
}
