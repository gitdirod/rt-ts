import { Outlet } from "react-router-dom";
import { memo, useState } from "react";
import { useAuth } from "/src/hooks/useAuth";
import IsLoading from "/src/components/store/common/IsLoading";
import { Box } from "@mui/material";
import SidebarAdmin from "/src/components/admin/sidebar/SidebarAdmin";

const AdminLayout = () => {
  const { user } = useAuth({ middleware: "admin", url: "/store" });
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (user === undefined) return <IsLoading />;

  const sidebarWidth = sidebarCollapsed ? 60 : 240;

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          transition: 'width 0.3s ease',
          backgroundColor: '#fff',
          borderRight: '1px solid #e0e0e0'
        }}
      >
        <SidebarAdmin collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      </Box>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* <NavAdmin /> */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            px: 1,
            overflowY: "auto",
            backgroundColor: "#f9fafb",
            transition: 'margin 0.3s ease'
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default memo(AdminLayout);
