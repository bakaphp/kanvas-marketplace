'use client';
import { customTheme } from '@/theme/theme.phoenix';
import { Atoms, Molecules } from '@kanvas/phoenix';
import { translate } from '@/translate';
import { UserData } from '@kanvas/core';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { updateUserData } from '@/models/api/update-user-data';
import toast, { Toaster } from 'react-hot-toast';
import { useAtom } from 'jotai/react';
import { userProfile } from '@/models/state/profile';
const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
};

const validationSchema = yup.object().shape({
  firstname: yup.string(),
  lastname: yup.string(),
  email: yup.string().email().optional(),
});

function useProfileForm(profile?: UserData) {
  const [user, setUser] = useAtom(userProfile);
  async function onSubmit(values: typeof initialValues) {
    try {
      await updateUserData(profile?.id!, {
        firstname: values.firstname,
        lastname: values.lastname,
      });
      toast.success(translate('general.userUpdated'));
    } catch (err) {
      toast.error(translate('general.userUpdateFailed'));
      console.log(err);
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
    setValues,
  } = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    setValues({
      email: profile?.email!,
      firstname: profile?.firstname!,
      lastname: profile?.lastname!,
    });
    if (!user) {
      setUser(profile!);
    }
  }, [profile]);

  return {
    models: {
      values,
      touched,
      isSubmitting,
      errors,
    },
    operations: {
      handleSubmit,
      handleChange,
    },
  };
}
export default function ProfileForm({ profile }: { profile?: UserData }) {
  const { models, operations } = useProfileForm(profile);

  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <div className='flex-1 p-6'>
        <section className='mt-4'>
          {false ? (
            <Atoms.Icons.Spinner size={50} />
          ) : (
            <div className='grid grid-cols-6 gap-4'>
              <div className='border-2 rounded-lg  col-span-4'>
                <div className='m-5'>
                  <Atoms.Body.One>
                    {translate('user-overview.title')}
                  </Atoms.Body.One>
                  <Atoms.Body.Two className='pt-3'>
                    {translate('user-overview.picture')}
                  </Atoms.Body.Two>
                  <Molecules.Profile
                    Size='large'
                    name={profile?.firstname}
                    // @ts-ignore
                    src={profile?.photo?.url}
                  />
                  <form
                    className='space-y-5'
                    onSubmit={operations.handleSubmit}
                  >
                    <div className='flex flex-col  pt-9'>
                      <Molecules.Form.TextInput
                        label={translate('form.last-name-label')}
                        id='lastname'
                        theme={{
                          ...customTheme.textInput,
                          container:
                            'flex flex-col gap-[6px] font-normal text-caption-md w-full',
                        }}
                        className='w-full bg-background-100 border-[#374151] placeholder:text-white'
                        value={models.values.lastname}
                        onChange={operations.handleChange}
                        helpText={models.errors.lastname}
                        error={!!models.errors.lastname}
                      />
                      <Molecules.Form.TextInput
                        label={translate('form.first-name-label')}
                        id='firstname'
                        theme={{
                          ...customTheme.textInput,
                          container:
                            'flex flex-col gap-[6px] font-normal text-caption-md w-full',
                        }}
                        className='w-full bg-background-100 border-[#374151] placeholder:text-white'
                        value={models.values.firstname}
                        onChange={operations.handleChange}
                        helpText={models.errors.firstname}
                        error={!!models.errors.firstname}
                      />
                    </div>
                    <Molecules.Form.TextInput
                      label={translate('form.email-label')}
                      id='email'
                      theme={{
                        ...customTheme.textInput,
                        container:
                          'flex flex-col gap-[6px] font-normal text-caption-md w-full',
                      }}
                      value={models.values.email}
                      className=' bg-background-100 border-[#374151] placeholder:text-white disabled:bg-background-100'
                      disabled
                      onChange={operations.handleChange}
                      helpText={models.errors.email}
                      error={!!models.errors.email}
                    />
                    <div className='mt-5 sm:mt-[74px] sm:flex sm:flex-row-reverse gap-x-3'>
                      <Atoms.Button.Solid
                        type='submit'
                        className='bg-base-primary-80'
                      >
                        <Atoms.Icons.Plus size={20} />
                        {translate('general.update')}
                      </Atoms.Button.Solid>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
