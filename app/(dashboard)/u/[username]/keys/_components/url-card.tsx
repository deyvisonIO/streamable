import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";

interface urlCardProps {
  value: string | null,
}

export function UrlCard({value}:urlCardProps) {
  return (
    <div className="rounded-xl bg-muted p-6" >
      <div className="flex items-center gap-x-10">
        <p className="font-semibold shrink-0">Server Url</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input value={value || ""} disabled placeholder="Server URL" />
            <CopyButton value={value || ""} />
          </div>
        </div>
      </div>
    </div>
  )
}
