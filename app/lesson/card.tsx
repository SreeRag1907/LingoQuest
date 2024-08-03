import { challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback } from "react";
import { useAudio } from "react-use";

type Props = {
  id: number;
  text: string;
  imageSrc: string | null;
  audioSrc: string | null;
  shortcut: string;
  selected?: boolean;
  onClick: () => void;
  status: "correct" | "wrong" | "none";
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)["type"];
  isCorrect?: boolean;
};

export const Card = ({
  id,
  text,
  imageSrc,
  audioSrc,
  shortcut,
  selected,
  onClick,
  status,
  disabled,
  type,
  isCorrect,
}: Props) => {
  const [audio, state, controls] = useAudio({ src: audioSrc || "" });

  const handleClick = useCallback(() => {
    if (disabled) return;

    controls.play();
    onClick();
  }, [disabled, onClick, controls]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 md:p-6 lg:p-8 cursor-pointer active:border-b-2",
        selected && "border-sky-500 bg-sky-100 hover:bg-sky-200",
        status === "correct" && isCorrect && "border-green-300 bg-green-100 hover:bg-green-200",
        status === "wrong" && selected && "border-rose-300 bg-rose-100 hover:bg-rose-200",
        disabled && "pointer-events-none hover:bg-white",
        type === "ASSIST" && "p-3 md:p-4 lg:p-6 w-full"
      )}
    >
      {audio}
      {imageSrc && (
        <div className="relative aspect-square mb-4 w-full">
          <Image
            src={imageSrc}
            alt={text}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}
      <div
        className={cn(
          "flex items-center justify-between",
          type === "ASSIST" && "flex-row-reverse"
        )}
      >
        {type === "ASSIST" && <div />}
        <p
          className={cn(
            "text-sm font-medium text-neutral-500 md:text-base lg:text-lg",
            selected && "text-sky-500",
            status === "correct" && isCorrect && "text-green-500",
            status === "wrong" && selected && "text-rose-500"
          )}
        >
          {text}
        </p>
        <div
          className={cn(
            "w-[20px] h-[20px] md:w-[25px] md:h-[25px] lg:w-[30px] lg:h-[30px] border-2 flex items-center justify-center rounded-md p-2 text-neutral-700 md:text-[13px] lg:text-[15px] text-sm font-semibold",
            selected && "border-sky-300 text-sky-500",
            status === "correct" && isCorrect && "border-green-500 text-green-500",
            status === "wrong" && selected && "border-rose-500 text-rose-500"
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  );
};
