// SidebarAdmin.jsx
import { useLocation, Link } from 'react-router-dom';
import {
  List, ListItemButton, ListItemIcon, ListItemText,
  Collapse, Divider, Box, IconButton, Tooltip,
  Typography
} from '@mui/material';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { adminNavigation } from '/src/data/pages';
import { useState } from 'react';

// Tus iconos personalizados
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';

const iconMap = {
  iconStock: <Inventory2OutlinedIcon />,
  iconCart: <ShoppingCartOutlinedIcon />,
  iconUsers: <PeopleAltOutlinedIcon />,
  iconPage: <SettingsOutlinedIcon />,
  iconEnvoice: <ReceiptOutlinedIcon />,
};

export default function SidebarAdmin({ collapsed, onToggle }) {
  const location = useLocation();
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box
            sx={{
                p: 1,
                height: 50,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
        {/* Texto centrado solo si no está colapsado */}
        {!collapsed && (
            <Typography
            variant="body1"
            color="text.primary"
            fontWeight="bold"
            sx={{ flexGrow: 1, textAlign: 'center' }}
            >
            Panel
            </Typography>
        )}

        <Tooltip title={collapsed ? "Expandir" : "Colapsar"}>
            <IconButton size="small" onClick={onToggle}>
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
        </Tooltip>
        </Box>


      <Divider />

      <List>
        {adminNavigation.map((section) => {
          const isActive = location.pathname.startsWith(section.urlMain);
          const isOpen = openSections[section.id];

          return (
            <Box key={section.id}>
              <ListItemButton onClick={() => toggleSection(section.id)} selected={isActive}>
                <ListItemIcon>{iconMap[section.icon]}</ListItemIcon>
                {!collapsed && <ListItemText primary={section.name} />}
                {!collapsed && (isOpen ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>

              {!collapsed && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {section.children.map((view) => (
                      <ListItemButton
                        key={view.id}
                        component={Link}
                        to={view.url}
                        selected={location.pathname === view.url}
                        sx={{ pl: 4 }}
                      >
                        <ListItemText primary={view.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          );
        })}
      </List>
    </Box>
  );
}
