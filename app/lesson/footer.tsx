import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";
import { useKey, useMedia } from "react-use";

type Props = {
  onCheck: () => void;
  status: "correct" | "wrong" | "none" | "completed";
  lessonId?: boolean;
  disabled?: boolean;
};

export const Footer = ({ onCheck, status, lessonId, disabled }: Props) => {
    const key = useKey("Enter", onCheck , {} , [onCheck]);
  const isMobile = useMedia("(max-width: 1024px)");

  return (
    <footer
      className={cn(
        "lg:h-[140px] h-[100px] border-t-2",
        status === "correct" && "border-transparent bg-green-100",
        status === "wrong" && "border-transparent bg-red-100"
      )}
    >
      <div className='max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10'>
        {status === "correct" && (
            <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
                <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4"/>
                Correct Answer. Nicely done..!
            </div>
        )}
        {status === "wrong" && (
            <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
                <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4"/>
                Oops... Try Again..!
            </div>
        )}
        {status === "completed" && (
            <Button variant="default" 
            size={isMobile ? "sm" : "lg"}
            onClick={()=> window.location.href = `/lesson/${lessonId}`}>
                Practise Again
            </Button>
        )}
        <Button
          disabled={disabled}
          className='ml-auto'
          onClick={onCheck}
          size={isMobile ? "sm" : "lg"}
          variant={status === "wrong" ? "danger" : "secondary"}
        >
          {status === "none" && "Check"}
          {status === "correct" && "Next"}
          {status === "wrong" && "Retry"}
          {status === "completed" && "Continue"}
        </Button>
      </div>
    </footer>
  );
};
