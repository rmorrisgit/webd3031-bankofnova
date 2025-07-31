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
  Box,
  Typography
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
  padding: "12px 0px",

  borderLeft: '4px solid transparent',

  // ❌ Do not set 'color' globally here (optional, unless you want it by default)






  // ✅ Ripple color explicitly
  // "& .MuiTouchRipple-root .MuiTouchRipple-rippleVisible": {
  //   color: theme.palette.primary.main,
  // },


  "&:hover": {
    backgroundColor: 'green',
    borderLeft: '4px solid grey',
  },

  "&.Mui-selected": {
    borderLeft: '4px solid #5D87FF',
    // backgroundColor: 'red',


    // "& .MuiTouchRipple-root .MuiTouchRipple-rippleVisible": {
    //   color: theme.palette.primary.main,
    // },



    "&:hover": {
      backgroundColor: 'transparent',

      // "& .MuiTab-wrapper": {
      //   color: theme.palette.primary.main,
      // },
      // "& .MuiTab-wrapper": {
      //   color: theme.palette.primary.main,
      // },

      // "& .MuiTouchRipple-root .MuiTouchRipple-rippleVisible": {
      //   color: theme.palette.primary.main,
      // },
      // "& .MuiTouchRipple-root .MuiTouchRipple-rippleVisible": {
      //   color: theme.palette.primary.main,
      // },
      // "& .MuiTab-wrapper": {
      //   color: theme.palette.primary.main,
      // },
      // "& .MuiTab-wrapper": {
      //   color: theme.palette.primary.main,
      // },

      // "& .MuiTouchRipple-root .MuiTouchRipple-rippleVisible": {
      //   color: theme.palette.primary.main,
      // },
      // "& .MuiTouchRipple-root .MuiTouchRipple-rippleVisible": {
      //   color: theme.palette.primary.main,
      // },
    },
  },
},

  }
)
);








  return (
    <List component="div" disablePadding key={item.id} >
      <ListItemStyled
      >
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
      color: "inherit",
      //move icon here
       marginLeft: "17px", 
       
       
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
            <ListItemText
                 sx={{
      // color: "green",
      //move icon here
       marginLeft: "17px", 
       
       
     }}>
            <ListItemText
                 sx={{
      // color: "green",
      //move icon here
       marginLeft: "17px", 
       
       
     }}>
              <>{item.title}</>
            </ListItemText>
          )}
        </ListItemButton>
      </ListItemStyled>
    </List>
  );
};

export default NavItem;
