"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {  } from "@/store/use-exit-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { UseHeartsModal } from "@/store/hearts-modal";

export const HeartsModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const { isOpen, close } = UseHeartsModal();

  useEffect(() => setIsClient(true), []);

  const onClick = () => {
    close();
    router.push("/store");
  };

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='max-w-md p-6'>
        <DialogHeader>
          <div className='flex items-center justify-center w-full mb-4'>
            <Image
              src='/mascot_bad.svg'
              alt='sad'
              width={120}
              height={120}
              className='mx-auto'
            />
          </div>
          <DialogTitle className='text-center font-bold text-2xl text-gray-800'>
            You ran out of Hearts!
          </DialogTitle>
          <DialogDescription className='text-center text-gray-600 mt-2'>
            Get PRO for unlimited Hearts, or purchase them in the store..!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className=' mb-4'>
          <div className='flex flex-col gap-y-4 w-full'>
            <Button
              variant='primary'
              className='w-full'
              size='lg'
              onClick={onClick}
            >
              Get Unlimited Hearts
            </Button>
            <Button
              variant='primaryOutline'
              className='w-full'
              size='lg'
              onClick={close}
            >
              No thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
