"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  LogoutIcon,
  WantedIcon,
  HomeIcon,
  ArrowRight01Icon,
  ShieldUserIcon,
  UserAdd01Icon,
  Sun01Icon,
  Moon01Icon,
  Pdf01Icon,
} from "@hugeicons/core-free-icons";
import { useUser } from "@/hooks/use-user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearUser } from "@/store/slices/user-slice";
import { setTheme } from "@/store/slices/user-preferences-slice";
import { selectTheme } from "@/store/selectors/user-preferences-selector";

export function AppSidebar() {
  const user = useUser();
  const theme = useAppSelector(selectTheme);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  };

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
      title: "NAVIGATION",
    },
    content: {
      items: [
        {
          title: "Accueil",
          href: "/",
          icon: HomeIcon,
        },
      ],
      groups: [
        {
          displayCondition: true,
          title: "Gestion des prestations",
          icon: WantedIcon,
          items: [
            {
              title: "Templates",
              href: "/prestations/pdf-template",
              icon: Pdf01Icon,
            },
          ],
        },
        {
          displayCondition: user?.role === "admin",
          title: "Administration",
          icon: ShieldUserIcon,
          items: [
            {
              title: "Ajout utilisateur",
              href: "/admin/add-users",
              icon: UserAdd01Icon,
            },
          ],
        },
      ],
    },
    footer: {
      items: {
        title: "Se déconnecter",
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
                <SidebarMenu>
                  <Collapsible asChild className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={group.title}>
                          <HugeiconsIcon icon={group.icon} />
                          <span>{group.title}</span>
                          <HugeiconsIcon
                            icon={ArrowRight01Icon}
                            className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {group.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.href}>
                                  <HugeiconsIcon icon={subItem.icon} />
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                </SidebarMenu>
              </SidebarGroup>
            ),
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={toggleTheme}
              tooltip="Changer de thème"
              className="bg-foreground text-background hover:bg-foreground/90 hover:text-background transition-colors"
            >
              <HugeiconsIcon icon={theme === "dark" ? Sun01Icon : Moon01Icon} />
              <span>Mode {theme === "dark" ? "Clair" : "Sombre"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {user && (
          <SidebarMenu>
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
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
