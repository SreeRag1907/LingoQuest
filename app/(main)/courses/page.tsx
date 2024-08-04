import { getCourses, getUserProgress } from "@/db/queries";
import List from "./list";

const CoursePage = async () => {
  const courses = await getCourses();
  const userProgress = await getUserProgress();

  return (
    <div className='h-full max-w-[912px] px-3 mx-auto py-4'>
      <div className='mt-4 p-4 border-l-4 border-yellow-500 bg-yellow-100 text-yellow-800'>
        <h1 className='font-semibold'>
          *For now only Spanish and French are Active..!
        </h1>
      </div>
      <h1 className='text-2xl font-bold text-neutral-700'>Language Courses</h1>
      <List
        courses={courses}
        activeCourseId={userProgress?.activeCourseId}
      />
      
    </div>
  );
};

export default CoursePage;
