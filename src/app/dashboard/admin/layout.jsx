import { getServerSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';

const AdminLayoutPage =async ({children}) => {
 const user =await getServerSession();
  if(user?.role!=='admin'){
    redirect('/unauthorize')
  }
  return children
};

export default AdminLayoutPage;