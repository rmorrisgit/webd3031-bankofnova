import React from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List, Divider } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems.map((item, index) => {
          // Add a divider above "Settings" item
          if (item.title === "Settings" && index > 0) {
            return (
              <React.Fragment key={item.id || `divider-${index}`}>
                <Divider sx={{ my: 2 }} />
                <NavItem
                  item={item}
                  key={item.id || `navitem-${index}`}
                  pathDirect={pathDirect}
                  onClick={toggleMobileSidebar}
                />
              </React.Fragment>
            );
          }

          return (
            <NavItem
              item={item}
              key={item.id || `navitem-${index}`}
              pathDirect={pathDirect}
              onClick={toggleMobileSidebar}
            />
          );
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
