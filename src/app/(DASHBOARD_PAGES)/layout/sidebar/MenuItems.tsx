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
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },

  // {
  //   id: uniqueId(),
  //   title: "premium-tracking",
  //   icon: IconMoodHappy,
  //   href: "/premium-tracking",
  // },
  {
    id: uniqueId(),
    title: "User Management",
    icon: IconAperture,
    href: "/user-management",
  },
];

export default Menuitems;
