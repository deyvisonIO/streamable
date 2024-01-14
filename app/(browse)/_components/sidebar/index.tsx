import { getRecommended } from "@/lib/recommended-service";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { Toggle, ToggleSkeleton } from "./toggle";
import { Wrapper } from "./wrapper";

export async function Sidebar() {
  const recommendedUsers = await getRecommended();
  return (
    <Wrapper>
     <Toggle />
     <div className="p-y-4 pt-4 lg:pt-0">
        <Recommended data={recommendedUsers}/>
      </div>
    </Wrapper>
  )
}

export function SidebarSkeleton() {
  return (
    <aside className="fixed lef-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
      <RecommendedSkeleton />
    </aside>
  )
}
