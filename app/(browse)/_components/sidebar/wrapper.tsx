"use client"
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar"
import { useEffect, useState } from "react";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { useIsClient } from "usehooks-ts";
import { FollowingSkeleton } from "./following";

interface wrapperProps {
  children: React.ReactNode,
}

export function Wrapper({ children }: wrapperProps) {
  const { collapsed } = useSidebar((state) => state);
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <aside
        className={cn("fixed flex flex-col z-50 left-0 bg-background w-60 h-full border-r border-[#2DE35]", collapsed && "w-[70px]")}
      >
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    )
  }

  return (
    <aside
      className={cn("fixed flex flex-col z-50 left-0 bg-background w-[70px] lg:w-60 h-full border-r border-[#2DE35]", collapsed && "lg:w-[70px]")}
    >
      {children}
    </aside>
  )
}

