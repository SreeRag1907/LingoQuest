import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export const Promo = () => {
  return (
    <div className='border-2 rounded-xl p-4 space-y-4'>
      <div className='space-y-4'>
        <div className='flex items-center gap-x-2'>
          <Image src='/unlimited.svg' alt='Pro' width={28} height={28} />
          <h3 className='font-bold text-lg'>Upgrade to PRO</h3>
        </div>
        <p>Upgrade to PRO and get unlimited Hearts.</p>
      </div>

      <Button variant='super' className='w-full' asChild>
        <Link href='/shop'>Upgrade today!</Link>
      </Button>
    </div>
  );
};
