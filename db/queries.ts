import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import {
  challengeProgress,
  courses,
  lessons,
  units,
  userProgress,
  userSubscription,
} from "@/db/schema";

// Fetches all courses from the database and caches the result
export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();
  return data;
});

// Fetches all units for the active course of the current user and caches the result
export const getUnits = cache(async () => {
  // Get the user ID from authentication
  const { userId } = auth();
  // Get the user's progress including their active course
  const userProgress = await getUserProgress();

  // If no user ID or active course, return an empty array
  if (!userId || !userProgress?.activeCourseId) {
    return [];
  }

  // Fetch units for the active course and include lessons with challenges and their progress
  const data = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  // Normalize data to include completed status for lessons
  const normalizedData = data.map((unit) => {
    const lessonWithCompletedStatus = unit.lessons.map((lesson) => {
      // Check if all challenges are completed
      if (lesson.challenges.length === 0) {
        return { ...lesson, completed: false };
      }
      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return (
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed)
        );
      });
      return { ...lesson, completed: allCompletedChallenges };
    });
    return { ...unit, lessons: lessonWithCompletedStatus };
  });

  return normalizedData;
});

// Fetches the progress of the current user and caches the result
export const getUserProgress = cache(async () => {
  // Get the user ID from authentication
  const { userId } = await auth();

  // If no user ID, return null
  if (!userId) {
    return null;
  }

  // Fetch the user's progress including their active course
  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });

  return data;
});

// Fetches a specific course by its ID and caches the result
export const getCourseById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    with: {
      units: {
        orderBy: (units, { asc }) => [asc(units.order)],
        with: {
          lessons: {
            orderBy: (lessons, { asc }) => [asc(lessons.order)],
          },
        },
      },
    },
  });

  return data;
});

// Fetches the progress of the current user's active course and caches the result
export const getCourseProgress = cache(async () => {
  // Get the user ID from authentication
  const { userId } = await auth();
  // Get the user's progress including their active course
  const userProgress = await getUserProgress();

  // If no user ID or active course, return null
  if (!userId || !userProgress?.activeCourseId) {
    return null;
  }

  // Fetch units and lessons for the active course, including their challenges and progress
  const unitsInActiveCourse = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          unit: true,
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  // Find the first lesson that has uncompleted challenges
  const firstUnCompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) => {
      return lesson.challenges.some((challenge) => {
        return (
          !challenge.challengeProgress ||
          challenge.challengeProgress.length === 0 ||
          challenge.challengeProgress.some(
            (progress) => progress.completed === false
          )
        );
      });
    });

  return {
    activeLesson: firstUnCompletedLesson,
    activeLessonId: firstUnCompletedLesson?.id,
  };
});

// Fetches a specific lesson by its ID or the current active lesson ID, and caches the result
export const getLesson = cache(async (id?: number) => {
  // Get the user ID from authentication
  const { userId } = await auth();
  // If no user ID, return null
  if (!userId) {
    return null;
  }

  // Get the user's active course progress
  const courseProgress = await getCourseProgress();

  // Determine the lesson ID, defaulting to the active lesson ID if none provided
  const lessonId = id || courseProgress?.activeLessonId;

  // If no lesson ID, return null
  if (!lessonId) {
    return null;
  }

  // Fetch the lesson including its challenges and their progress
  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  });

  // If no data or challenges, return null
  if (!data || !data.challenges) {
    return null;
  }

  // Normalize challenges to include their completion status
  const normalizedChallenges = data.challenges.map((challenge) => {
    const completed =
      challenge.challengeProgress &&
      challenge.challengeProgress.length > 0 &&
      challenge.challengeProgress.every((progress) => progress.completed);
    return { ...challenge, completed };
  });

  return { ...data, challenges: normalizedChallenges };
});

export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress();
  if (!courseProgress?.activeLessonId) {
    return 0;
  }

  const lesson = await getLesson(courseProgress.activeLessonId);
  if (!lesson) {
    return 0;
  }

  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed
  );
  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100
  );

  return percentage;
});

const DAY_IN_MS = 86_400_000;
export const getUserSubscription = cache(async () => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }
  const data = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, userId),
  });
  if (!data) return null;
  const isActive =
    data.stripePriceId &&
    data.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return {
    ...data,
    isActive: !!isActive,
  };
});



export const getTopTenUsers = cache(async () => {
  const { userId } = await auth();


  if (!userId) {
    return [];
  }
  const data = await db.query.userProgress.findMany({
    orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
    limit: 10,
    columns: {
      userId: true,
      userName: true,
      userImageSrc: true,
      points: true,
    },
  });
  return data;
});
