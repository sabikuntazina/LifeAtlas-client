import { getMyLessonsInProfile } from '@/lib/action/lessons';
import { getServerSession } from '@/lib/core/session';
import React from 'react';
import ProfilePageAction from './ProfilePageAction';
import MyLessonsInProfile from './MyLessonsInProfile';

const Profile =async () => {
  const user = await getServerSession();
   const myLessons= await getMyLessonsInProfile(user?.id);
  return (
    <div>
      <ProfilePageAction user={user} ></ProfilePageAction>
      <MyLessonsInProfile user={user} lessons={myLessons} ></MyLessonsInProfile>
    </div>
  );
};

export default Profile;