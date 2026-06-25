import { getServerSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
export const metadata = {
  title: "LifeAtlas User Dashboard",
};

const UserLayoutPage =async ({children}) => {
 const user =await getServerSession();
  if(user?.role!=='user'){
    redirect('/unauthorize')
  }
  return children
};

export default UserLayoutPage;