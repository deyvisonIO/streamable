import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import {UserButton} from "@clerk/nextjs"
import { LogOut } from "lucide-react";
import Link from "next/link";

export function Actions() {
  return (
    <div className="flex items-center justify-end gap-x-2">
          <Hint
            label="Exit"
            asChild
          >
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:text-primary"
              asChild
            >
              <Link href="/">
                <LogOut className="h-5 w-5 lg:mr-2" />
                <span className="hidden lg:block">Exit</span>
              </Link>
            </Button>
          </Hint>
          <UserButton
            afterSignOutUrl="/"
          />
    </div>
  )
}
