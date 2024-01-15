"use client"

import { onBlock, onUnblock } from "@/actions/block"
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

  const handleBlock = () => {
    startTransition(() => {
      toast.promise(onBlock(userId),{
        loading: "Loading...",
        success: (data) => `Blocked ${data.blocked.username}!`,
        error: "Couldn't Block User!"
      });
    });
  }

  const handleUnblock = () => {
    startTransition(() => {
      toast.promise(onUnblock(userId),{
        loading: "Loading...",
        success: (data) => `Unblocked ${data.blocked.username}!`,
        error: "Couldn't Unblock User!"
      });
    });
  }

  return (
    <>
      <Button
        disabled={isPending}
        variant={isFollowing ? "secondary" : "primary"}
        onClick={onClick}>
        {isFollowing ?  "Unfollow" : "Follow" }
      </Button>
      <Button onClick={handleBlock}>Block</Button>
      <Button onClick={handleUnblock}>Unblock</Button>
    </>
  )
}
