import React from "react";
// mui imports
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
  ListItemButton,
  Box
} from "@mui/material";
import Link from "next/link";

type NavGroup = {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: any;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
  item: NavGroup;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  hideMenu?: any;
  level?: number | any;
  pathDirect: string;
  children?: React.ReactNode;  // Allow children to be passed to the component

}



const NavItem = ({ item, level, pathDirect, onClick, children}: ItemType) => {
  const Icon = item.icon;
  const theme = useTheme();

  // Conditionally set itemIcon only if Icon exists
  const itemIcon = Icon ? <Icon stroke={1.5} size="1.3rem" /> : null;

  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      marginBottom: "2px",
      padding: "8px 10px",
      marginTop: "5px",
      // borderRadius: "4px",
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: theme.palette.text.secondary,
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
      },
      "&.Mui-selected": {
        color: "white",
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: theme.palette.primary.light,
          color: "white",
        },
      },
    },
  }));

  return (
    <List component="div" disablePadding key={item.id}>
      <ListItemStyled>
        <ListItemButton
          component={Link}
          href={item.href}
          disabled={item.disabled}
          selected={pathDirect === item.href}
          target={item.external ? "_blank" : ""}
          onClick={onClick}

        >
          {/* Render ListItemIcon only if itemIcon is not null */}
          {itemIcon && (
     <ListItemIcon
     sx={{
      minWidth: "36px",
      p: "3px 0",

      color: "inherit",
       marginLeft: "9px", //move icon here
     }}
   >
     <Box sx={{ display: "flex",
       }}>
       {itemIcon}
     </Box>
   </ListItemIcon>
          )}
          {/* Render children (like title) */}
          {children || (
            <ListItemText>
              <>{item.title}</>
            </ListItemText>
          )}
        </ListItemButton>
      </ListItemStyled>
    </List>
  );
};

export default NavItem;
