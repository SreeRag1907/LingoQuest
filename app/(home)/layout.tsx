import { Footer } from "./footer";
import { Header } from "./header";

type Props = {
  children: React.ReactNode;
};
const HomeLayout = ({ children }: Props) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex flex-1 flex-col items-center justify-center'>
        {children}
      </main>
      <Footer/>
    </div>
  );
};

export default HomeLayout;
