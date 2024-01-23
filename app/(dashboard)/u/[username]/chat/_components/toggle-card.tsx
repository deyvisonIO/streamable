"use client"

import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
import { toast } from "sonner";
import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";

type fieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface toggleCardProps {
  field: fieldTypes,
  label: string,
  value: boolean
}

export function ToggleCard({ field, label, value }: toggleCardProps) {
  const [isPending, startTransition] = useTransition();

  const onChange = async () => {
    startTransition(() => {
      toast.promise(updateStream({ [field]: !value }), {
        loading: "Updating...",
        success: "Chat Settings Updated",
        error: "Couldn't Update Chat Settigns"
      })
    })
  }

  return(
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            checked={value}
            onCheckedChange={onChange}
            disabled={isPending}
          >
            {value ? "on" : "off"}
          </Switch>
        </div>
      </div>
    </div>
  )
}

export function ToggleCardSkeleton() {
  return (
    <Skeleton className="roundend-xl p-10 w-full" />
  )
}
