'use client';
import { useState } from 'react';

//components
import SectionHeaders from 'src/components/layout/SectionHeaders';
import MenuItem from 'src/components/menu/MenuItem';
import { ICategory, IMenuItem } from 'src/interfaces';

//redux
import { useGetCategoriesQuery } from 'src/redux/services/categoryApi';
import { useGetMenuItemsQuery } from 'src/redux/services/menuItemApi';

const MenuPage = () => {
  const { data: categories } = useGetCategoriesQuery();
  const { data: menuItems } = useGetMenuItemsQuery();

  return (
    <section className="mt-8">
      {categories &&
        categories?.length > 0 &&
        categories.map((category: ICategory) => (
          <div key={category._id}>
            <div className="text-center">
              <SectionHeaders mainHeader={category.name} />
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
              {menuItems &&
                menuItems
                  .filter((item: IMenuItem) => item.category === category._id)
                  .map((item: IMenuItem) => (
                    <MenuItem key={item._id} menuItem={item} />
                  ))}
            </div>
          </div>
        ))}
    </section>
  );
};

export default MenuPage;
