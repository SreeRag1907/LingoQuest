import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Items } from "./items";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import MobileHeader from "@/components/mobile-header";

const ShopPage = async () => {
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
    
      <div className='flex flex-row-reverse gap-[48px] px-6 mt-[56px]'> {/* Added mt-[56px] to account for the fixed header */}
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
            <Image src='/shop.svg' alt='shop' width={90} height={90} />
            <h1 className='text-center font-bold text-neutral-700 text-3xl'>
              Shop
            </h1>
            <p className='text-center text-bold text-xl text-gray-600'>
              Spend your Points on cool stuff..
            </p>
            <Items
              hearts={userProgress.hearts}
              points={userProgress.points}
              hasActiveSubscription={isPro}
            />
          </div>
        </FeedWrapper>
      </div>
    </>
  );
};

export default ShopPage;