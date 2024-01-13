import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs"
import { Clapperboard } from "lucide-react";
import Link from "next/link";

export async function Actions() {
  const user = await currentUser();
  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!user && (
        <SignInButton>
          <Button size="sm" variant="primary">
            Login
          </Button>
        </SignInButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-4">
          <Hint
            label="Dashboard"
            asChild
          >
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:text-primary"
              asChild
            >
              <Link href={`/u/${user.username}`}>
                <Clapperboard className="h-5 w-5 lg:mr-2" />
                <span className="hidden lg:block">Dashboard</span>
              </Link>
            </Button>
          </Hint>
          <UserButton
            afterSignOutUrl="/"
          />
        </div>
      )}
    </div>
  )
}
