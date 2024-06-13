'use client';
import ProfileForm from '@/components/organism/profile-form';
import { app } from '@/models/services/kanvas';
import { useAsync } from 'react-use';
function useAccountPage() {
  const user = useAsync(async () => {
    const res = await app.users.getUserData();
    return res;
  }, []);
  return {
    models: {
      user,
    },
  };
}
export default function AccountPage() {
  const { models } = useAccountPage();
  return (
    <>
      <ProfileForm profile={models.user?.value ?? undefined} />
    </>
  );
}
