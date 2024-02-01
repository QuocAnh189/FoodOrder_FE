'use client';

import { useState } from 'react';

//chakra
import { Box, Text } from '@chakra-ui/react';

//next
import Link from 'next/link';

//components
import Left from 'src/components/icons/Left';
import Right from 'src/components/icons/Right';
import EditableImage from 'src/components/layout/EditableImage';
import MenuItemForm from 'src/components/layout/MenuItemForm';
import UserTabs from 'src/components/layout/UserTabs';

//redux
import { useAppSelector } from 'src/redux/hooks';

const NewMenuItemPage = () => {
  const userinfo = useAppSelector(state => state.auth.authData?.user.info);

  return (
    <section className="mt-8">
      <UserTabs isAdmin={userinfo?.role === 'ADMIN'} />
      <Box className="max-w-2xl mx-auto mt-8">
        <Link href={'/menu-items'} className="button">
          <Left />
          <Text>Show all menu items</Text>
        </Link>
      </Box>
      <MenuItemForm menuItem={null} onSubmit={() => {}} />
    </section>
  );
};

export default NewMenuItemPage;
