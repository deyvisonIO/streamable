"use client"
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar"

interface wrapperProps {
  children: React.ReactNode,
}

export function Wrapper({ children }: wrapperProps) {
  const { collapsed } = useSidebar((state) => state);

  return (
    <aside
      className={cn("fixed flex flex-col z-50 left-0 bg-background w-60 h-full border-r border-[#2DE35]", collapsed && "w-[70px]")}
    >
      {children}
    </aside>
  )
}
