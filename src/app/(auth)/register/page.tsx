'use client';
import { FormikHelpers, useFormik } from 'formik';
import * as yup from 'yup';
import AuthForm from '@/components/organism/auth-form';
import { useRouter } from 'next/navigation';
import { translate } from '@/translate';
import { register } from '@/models/api/register';

const validationSchema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  passwordConfirmation: yup.string().required(),
});

type RegisterFormValues = yup.InferType<typeof validationSchema>;

const initialValues: RegisterFormValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

function useRegisterPage() {
  const router = useRouter();

  async function onSubmit(
    data: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>,
  ) {
    try {
      const result = await register(data);
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

export default function RegisterPage() {
  const {
    models: { isValid, isSubmitting, values, errors, touched },
    operations: { handleBlur, handleChange, handleSubmit },
  } = useRegisterPage();

  return (
    <main className='flex flex-col gap-[50px] items-center'>
      <AuthForm
        header={translate('register.title')}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        title={translate('register.form.title')}
        formFields={[
          {
            label: translate('register.form.firstname.label'),
            placeholder: translate('register.form.firstname.placeholder'),
            name: 'firstname',
            type: 'firstname',
            value: values.firstname,
            error: errors.firstname,
            onChange: handleChange,
            onBlur: handleBlur,
          },
          {
            label: translate('register.form.lastname.label'),
            placeholder: translate('register.form.lastname.placeholder'),
            name: 'lastname',
            type: 'lastname',
            value: values.lastname,
            error: errors.lastname,
            onChange: handleChange,
            onBlur: handleBlur,
          },
          {
            label: translate('register.form.email.label'),
            placeholder: translate('register.form.email.placeholder'),
            name: 'email',
            type: 'email',
            value: values.email,
            error: errors.email,
            onChange: handleChange,
            onBlur: handleBlur,
          },
          {
            label: translate('register.form.password.label'),
            placeholder: translate('register.form.password.placeholder'),
            name: 'password',
            type: 'password',
            value: values.password,
            error: errors.password,
            onChange: handleChange,
            onBlur: handleBlur,
          },
          {
            label: translate('register.form.passwordConfirmation.label'),
            placeholder: translate(
              'register.form.passwordConfirmation.placeholder',
            ),
            name: 'passwordConfirmation',
            type: 'password',
            value: values.passwordConfirmation,
            error: errors.passwordConfirmation,
            onChange: handleChange,
            onBlur: handleBlur,
          },
        ]}
        submitButton={{ label: translate('register.form.submit') }}
        bottomSection={{
          text: translate('register.form.haveAccount'),
          link: {
            href: '/signin',
            label: translate('register.form.signIn'),
          },
        }}
      />
    </main>
  );
}
