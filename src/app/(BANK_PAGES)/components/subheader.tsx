import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Typography,
  useMediaQuery,
  Fab,
  Backdrop,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const SubheaderContent = ({ toggleMobileSidebar }: ItemType) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const smUp = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

  const [fabOpen, setFabOpen] = useState(false);

  const handleFabClick = () => {
    setFabOpen((prev) => !prev);
  };

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: "white",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
  }));

  const FabStyled = styled(Fab)(({ theme }) => ({
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "rotate(90deg)",
    },
    zIndex: 1301,
  }));

  return (
    <>


      <FabStyled color="primary" onClick={handleFabClick}>
        <AddIcon
          sx={{
            transition: "transform 0.3s ease",
            transform: fabOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        />
      </FabStyled>

      <Backdrop
        open={fabOpen}
        onClick={() => setFabOpen(false)}
        sx={{ zIndex: 1300, color: "#fff" }}
      />
    </>
  );
};

export default SubheaderContent;
