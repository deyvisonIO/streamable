"use client"

import { useViewerToken } from "@/lib/hooks/use-viewer-token"
import { Stream, User } from "@prisma/client"

interface streamPlayerProps {
  user: User & { stream: Stream | null },
  stream: Stream,
  isFollowing: boolean,
}

export function StreamPlayer({user, stream,isFollowing}: streamPlayerProps) {
  const { name, token, identity } = useViewerToken(user.id);

  if(!token || !name || !identity) {
    return (
      <div>
        Cannot Watch Stream!
      </div>
    )
  }

  return (
   <div>Allowed to watch stream!</div>
  )
}
