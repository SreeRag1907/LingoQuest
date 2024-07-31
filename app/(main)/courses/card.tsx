import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import Image from "next/image";

type Props = {
  id: number;
  title: string;
  imageSrc: string;
  active: boolean;
  disabled: boolean;
  onClick: (id: number) => void;
};

export const Card = ({
  id,
  title,
  imageSrc,
  active,
  disabled,
  onClick,
}: Props) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "h-full border-2 rounded-xl border-b-[8px] hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px]",
        disabled && "pointer-events-none opacity-50"
      )}
    >
        <div className="min-[24px] w-full flex items-center justify-end">
            {active && (
                <div className="rounded-md bg-green-500 flex items-center justify-center p-1.5">
                    
                <CheckIcon className="text-white stroke-[4] p-1 "/>
                </div>
            )}
        </div>
        <Image
          className="rounded-lg shadow-md border object-cover"
          src={imageSrc}
          alt={title}
          height={70}
          width={93.33}
        />
        <p className="text-2xl text-center mt-3 font-bold">{title}</p>
    </div>
  );
};
