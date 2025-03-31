import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const UnauthenticatedSidebarItems = () => {
  const sidebarItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <List
      sx={{
        mt: 8,
        padding: 0, // Remove extra padding from the list 
      }}
    >
      {sidebarItems.map((item, index) => (
        <ListItem
          key={index}
          disablePadding
          sx={{
            marginY: 0.5, // Consistent vertical spacing between items
            
          }}
        >
          <ListItemButton
            component="a"
            href={item.path}
            sx={{
              paddingY: 0.2, // Even vertical padding
              paddingX: 1,
              borderRadius: 2, // Rounded edges for better aesthetics
              transition: "background-color 0.2s",
              
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)", // Subtle hover effect
              },
            }}
          >
            <ListItemText
              primary={
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 400,
                    fontSize: 16,
                    cursor: "pointer", // Apply grab cursor to the text
                  }}
                >
                  {item.label}
                </Typography>
              }
            />
            <ListItemIcon
              sx={{
                minWidth: "auto", // Prevent extra space on the right
                marginLeft: 1, // Add spacing between text and icon
                cursor: "pointer", // Apply grab cursor to the icon
              }}
            >
              <ChevronRightIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default UnauthenticatedSidebarItems;
