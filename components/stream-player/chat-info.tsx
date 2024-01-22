
import { useMemo } from "react"
import { Info } from "lucide-react"

import { Hint } from "@/components/ui/hint"

interface chatInfoProps {
  isDelayed: boolean,
  isFollowersOnly: boolean,
}

function useChatInfoController({isDelayed, isFollowersOnly}:chatInfoProps) {
  const hint = useMemo(() => {
    if(isFollowersOnly && !isDelayed) {
      return "Followers Only Chat"
    }
    if(!isFollowersOnly && isDelayed) {
      return "Messages are delayed by 3 seconds"
    }

    if(isFollowersOnly && isDelayed) {
      return "Followers Only Chat. Messages are delayer by 3 seconds"
    }

    return ""

  }, [isDelayed, isFollowersOnly])



  const label = useMemo(() => {
    if(isFollowersOnly && !isDelayed) {
      return "Followers Only"
    }
    if(!isFollowersOnly && isDelayed) {
      return "Slow Mode"
    }

    if(isFollowersOnly && isDelayed) {
      return "Followers Only And Slow Mode"
    }

    return ""

  }, [isDelayed, isFollowersOnly])

  return [hint, label]

}

export function ChatInfo({ isDelayed, isFollowersOnly}: chatInfoProps) {
  const [hint, label] = useChatInfoController({isDelayed, isFollowersOnly});

  if(!isDelayed && !isFollowersOnly) return null
  return (
    <div className="p-2 text-muted-foreground bg-white-/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint label={hint}>
        <Info className="h-4 w-4"/>
      </Hint>
      <p className="text-xs font-semibold">
        {label}
      </p>
    </div>
  )
}
