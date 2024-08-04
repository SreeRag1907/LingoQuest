import FeedWrapper from "@/components/feed-wrapper";
import MobileHeader from "@/components/mobile-header";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import StickyWrapper from "@/components/sticky-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { UserProgress } from "@/components/user-progress";
import {
  getTopTenUsers,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";

const LeaderboardPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const topTenUsersData = getTopTenUsers();

  const [userProgress, userSubscription, topTenUsers] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    topTenUsersData,
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
        <Quests points={userProgress.points}/>

      </StickyWrapper>
      <FeedWrapper>
        <div className='w-full flex flex-col items-center'>
          <Image
            src='/leaderboard.svg'
            alt='leaderboard'
            width={90}
            height={90}
          />
          <h1 className='text-center font-bold text-neutral-700 text-3xl py-4'>
            Leaderboard
          </h1>
          <p className='text-center text-bold text-xl text-gray-600 py-2'>
            See where you stand among other learners in the community.
          </p>
          <Separator className='mb-4 h-0.5 rounded-full' />
          {topTenUsers?.map((user, index) => (
            <div
              key={user.userId}
              className='flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50'
            >
              <p className='font-bold text-lime-700 mr-4'>{index + 1}</p>
              <Avatar className='border bg-green-500 h-12 w-12 ml-3 mr-6'>
                <AvatarImage
                  className='object-cover'
                  src={user.userImageSrc}
                  alt={user.userName}
                />
              </Avatar>
              <p
                className='
                font-bold text-lime-700 flex-1'
              >
                {user.userName}
              </p>
              <p
                className='
                font-bold text-lime-700 '
              >
                {user.points} XP
              </p>
            </div>
          ))}
        </div>
      </FeedWrapper>
    </div>
    </>
  );
};

export default LeaderboardPage;
