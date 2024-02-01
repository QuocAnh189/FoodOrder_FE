'use client';
import { useState } from 'react';

//chakra
import { Avatar, Box, Flex, Stack, Text } from '@chakra-ui/react';

//next
import Link from 'next/link';

//components
import UserTabs from 'src/components/layout/UserTabs';

//redux
import { useGetUsersQuery } from 'src/redux/services/userApi';
import { useAppSelector } from 'src/redux/hooks';
import { IUser } from 'src/interfaces';

interface ItemsUserProps {
  user: IUser;
}
const ItemUser = (props: ItemsUserProps) => {
  const { user } = props;
  return (
    <Flex
      key={user._id}
      className="bg-gray-100 rounded-lg mb-2 p-1 px-4 items-center gap-4 justify-between"
    >
      <Flex className="items-center gap-2">
        <Avatar src={user.avatar} />
        <Stack className="text-gray-900">{<Text>{user.name}</Text>}</Stack>
      </Flex>
      <Box>
        <Text className="text-gray-500">{user.email}</Text>
      </Box>
      <Box>
        <Link className="button" href={'/users/' + user._id}>
          Edit
        </Link>
      </Box>
    </Flex>
  );
};

const UsersPage = () => {
  const userinfo = useAppSelector(state => state.auth.authData?.user.info);

  const { data: users, isLoading } = useGetUsersQuery();

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin={userinfo?.role === 'ADMIN'} />
      <div className="mt-8">
        {users &&
          users?.length > 0 &&
          users.map((user: IUser) => <ItemUser user={user} />)}
      </div>
    </section>
  );
};

export default UsersPage;
