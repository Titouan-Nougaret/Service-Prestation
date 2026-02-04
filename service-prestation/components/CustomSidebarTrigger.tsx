"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export function CustomSidebarTrigger({ className }: { className?: string }) {
  const { toggleSidebar, state } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className={cn(
        "h-fit w-fit mt-5 p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors",
        className,
      )}
      aria-label="Toggle Sidebar"
    >
      <HugeiconsIcon
        icon={state === "expanded" ? PanelLeftOpenIcon : PanelLeftCloseIcon}
        size={25}
      />
    </button>
  );
}
