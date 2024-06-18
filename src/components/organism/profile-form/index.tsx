'use client';
import { customTheme } from '@/theme/theme.phoenix';
import { Atoms, Molecules } from '@kanvas/phoenix';
import { translate } from '@/translate';
import { UserData } from '@kanvas/core';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { updateUserData } from '@/models/api/update-user-data';
// import toast, { Toaster } from 'react-hot-toast';
import { useToast } from '@kanvas/phoenix-rebirth/dist/components/base/use-toast.mjs';
import { useAtom } from 'jotai/react';
import { userProfile } from '@/models/state/profile';
import { Show } from '@kanvas/phoenix-rebirth/dist/utils/server';
import { Button } from '@kanvas/phoenix-rebirth/dist/components/base/button';
import { Input } from '@kanvas/phoenix-rebirth/dist/components/base/input';
import { Label } from '@kanvas/phoenix-rebirth/dist/components/base/label.mjs';
import { PlusIcon } from '@kanvas/phoenix-rebirth/dist/components/icons';

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

  const { toast, toasts } = useToast();

  async function onSubmit(values: typeof initialValues) {
    try {
      await updateUserData(profile?.id!, {
        firstname: values.firstname,
        lastname: values.lastname,
      });

      toast({
        description: translate('general.userUpdated'),
      });
    } catch (err) {
      toast({
        description: translate('general.userUpdateFailed'),
        variant: 'destructive',
      });
      console.log(err);
    }
  }

  setInterval(() => {}, 1000);

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
      {/* <Toaster position='top-right' reverseOrder={false} /> */}
      <div className='flex-1 p-6'>
        <section className='mt-4'>
          <Show
            when={true}
            deps={[]}
            fallback={<Atoms.Icons.Spinner size={50} />}
          >
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
                    <div className='flex flex-col pt-5 space-y-3'>
                      {/* label={translate('form.last-name-label')} */}
                      {/* helpText={models.errors.lastname}
                        error={!!models.errors.lastname} */}
                      {/* label={translate('form.first-name-label')} */}

                      <div>
                        <Label id='firstname'>
                          {translate('form.first-name-label')}
                        </Label>
                        <Input
                          id='firstname'
                          value={models.values.firstname}
                          onChange={operations.handleChange}
                        />
                      </div>

                      <div>
                        <Label id='lastname'>
                          {translate('form.last-name-label')}
                        </Label>
                        <Input
                          id='lastname'
                          value={models.values.lastname}
                          onChange={operations.handleChange}
                        />
                      </div>

                      {/* helpText={models.errors.firstname}
                        error={!!models.errors.firstname} */}
                    </div>

                    <div>
                      <Label id='email'>{translate('form.email-label')}</Label>

                      <Input
                        id='email'
                        onChange={operations.handleChange}
                        value={models.values.email}
                        disabled
                      />
                      {/* helpText={models.errors.email}
                      error={!!models.errors.email} */}
                    </div>

                    <div className='mt-5 sm:mt-[74px] sm:flex sm:flex-row-reverse gap-x-3'>
                      <Button type='submit'>
                        <PlusIcon size={20} />
                        {translate('general.update')}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Show>
        </section>
      </div>
    </>
  );
}
