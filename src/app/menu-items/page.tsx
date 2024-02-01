'use client';
import { useState } from 'react';

//chakra
import { Text, Box } from '@chakra-ui/react';

//components
import Right from 'src/components/icons/Right';
import UserTabs from 'src/components/layout/UserTabs';

//next
import Image from 'next/image';
import Link from 'next/link';

//redux
import { useGetMenuItemsQuery } from 'src/redux/services/menuItemApi';
import { IMenuItem } from 'src/interfaces';

const MenuItemsPage = () => {
  const { data: menuItems } = useGetMenuItemsQuery();

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <Box className="mt-8">
        <Link className="button flex" href={'/menu-items/new'}>
          <Text>Crete new menu item</Text>
          <Right />
        </Link>
      </Box>
      <Box>
        <Text className="text-sm text-gray-500 mt-8">Edit menu item:</Text>
        <Box className="grid grid-cols-3 gap-2">
          {menuItems &&
            menuItems?.length > 0 &&
            menuItems.map((item: IMenuItem) => (
              <Link
                key={item._id}
                href={'/menu-items/edit/' + item._id}
                className="bg-gray-200 rounded-lg p-4"
              >
                <Box className="relative">
                  <Image
                    className="rounded-md h-[180px] w-[200px] object-cover"
                    src={
                      item.image
                        ? item.image
                        : 'https://res.cloudinary.com/dadvtny30/image/upload/v1706669140/foodorder/menuitem/gz16qwknqddqqvvnontw.jpg'
                    }
                    alt={''}
                    width={200}
                    height={200}
                  />
                </Box>
                <Box className="text-center mt-2">{item.name}</Box>
              </Link>
            ))}
        </Box>
      </Box>
    </section>
  );
};

export default MenuItemsPage;
