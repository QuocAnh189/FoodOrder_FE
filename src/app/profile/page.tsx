'use client';
//chakra
import { Box, Skeleton } from '@chakra-ui/react';
import { useEffect } from 'react';

//components
import UserForm from 'src/components/layout/UserForm';
import UserTabs from 'src/components/layout/UserTabs';

//redux
import { useAppSelector, useAppDispatch } from 'src/redux/hooks';
import { useGetUserQuery } from 'src/redux/services/userApi';
import { updateUserInfo } from 'src/redux/slices/authSlice';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.authData?.user._id);

  const { data: user, isLoading } = useGetUserQuery(userId!);

  useEffect(() => {
    if (user) {
      dispatch(updateUserInfo(user?.info!));
    }
  }, [user]);

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <section className="mt-8">
      {user && (
        <Box>
          <UserTabs isAdmin={user?.info.role === 'ADMIN'} />
          <Box className="max-w-2xl mx-auto mt-8">
            <UserForm user={user} />
          </Box>
        </Box>
      )}
    </section>
  );
};

export default ProfilePage;
