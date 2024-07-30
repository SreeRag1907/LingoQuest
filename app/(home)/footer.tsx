import { Button } from "@/components/ui/button"
import Image from "next/image"

export const Footer =()=>{
    return(
        <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-xl mx-auto flex items-center justify-evenly h-full">
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src='/fr(France).svg' height={32} width={40} alt="France" className="mr-4 rounded-md"/>
                    French
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src='/es(Spain).svg' height={32} width={40} alt="Spain" className="mr-4 rounded-md"/>
                    Spanish
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src='/hr(Crotia).svg' height={32} width={40} alt="Crotia" className="mr-4 rounded-md"/>
                    Croatian
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src='/it(Italy).svg' height={32} width={40} alt="Italy" className="mr-4 rounded-md"/>
                    Italian
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src='/jp(Jpan).svg' height={32} width={40} alt="Japan" className="mr-4 rounded-md"/>
                    Japanese
                </Button>
            </div>
        </footer>
    )
}