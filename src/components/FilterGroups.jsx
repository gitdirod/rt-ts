import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import { GroupService } from '/src/services/GroupService';

export default function FilterGroups() {
  const { data: groups } = GroupService.useAllGroups();

  return (
    <>
      <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" sx={{ mb: 1 }}>
        Categorías
      </Typography>

      {groups?.map((gr) => (
        <div key={gr?.id}>
          <Typography
            variant="body2"
            fontWeight="medium"
            color="text.primary"
            sx={{ mb: 0.5, mt: 1 }}
          >
            {gr?.name}
          </Typography>

          <List dense disablePadding>
            {gr?.categories?.map((cat) => (
              <ListItem key={cat?.id} disablePadding>
                <ListItemButton sx={{ pl: 1 }}>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: 13 }}
                    primary={cat.name}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 1 }} />
        </div>
      ))}
    </>
  );
}
