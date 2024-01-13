import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

interface hintProps {
  label: string;
  children: React.ReactNode;
  asChild?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export function Hint({
  label,
  children,
  asChild,
  side,
  align
}: hintProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild={asChild}>
          {children}
        </TooltipTrigger>
        <TooltipContent
          className="text-black bg-white"
          side={side}
          align={align}
        >
          <p className="font-semibold">
            {label}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
