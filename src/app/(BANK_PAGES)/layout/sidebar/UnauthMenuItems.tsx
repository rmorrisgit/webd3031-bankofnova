import {
  IconLogin,
  IconUserPlus,
  IconCurrencyDollar,
  IconWallet,
} from "@tabler/icons-react";
import { uniqueId } from "lodash";

interface MenuItem {
  id: string;
  title: string;
  icon: (props: any) => JSX.Element;
  href: string;
  subheader?: string; // Optional subheader
}

const UnauthMenuItems: MenuItem[] = [
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
];

export default UnauthMenuItems;
