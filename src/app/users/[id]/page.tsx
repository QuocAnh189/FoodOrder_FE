'use client';

import { useEffect, useState } from 'react';

//next
import { useParams } from 'next/navigation';

//components
import UserForm from 'src/components/layout/UserForm';
import UserTabs from 'src/components/layout/UserTabs';

//redux
import { useGetUserQuery } from 'src/redux/services/userApi';

const EditUserPage = () => {
  const { id } = useParams();
  const { data: user } = useGetUserQuery(id);

  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isAdmin={true} />
      <div className="mt-8">{user && <UserForm user={user!} />}</div>
    </section>
  );
};

export default EditUserPage;
