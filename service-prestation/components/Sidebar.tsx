import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  LogoutIcon,
  WantedIcon,
} from "@hugeicons/core-free-icons";
import { HomeIcon } from "@hugeicons/core-free-icons";

const sidebarLayout = {
  header: {
    title: "PRESTALINK",
  },
  content: {
    items: [
      {
        title: "Accueil",
        href: "/",
        icon: HomeIcon,
      },
      {
        title: "Gestion des prestations",
        href: "/prestations",
        icon: WantedIcon,
      },
    ],
    groups: [
      {
        displayCondition: user?.role === "admin",
        title: "Administration",
        items: [
          {
            title: "Users",
            href: "/admin/users",
          },
        ],
      },
    ],
  },
  footer: {
    items: {
      title: "Se deconnecter",
      href: "/logout",
      icon: LogoutIcon,
    },
  },
};

export function AppSidebar() {
  const user = useUser();
  return (
    <Sidebar
      variant="floating"
      className={cn("top-10 h-[calc(100svh-2.5rem)]")}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  Select Workspace
                  <HugeiconsIcon icon={ArrowDown01Icon} className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Acme Inc</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>Username</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
