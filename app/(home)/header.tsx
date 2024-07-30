import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  return (
    <header className='h-20 w-full border-b-2 border-slate-200 px-4'>
      <div className='lg:max-w-screen-xl mx-auto flex items-center justify-between h-full'>
        <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
          <Image src='/mascot.svg' height={50} width={50} alt='logo' />
          <h1 className='text-3xl font-extrabold text-green-500 tracking-wide'>
            LingoQuest
          </h1>
        </div>
        <ClerkLoading>
          <Loader className='h-5 w-5 text-muted-foreground animate-spin' />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode='modal'>
                <Button size="lg" variant="ghost">
                    Login
                </Button>
            </SignInButton>

          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
};
