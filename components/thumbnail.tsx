import { LiveBadge } from "@/components/ui/live-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/ui/user-avatar";
import Image from "next/image";

interface thumbnailProps {
  src: string | null,
  fallback: string,
  username: string,
  isLive: boolean,
}

export function Thumbnail({src, fallback, username, isLive}: thumbnailProps) {
  let content;


  if(!src) {
    content = (
      <div className="bg-background flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md" >
        <UserAvatar
          username={username}
          size="lg"
          showBadge
          imageUrl={fallback}
          isLive={isLive}
        />
      </div>
    )
  } else {
    content = (
      <Image
        src={src}
        fill
        alt="thumbnail"
        className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"
      />
    )
  }
  return (
    <div className="group aspect-video relative rounded-md cursor-pointer">
      <div className="rounded-md absolute inset-0 bg-indigo-600 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        {content}
        {isLive && src && (
          <div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition transform">
            <LiveBadge />
          </div>
        )}
      </div>
    </div>
  )
}

export function ThumbnaiSkeleton() {
  return (
    <div className="group aspect-video relative rounded-xl cursor-pointer">
      <Skeleton className="h-full w-full"/>
    </div>
  )
}
