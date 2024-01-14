"use client"

import { onFollow, onUnfollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner"

interface actionsProps {
  isFollowing: boolean,
  userId: string
}

export function Actions({ isFollowing, userId }: actionsProps) {
  const [isPending, startTransition] = useTransition();
  const handleFollow = () => {
    startTransition(() => {
      toast.promise(onFollow(userId),{
        loading: "Loading...",
        success: (data) => `Followed ${data.following.username}!`,
        error: "Couldn't Follow User!"
      });
    });
  }
  const handleUnfollow = () => {
    startTransition(() => {
      toast.promise(onUnfollow(userId),{
        loading: "Loading...",
        success: (data) => `Unfollowed ${data.following.username}!`,
        error: "Couldn't Unfollow User!"
      });
    });
  }


  const onClick = () => {
    if (isFollowing) return handleUnfollow();
    return handleFollow();
  }
  return (
    <Button
      disabled={isPending}
      variant={isFollowing ? "secondary" : "primary"}
      onClick={onClick}>
      {isFollowing ?  "Unfollow" : "Follow" }
    </Button>
  )
}
