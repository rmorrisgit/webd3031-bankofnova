import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
  {
    navlabel: true,
    subheader: "analytics",
  },
  {
    id: uniqueId(),
    title: "all-users",
    icon: IconTypography,
    href: "/analytics/all-users",
  },
  {
    id: uniqueId(),
    title: "user-metrics",
    icon: IconCopy,
    href: "/analytics/user-metrics",
  },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/login",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/register",
  },
  {
    navlabel: true,
    subheader: "Extra",
  },
  {
    id: uniqueId(),
    title: "premium-tracking",
    icon: IconMoodHappy,
    href: "/premium-tracking",
  },
  {
    id: uniqueId(),
    title: "user-management",
    icon: IconAperture,
    href: "/user-management",
  },
];

export default Menuitems;
