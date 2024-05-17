import { customTheme } from '@/theme/theme.phoenix';
import { Atoms, Molecules } from '@kanvas/phoenix';
import { translate } from '@/translate';
import { UserData } from '@kanvas/core';

export default function ProfileForm({ profile }: { profile?: UserData }) {
  return (
    <>
      <div className='flex-1 p-6'>
        <section className='mt-4'>
          {false ? (
            <Atoms.Icons.Spinner size={50} />
          ) : (
            <div className='grid grid-cols-6 gap-4'>
              <div className='border-[#374151] border-2 rounded-lg  col-span-4'>
                <div className='m-5'>
                  <Atoms.Body.One>
                    {translate('user-overview.title')}
                  </Atoms.Body.One>
                  <Atoms.Body.Two className='pt-3'>
                    {translate('user-overview.picture')}
                  </Atoms.Body.Two>
                  <Molecules.Profile
                    Size='large'
                    name={'R'}
                    // @ts-ignore
                    src={null}
                  />
                  <form
                    className='space-y-5'
                    action={async () => {
                      'use server';
                    }}
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
                        //   value={models.values.lastname}
                        //   onChange={operations.handleChange}
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
                        //   value={models.values.firstname}
                        //   onChange={operations.handleChange}
                      />
                    </div>
                    <Molecules.Form.TextInput
                      label={translate('form.display-name-label')}
                      theme={{
                        ...customTheme.textInput,
                        container:
                          'flex flex-col gap-[6px] font-normal text-caption-md w-full',
                      }}
                      id='displayname'
                      // value={models.values.displayname}
                      className=' bg-background-100 border-[#374151] placeholder:text-white'
                      // onChange={operations.handleChange}
                    />
                    <Molecules.Form.TextInput
                      label={translate('form.email-label')}
                      id='email'
                      theme={{
                        ...customTheme.textInput,
                        container:
                          'flex flex-col gap-[6px] font-normal text-caption-md w-full',
                      }}
                      // value={models.values.email}
                      className=' bg-background-100 border-[#374151] placeholder:text-white disabled:bg-background-100'
                      disabled
                      // onChange={operations.handleChange}
                    />
                    <div className='mt-5 sm:mt-[74px] sm:flex sm:flex-row-reverse gap-x-3'>
                      <Atoms.Button.Solid className='bg-base-primary-80'>
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
