import { getLessonPubliclyById } from '@/lib/api/getAllLessons';
import React from 'react';
export const generateMetadata = async ({ params }) => {
  const { id } = await params;
    const lesson = await getLessonPubliclyById(id);

  return {
    title: `LifeAtlas- ${lesson.title}`,
  };
};
const layout = ({children}) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default layout;