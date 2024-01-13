"use client"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { LiveBadge } from "./live-badge"

const avatarSizes = cva(
  "",
  {
    variants: {
      size: {
        default: "h-8 w-8",
        lg: "h-4 w-4"
      },
    },
    defaultVariants: {
      size: "default"
    }
  }
)

interface userAvatarProps extends VariantProps<typeof avatarSizes> {
  username: string,
  imageUrl: string,
  isLive?: boolean,
  showBadge?: boolean,
}

export function UserAvatar({username, imageUrl, isLive=false, showBadge=false, size}: userAvatarProps) {
  const canShowBadge = showBadge && isLive;
  return (
    <div className="relative">
      <Avatar
        className={cn(isLive && "ring-2 ring-rose-500 border border-background", avatarSizes({ size }))}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          { username[0] }
          { username[username.length - 1] }
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
        <LiveBadge />
      </div>
      )}
    </div>
  )
}

interface userAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}

export function UserAvatarSkeleton({size}:userAvatarSkeletonProps){
  return (
    <Skeleton className={cn("rounded-full", avatarSizes({size}))}/>
  )
}
