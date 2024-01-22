"use client"

import { useAuth } from "@clerk/nextjs"
import { Button } from "../ui/button"
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

interface actionsProps {
  hostIdentity: string,
  isFollowing: boolean,
  isHost: boolean,
}

export function Actions({hostIdentity, isFollowing, isHost }:actionsProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { userId } = useAuth();

  const handleFollow = () => {
    startTransition(() => {
      toast.promise(onFollow(hostIdentity), {
        loading: "Loading...",
        success: (data) => `You are following ${data.following.username}`,
        error: "Something went wrong"
      })
    })
  }

  const handleUnfollow = () => {
      startTransition(() => {
      toast.promise(onUnfollow(hostIdentity), {
        loading: "Loading...",
        success: (data) => `You have unfollowed ${data.following.username}`,
        error: "Something went wrong"
      })
    })
  }

  const toggleFollow = () => {
    if(!userId) {
      return router.push("/sign-in")
    }
    if (isHost) return

    if(isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  }

  return (
    <Button
      onClick={toggleFollow}
      disabled={isPending || isHost}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto"
    >
      <Heart className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}/>
      {isFollowing ? "unfollow" : "follow"}
    </Button>
  )
}

export function ActionsSkeleton() {
  return (
   <Skeleton className="h-10 w-full lg:w-24"/>
  )
}
