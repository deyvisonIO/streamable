"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useCreatorSidebar } from "@/store/use-creator-sidebar"
import { LucideIcon } from "lucide-react"
import Link from "next/link"


interface navItemProps {
  icon: LucideIcon,
  label: string,
  href: string,
  isActive: boolean,
}

export function NavItem({icon: Icon, label, href, isActive}: navItemProps) {
  const { collapsed } = useCreatorSidebar((state) => state)
  return (
    <Button asChild variant="ghost" className={cn("w-full h-12", collapsed ? "justify-center" : "justify-start", isActive && "bg-accent")}>
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn("w-4 h-4", collapsed ? "mr-0" : "mr-2")} />
          {!collapsed && (
            <span>{label}</span>
          )}
        </div>
      </Link>
    </Button>
  )
}

export function NavItemSkeleton() {
  return (
   <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-12 min-w-12 rounded-md"/>
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  )
}
