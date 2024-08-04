import React from 'react';
import MobileSidebar from "./mobile-sidebar";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";
import { courses } from "@/db/schema";

type Props = {
  activeCourse: typeof courses.$inferSelect | null;
  points: number;
  hearts: number;
  hasActiveSubscription: boolean;
};

const MobileHeader: React.FC<Props> = ({
  activeCourse,
  points,
  hearts,
  hasActiveSubscription,
}) => {
  return (
    <nav className='lg:hidden px-6 h-[50px] flex items-center bg-green-500 border-b fixed top-0 w-full z-50'>
      <MobileSidebar />
      <div className='flex items-center justify-end bg-white rounded-xl gap-x-2 w-full'>
        <Link href='/courses'>
          <Button variant='ghost'>
            {activeCourse && (
              <Image
                src={activeCourse.imageSrc}
                alt={activeCourse.title}
                width={50}
                height={50}
                className='rounded-md'
              />
            )}
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
    </nav>
  );
};

export default MobileHeader;
