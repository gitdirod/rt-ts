import React from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GroupService } from '/src/services/GroupService';
import { useNavigate, useLocation } from 'react-router-dom';

export default function FilterGroups() {
  const { data: groups } = GroupService.useAllGroups();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeCategoryId = queryParams.get('ci');
  const activeGroupId = queryParams.get('gi');

  const handleClick = (group, category) => {
    const searchParams = new URLSearchParams({
      cat: category.name,
      ci: String(category.id),
      gro: group.name,
      gi: String(group.id)
    });
    navigate(`/store/products/?${searchParams.toString()}`);
  };

  return (
    <>
      <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" sx={{ mb: 1 }}>
        Categorías
      </Typography>

      {groups?.map((gr) => gr?.show && (
        <Accordion
          key={gr?.id}
          disableGutters
          defaultExpanded={String(gr.id) === activeGroupId}
          elevation={0}
          sx={{ bgcolor: 'transparent', borderBottom: '1px solid #eee' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              minHeight: 40,
              '& .MuiAccordionSummary-content': {
                margin: 0,
              }
            }}
          >
            <Typography variant="body2" fontWeight="medium">
              {gr?.name}
            </Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ p: 0 }}>
            <List dense disablePadding>
              {gr?.categories?.map((cat) => (
                <ListItem key={cat?.id} disablePadding>
                  <ListItemButton
                    onClick={() => handleClick(gr, cat)}
                    sx={{
                      pl: 2,
                      bgcolor: String(cat.id) === activeCategoryId ? 'primary.main' : 'transparent',
                      color: String(cat.id) === activeCategoryId ? 'white' : 'text.primary',
                      borderRadius: 1,
                      '&:hover': {
                        bgcolor: String(cat.id) === activeCategoryId ? 'primary.dark' : 'action.hover',
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography fontSize={13} fontWeight={String(cat.id) === activeCategoryId ? 'bold' : 'normal'}>
                          {cat.name}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
