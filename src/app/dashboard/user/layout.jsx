import { getServerSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

const UserLayoutPage =async ({children}) => {
 const user =await getServerSession();
  if(user?.role!=='user'){
    redirect('/unauthorize')
  }
  return children
};

export default UserLayoutPage;