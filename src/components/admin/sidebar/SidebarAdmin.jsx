import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  List, ListItemButton, ListItemIcon, ListItemText,
  Collapse, Divider, Box, IconButton, Tooltip, Typography
} from '@mui/material';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';

import { adminNavigation } from '/src/data/pages';
import { useState } from 'react';

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
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState(() => {
    const initialState = {};
    adminNavigation.forEach(section => {
      if (location.pathname.startsWith(section.urlMain)) {
        initialState[section.id] = true;
      }
    });
    return initialState;
  });

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          p: 1,
          height: 50,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {!collapsed && (
          <Typography
            variant="body1"
            color="text.primary"
            fontWeight="bold"
            sx={{ flexGrow: 1, textAlign: 'center' }}
          >
            TECNITOOLS
          </Typography>
        )}

        <Tooltip title={collapsed ? "Expandir" : "Colapsar"}>
          <IconButton size="small" onClick={onToggle}>
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <Divider />

      {/* Lista de navegación */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <List>
          {adminNavigation.map((section) => {
            const isActive = location.pathname.startsWith(section.urlMain);
            const isOpen = openSections[section.id];

            return (
              <Box key={section.id}>
                <ListItemButton onClick={() => toggleSection(section.id)} selected={isActive}>
                  <ListItemIcon>{iconMap[section.icon]}</ListItemIcon>
                  {!collapsed && 
                  <ListItemText primary={section.name} slotProps={{
                    primary: {
                      variant: 'body2',
                    },
                  }} />}
                  {!collapsed && (isOpen ? <ExpandLess /> : <ExpandMoreIcon />)}
                </ListItemButton>

                {/* Submenú */}
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
                          <ListItemText
                            primary={view.name}
                            slotProps={{
                              primary: {
                                variant: 'body2',
                              },
                            }}
                          />


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

      <Divider />

      {/* Botón Ir a Tienda debajo */}
      <Box sx={{ p: 1 }}>
        <ListItemButton
          onClick={() => navigate('/store')}
          sx={{ justifyContent: collapsed ? 'center' : 'flex-start', px: collapsed ? 1 : 2 }}
        >
          <ListItemIcon
            sx={{
              minWidth: collapsed ? 'auto' : 40,
              justifyContent: 'center',
            }}
          >
            <StoreMallDirectoryIcon color="primary" />
          </ListItemIcon>
          {!collapsed && (
            <ListItemText primary="Ir a tienda" sx={{ color: 'primary.main', fontWeight: 'bold' }} />
          )}
        </ListItemButton>
      </Box>
    </Box>
  );
}
