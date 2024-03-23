import {
  Handshake,
  LayoutDashboard,
  LineChart,
  UserRoundCog,
} from "lucide-react";

export const NAV_ITEMS = [
  { label: "Dashboard", link: "/dashboard", icon: LayoutDashboard },
  { label: "Timeline", link: "/timeline", icon: LineChart },
  { label: "Team", link: "/team", icon: Handshake },
  { label: "Profile", link: "/profile", icon: UserRoundCog },
];
