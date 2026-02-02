"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { LogoutIcon, WantedIcon, HomeIcon } from "@hugeicons/core-free-icons";
import { useUser } from "@/hooks/use-user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { clearUser } from "@/store/slices/user-slice";

export function AppSidebar() {
  const user = useUser();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        dispatch(clearUser());
        router.refresh();
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const layout = {
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
        action: handleLogout,
        icon: LogoutIcon,
      },
    },
  };

  return (
    <Sidebar
      variant="floating"
      className={cn("top-10 h-[calc(100svh-2.5rem)]")}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex h-12 items-center px-4">
              <span className="text-lg font-semibold tracking-[0.2em]">
                {layout.header.title}
              </span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {layout.content.items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.href}>
                    <HugeiconsIcon icon={item.icon} />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {layout.content.groups.map(
          (group) =>
            group.displayCondition && (
              <SidebarGroup key={group.title}>
                <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild tooltip={item.title}>
                          <Link href={item.href}>
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ),
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={layout.footer.items.action}
              tooltip={layout.footer.items.title}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <HugeiconsIcon icon={layout.footer.items.icon} />
              <span>{layout.footer.items.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-4 py-2 text-sm">
              <div className="flex flex-col">
                <span className="font-medium truncate max-w-[150px]">
                  {user?.name || user?.email || "Utilisateur"}
                </span>
                {user?.role && (
                  <span className="text-xs text-muted-foreground capitalize">
                    {user.role}
                  </span>
                )}
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
