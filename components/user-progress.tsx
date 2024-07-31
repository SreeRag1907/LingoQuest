import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";
import { courses } from "@/db/schema";

type Props = {
  activeCource: typeof courses.$inferSelect;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};
export const UserProgress = ({
  activeCource,
  hearts,
  points,
  hasActiveSubscription,
}: Props) => {
  return (
    <div className='flex items-center justify-between gap-x-2 w-full'>
      <Link href='/courses'>
        <Button variant='ghost'>
          <Image
            src={activeCource.imageSrc}
            alt={activeCource.title}
            width={50}
            height={50}
            className='rounded-md'
          />
        </Button>
      </Link>
      <Link href='/shop'>
        <Button variant='ghost' className='text-orange-500'>
          <Image
            src='/points.svg'
            alt='points'
            width={28}
            height={28}
            className='mr-2'
          />
          {points}
        </Button>
      </Link>
      <Link href='/shop'>
        <Button variant='ghost' className='text-rose-500'>
          <Image
            src='/heart.svg'
            alt='hearts'
            width={28}
            height={28}
            className='mr-2'
          />
          {hasActiveSubscription ? (
            <InfinityIcon className='stroke-[3]' />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
};
