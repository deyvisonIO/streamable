import { User } from "@prisma/client";
import Link from "next/link";
import { ThumbnaiSkeleton, Thumbnail } from "./thumbnail";
import { UserAvatar, UserAvatarSkeleton } from "@/components/ui/user-avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface resultCardProps {
  data: {
    user: User,
    isLive: boolean,
    name: string,
    thumbnailUrl: string | null,
    id: string,
  },
}

export function ResultCard({data}:resultCardProps) {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="h-full w-full space-y-4">
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={data.user.imageUrl}
          username={data.user.username}
          isLive={data.isLive}
        />
        <div className="flex gap-x-3">
          <UserAvatar
            username={data.user.username}
            imageUrl={data.user.imageUrl}
            isLive={data.isLive}
          />
          <div className="flex flex-col tex-sm overflow-hidden">
            <p className="truncate font-semibold hover:text-indigo-500">{data.name}</p>
            <p className="text-muted-foreground">{data.user.username}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function ResultCardSkeleton() {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnaiSkeleton />
      <div className="gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32"/>
          <Skeleton className="h-3 w-24"/>
        </div>
      </div>
    </div>
  )
}
