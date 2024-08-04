import React from "react";
import MobileSidebar from "./mobile-sidebar";
import { UserProgress } from "./user-progress";
import { courses } from "@/db/schema"; // Adjust the import based on where courses is defined

type Props = {
  activeCourse: typeof courses.$inferSelect | null;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const MobileHeader = ({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
 }: Props) => {
  return (
    <nav className='lg:hidden px-6 h-[50px] flex items-center justify-between bg-green-500 border-b fixed top-0 w-full z-50'>
      <MobileSidebar />
      <div className="flex justify-end bg-white rounded-xl  border-2">

      <UserProgress
        activeCourse={activeCourse}
        hearts={hearts}
        points={points}
        hasActiveSubscription={hasActiveSubscription}
        />
        </div>
    </nav>
  );
};

export default MobileHeader;
