import { Stream, User } from "@prisma/client";
import Link from "next/link";
import { ThumbnaiSkeleton, Thumbnail } from "@/components/thumbnail";
import { VerifiedMark } from "@/components/ui/verified-mark";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface resultCardProps {
  data: Stream & { user: User }
}

export function ResultCard({data}: resultCardProps) {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="d-full flex gap-x-4">
        <div className="relative h-36 w-64">
          <Thumbnail
            src={data.thumbnailUrl}
            fallback={data.user.imageUrl}
            isLive={data.isLive}
            username={data.user.username}
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold text-lg cursor-pointer hover:text-indigo-500">{data.user.username}</p>
            <VerifiedMark />
          </div>
          <p className="text-sm text-muted-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(data.updatedAt), { addSuffix: true})}</p>
        </div>
      </div>
    </Link>
  )
}

export function ResultCardSkeleton() {
  return (
    <div className="w-full flex gap-x-4">
      <div className="relative h-36 w-64">
        <ThumbnaiSkeleton />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32 "/>
        <Skeleton className="h-3 w-24"/>
        <Skeleton className="h-3 w-12"/>
      </div>
    </div>
  )
}
