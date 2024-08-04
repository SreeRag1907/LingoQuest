import React from 'react';
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";
import { courses } from "@/db/schema";

type Props = {
  activeCourse: typeof courses.$inferSelect | null;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const UserProgress: React.FC<Props> = ({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
}) => {
  return (
    <div className='flex items-center justify-between gap-x-2 w-full'>
      {activeCourse && (
        <Link href='/courses'>
          <Button variant='ghost'>
            <Image
              src={activeCourse.imageSrc}
              alt={activeCourse.title}
              width={50}
              height={50}
              className='rounded-md'
            />
          </Button>
        </Link>
      )}
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
