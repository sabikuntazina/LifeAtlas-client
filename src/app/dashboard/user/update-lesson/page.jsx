import { getServerSession } from "@/lib/core/session";
import UpdateLessonForm from "../my-lessons/[id]/updateLessonForm";

export default async function Page({ params }) {
  const userData= await getServerSession()
  return <UpdateLessonForm id={params.id} userData={userData} />;
}