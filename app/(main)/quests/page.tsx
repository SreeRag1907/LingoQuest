import FeedWrapper from "@/components/feed-wrapper";
import MobileHeader from "@/components/mobile-header";
import { Promo } from "@/components/promo";
import StickyWrapper from "@/components/sticky-wrapper";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import { UserProgress } from "@/components/user-progress";
import { quests } from "@/constants";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";


const QuestsPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <>
    <MobileHeader
        activeCourse={userProgress.activeCourse}
        points={userProgress.points}
        hearts={userProgress.hearts}
        hasActiveSubscription={isPro}
      />
    <div className='flex flex-row-reverse gap-[48px] px-6 '>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && <Promo />}
      </StickyWrapper>
      <FeedWrapper>
        <div className='w-full flex flex-col items-center'>
          <Image src='/quests.svg' alt='quests' width={90} height={90} />
          <h1 className='text-center font-bold text-neutral-800 text-3xl py-4'>
            Quests
          </h1>
          <p className='text-center font-semibold text-xl text-gray-700 py-2'>
            Complete quests by earning points.
          </p>

          <Separator className='mb-6 h-0.5 rounded-full ' />
          <ul className='w-full space-y-4'>

            {quests.map((quest) => {
              const progress = (userProgress.points / quest.value) * 100;

              return (
                <li
                  className='flex items-center w-full p-4 gap-4 bg-white shadow-md rounded-lg border border-gray-200'
                  key={quest.title}
                >
                  <Image
                    src='/points.svg'
                    alt='points'
                    width={60}
                    height={60}
                  />
                  <div className='flex flex-col gap-2 w-full'>
                    <h2 className='text-neutral-800 text-lg font-semibold'>
                      {quest.title}
                    </h2>
                    <Progress value={progress} className='h-4 bg-gray-200' />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
    </>
  );
};

export default QuestsPage;
