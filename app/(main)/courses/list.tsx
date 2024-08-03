"use client";
import { courses, userProgress } from "@/db/schema";
import { Card } from "./card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserprogress } from "@/actions/user-progress";
import toast from "react-hot-toast";

type Props = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export default function List({ courses, activeCourseId }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = async (id: number) => {
    if (pending) return;

    if (id === activeCourseId) {
      router.push("/learn");
      return;
    }

    startTransition(() => {
      upsertUserprogress(id)
        .then(() => {
          router.push("/learn");
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
  };

  return (
    <div className=" py-5 pt-6 gap-4 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          active={course.id === activeCourseId}
          disabled={pending}
          onClick={onClick}
        />
      ))}
    </div>
  );
}
