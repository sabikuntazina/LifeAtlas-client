import { getServerSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
export const metadata = {
  title: "LifeAtlas Admin Dashboard",
};

const AdminLayoutPage =async ({children}) => {
 const user =await getServerSession();
  if(user?.role!=='admin'){
    redirect('/unauthorize')
  }
  return children
};

export default AdminLayoutPage;