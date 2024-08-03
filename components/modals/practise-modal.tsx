"use client";
import { useEffect, useState } from "react";
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
import { UsePractiseModal } from "@/store/practise-modal";

export const PractiseModal = () => {
  const [isClient, setIsClient] = useState(false);

  const { isOpen, close } = UsePractiseModal();

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
              src='/heart.svg'
              alt='sad'
              width={100}
              height={100}
              className='mx-auto'
            />
          </div>
          <DialogTitle className='text-center font-bold text-2xl text-gray-800'>
            Practise Lesson
          </DialogTitle>
          <DialogDescription className='text-center text-gray-600 mt-2'>
            Use Practise lessons to regain hearts and points. You cannot loose
            hearts or points in practise lessons.
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
              I Understand..!
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
