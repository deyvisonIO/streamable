"use client"

import { toast } from "sonner"
import { useTransition } from "react"
import { MinusCircle } from "lucide-react"

import { Hint } from "@/components/ui/hint"
import { Button } from "@/components/ui/button"
import { onBlock } from "@/actions/block"
import { cn, stringToColor } from "@/lib/utils"

interface communityItemProps {
  hostName: string,
  viewerName: string,
  participantName?: string,
  participantIdentity: string,
}


export function CommunityItem({ hostName, viewerName, participantName, participantIdentity }:communityItemProps) {
  const [isPending, startTransition] = useTransition();
  const color = stringToColor(participantName || "")
  const isSelf = participantName === viewerName;
  const isHost = participantName === hostName;

  const handleBlock = () => {
    if(!participantName || isSelf || isHost) return;

    startTransition(() => {
      toast.promise(onBlock(participantIdentity), {
        loading: "Loading...",
        success: `Blocked ${participantName}`,
        error: "Something went wrong",
      })
    })

  }

  return (
    <div className={cn("group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5", isPending && "opacity-50 pointer-events-none")}>
      <p style={{color}}>
        {participantName}
      </p>
      {!isHost && !isSelf && (
        <Hint label="Block" asChild>
          <Button
            variant="ghost"
            disabled={isPending}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
            onClick={handleBlock}
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground"/>
          </Button>
        </Hint>
      )}
    </div>
  )
}
