'use client';
import { useState } from 'react';

//components
import SectionHeaders from 'src/components/layout/SectionHeaders';
import MenuItem from 'src/components/menu/MenuItem';
import Image from 'next/image';

//redux
import { useGetMenuItemsQuery } from 'src/redux/services/menuItemApi';
import { IMenuItem } from 'src/interfaces';

const HomeMenu = () => {
  const { data: bestSellers } = useGetMenuItemsQuery();

  return (
    <section className="">
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image src={'/sallad1.png'} width={109} height={189} alt={'sallad'} />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image src={'/sallad2.png'} width={107} height={195} alt={'sallad'} />
        </div>
      </div>
      <div className="text-center mb-4">
        <SectionHeaders
          subHeader={'check out'}
          mainHeader={'Our Best Sellers'}
        />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {bestSellers &&
          bestSellers?.length > 0 &&
          bestSellers
            .slice(-3)
            .map((item: IMenuItem) => (
              <MenuItem key={item._id} menuItem={item} />
            ))}
      </div>
    </section>
  );
};
export default HomeMenu;
