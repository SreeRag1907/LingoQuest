"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UseExitModal } from "@/store/use-exit-modal";
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

export const ExitModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const { isOpen, close } = UseExitModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='max-w-md p-6'>
        <DialogHeader>
          <div className='flex items-center justify-center w-full mb-4'>
            <Image
              src='/mascot_sad.svg'
              alt='sad'
              width={120}
              height={120}
              className='mx-auto'
            />
          </div>
          <DialogTitle className='text-center font-bold text-2xl text-gray-800'>
            Are you sure you want to leave?
          </DialogTitle>
          <DialogDescription className='text-center text-gray-600 mt-2'>
            You are about to leave the lesson. Are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className=' mb-4'>
          <div className='flex flex-col gap-y-4 w-full'>
            <Button
              variant='primary'
              className='w-full'
              size='lg'
              onClick={close}
            >
              Keep Learning
            </Button>
            <Button
              variant='dangerOutline'
              className='w-full'
              size='lg'
              onClick={() => {
                close();
                router.push("/learn");
              }}
            >
              Leave Lesson
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
