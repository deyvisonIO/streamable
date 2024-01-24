"use client"


import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Hint } from "@/components/ui/hint"
import { Textarea } from "@/components/ui/textarea"
import { ElementRef, useRef, useState, useTransition } from "react"
import { toast } from "sonner"
import { updateUser } from "@/actions/user"

interface bioModalProps {
  initialValue: string | null,
}

export function BioModal({ initialValue }: bioModalProps) {
  const closeRef = useRef<ElementRef<"button">>(null)
  const [value, setValue] = useState(initialValue || "")
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      toast.promise(updateUser({ bio:value }), {
        loading: "Loading...",
        success: () => {
          closeRef?.current?.click();
          return "Bio updated"
        },
        error: "Something went wrong"
      })
    })

  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit user bio
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}  className="space-y-4">
          <Textarea
            placeholder="User bio"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            disabled={isPending}
            className="resize-none"
          />
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isPending}
              type="submit"
              variant="primary"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
