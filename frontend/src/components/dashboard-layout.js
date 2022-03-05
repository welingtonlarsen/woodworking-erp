import { useContext, useEffect, useState } from "react";
import { Box, Alert, Modal } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { LayoutContext, LayoutProvider } from "./layout/LayoutProvider";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [apiCommunicationError, setApiCommunicationError] = useContext(LayoutContext);

  return (
    <>
      <Modal open={apiCommunicationError} onClose={() => setApiCommunicationError(false)}>
        <Alert style={{ outline: 0 }} variant="filled" severity="error">
          Houve algum erro na aplicação. Por favor, tente novamente mais tarde.
        </Alert>
      </Modal>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
    </>
  );
};
