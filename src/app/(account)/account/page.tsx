import ProfileForm from '@/components/organism/profile-form';
import { app } from '@/models/services/kanvas';

async function useAccountPage() {
  const user = await app.users.getUserData();
  return {
    models: {
      user,
    },
  };
}
export default async function AccountPage() {
  const { models } = await useAccountPage();
  return (
    <>
      <ProfileForm />
    </>
  );
}
