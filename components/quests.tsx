import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Progress } from "./ui/progress";
import { quests } from "@/constants";

type Props = {
  points: number;
};
export const Quests = ({ points }: Props) => {
  return (
    <div className='border-2 rounded-xl p-4 space-y-4'>
      <div className='flex items-center justify-between w-full'>
        <h3 className='font-bold text-xl'>Quests</h3>
        <Link href='/quests'>
          <Button variant={"primaryOutline"}>View all</Button>
        </Link>
      </div>
      <ul className='w-full'>
        {quests.map((quest) => {
          const progress = (points / quest.value) * 100;

          return (
            <li
              className='flex items-center w-full p-4 gap-2'
              key={quest.title}
            >
              <Image src='/points.svg' alt='points' width={40} height={40} />
              <div className='flex flex-col gap-2 w-full'>
                <h2 className='text-neutral-800 text-base font-semibold'>
                  {quest.title}
                </h2>
                <Progress value={progress} className='h-2 bg-gray-200' />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
