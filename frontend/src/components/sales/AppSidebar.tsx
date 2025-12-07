import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  FileText, 
  Settings,
  ChevronDown,
  ChevronRight,
  Inbox,
  ClipboardList,
  Activity,
  UserCheck,
  UserX,
  Ban,
  XCircle,
  FileSpreadsheet,
  Receipt
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AppSidebarProps {
  userName?: string;
}

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "#", active: true },
  { title: "Leads", icon: Users, href: "#", badge: "600" },
  { title: "Nexus", icon: Building2, href: "#" },
  { title: "Properties", icon: FileText, href: "#", badge: "4000" },
  { title: "Intake", icon: Inbox, href: "#" },
  { title: "Requirements", icon: ClipboardList, href: "#", badge: "500" },
  { title: "QC Dashboard", icon: Activity, href: "#", badge: "100" },
];

const servicesItems = [
  { title: "Pre-active", icon: UserCheck, href: "#" },
  { title: "Active", icon: Activity, href: "#" },
  { title: "Blocked", icon: Ban, href: "#" },
  { title: "Closed", icon: XCircle, href: "#" },
];

const invoicesItems = [
  { title: "Proforma Invoices", icon: FileSpreadsheet, href: "#" },
  { title: "Final Invoices", icon: Receipt, href: "#" },
];

export default function AppSidebar({ userName = "Anurag Yadav" }: AppSidebarProps) {
  const [servicesOpen, setServicesOpen] = useState(true);
  const [invoicesOpen, setInvoicesOpen] = useState(true);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">V</span>
          </div>
          <div>
            <h2 className="font-semibold text-sidebar-foreground">Vault</h2>
          </div>
          <Avatar className="ml-auto h-8 w-8">
            <AvatarFallback className="bg-primary/20 text-primary text-xs">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
        </div>
        <h3 className="text-lg font-semibold text-sidebar-foreground mb-3">
          Sales Management System
        </h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Name, Phone no." 
            className="pl-8 h-9 bg-sidebar-accent border-sidebar-border text-sm"
            data-testid="input-sidebar-search"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={item.active}
                    className={item.active ? 'bg-sidebar-accent' : ''}
                  >
                    <a href={item.href} className="flex items-center gap-3" data-testid={`nav-${item.title.toLowerCase().replace(/\s/g, '-')}`}>
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <span className="text-xs text-muted-foreground">({item.badge})</span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full">
                      <Settings className="h-4 w-4" />
                      <span className="flex-1">Services</span>
                      {servicesOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {servicesItems.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={item.href} className="flex items-center gap-2">
                              <item.icon className="h-3.5 w-3.5" />
                              <span>{item.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <Collapsible open={invoicesOpen} onOpenChange={setInvoicesOpen}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full">
                      <FileText className="h-4 w-4" />
                      <span className="flex-1">Invoices</span>
                      {invoicesOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {invoicesItems.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={item.href} className="flex items-center gap-2">
                              <item.icon className="h-3.5 w-3.5" />
                              <span>{item.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
