'use client';

//next
import Link from 'next/link';
import { useParams } from 'next/navigation';

//components
import DeleteButton from 'src/components/DeleteButton';
import Left from 'src/components/icons/Left';
import EditableImage from 'src/components/layout/EditableImage';
import MenuItemForm from 'src/components/layout/MenuItemForm';
import UserTabs from 'src/components/layout/UserTabs';

//toast
import toast from 'react-hot-toast';
import { useGetMenuItemQuery } from 'src/redux/services/menuItemApi';

const EditMenuItemPage = () => {
  const { id } = useParams();

  const { data: menuItem } = useGetMenuItemQuery(id);

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={'/menu-items'} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      {menuItem && <MenuItemForm menuItem={menuItem} onSubmit={() => {}} />}
    </section>
  );
};

export default EditMenuItemPage;
