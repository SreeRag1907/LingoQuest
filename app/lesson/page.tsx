import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "./quiz";

const LessonPage = async () => {
  const userProgressData = getUserProgress();
  const lessonData = getLesson();

  const [userProgress, lesson] = await Promise.all([
    userProgressData,
    lessonData,
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initalPercentage = lesson.challenges
  .filter((challenge)=>challenge.completed)
  .length / lesson.challenges.length *100;


  return (
    <Quiz
    initialLessonId={lesson.id}
    initialPercentage={initalPercentage}
    initialLessonChallenges={lesson.challenges}
    initialHearts={userProgress.hearts}
    userSubscription={null}/>
  );
};

export default LessonPage;
