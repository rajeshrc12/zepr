import {
  SquarePen,
  Cable,
  MessagesSquare,
  LayoutDashboard,
  ChartArea,
} from "lucide-react";

export const MENU = [
  {
    value: "New chat",
    href: "/chat",
    icon: SquarePen,
  },
  {
    value: "Connection",
    href: "/connection",
    icon: Cable,
  },
  {
    value: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    value: "Charts",
    href: "/chart",
    icon: ChartArea,
  },
  {
    value: "Chat history",
    href: "/history",
    icon: MessagesSquare,
  },
];
