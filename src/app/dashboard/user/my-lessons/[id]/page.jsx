import { getServerSession } from "@/lib/core/session";
import UpdateLessonForm from "./updateLessonForm";
import { getLessonById } from "@/lib/api/getAllLessons";


export default async function Page({ params }) {
  const {id}=await params
  // console.log(id)
  const userData= await getServerSession()
  // console.log(userData)
  const lesson=await getLessonById(id)
  console.log(lesson)
  return <UpdateLessonForm id={id} lesson={lesson} user={userData} />;
}