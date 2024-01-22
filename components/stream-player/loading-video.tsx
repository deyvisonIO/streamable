import { Loader } from "lucide-react";

interface loadingVideoProps {
  label: string
}

export function LoadingVideo({label}: loadingVideoProps) {
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center">
      <Loader className="h-10 w-10 text-muted-foreground animate-spin"/>
      <p className="text-muted-foreground capitalize">
        {label}
      </p>
    </div>
  )
}
