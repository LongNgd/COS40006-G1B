import { LucideFileSignature, LucideLayoutDashboard, LucideLogOut } from "lucide-react";

export const navigation = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: LucideLayoutDashboard,
  },
  {
    name: "Anomaly Report",
    link: "/report",
    icon: LucideFileSignature,
  },
  {
    name: "Login",
    link: "/login",
    icon: LucideLogOut,
  },
];
