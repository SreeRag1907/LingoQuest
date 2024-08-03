import MobileHeader from "@/components/mobile-header";
import { Sidebar } from "@/components/Sidebar";

type Props = {
  children: React.ReactNode;
};

const MainPage = ({ children }: Props) => {
  return (
    <div className='h-screen flex flex-col'>
      <div className='bg-green-100/70 flex-1'>
        <MobileHeader />
        <Sidebar className='hidden lg:flex' />
        <main className='lg:pl-[256px] pt-[50px] lg:pt-0'>
          <div className='max-w-[1256px] bg-white mx-auto pt-6 h-full'>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainPage;
