"use client"

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react"
import { toast } from "sonner";

interface unblockButtonProps {
  userId: string,
}

export function UnblockButton({ userId }: unblockButtonProps) {
  const [isPending, startTransition] = useTransition();
  console.log(userId)

  const onClick = () => {
    startTransition(() => {
      toast.promise(onUnblock(userId), {
        loading: "Loading...",
        success: (result) => `User ${result.blocked.username} unblocked`,
        error: "Something went wrong",
      })
    })
  }

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="link"
      size="sm"
      className="text-indigo-500 w-full"
    >
      Unblock
    </Button>
  )
}
