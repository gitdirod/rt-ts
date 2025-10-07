import React, { useState, useEffect, memo } from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  CircularProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GroupService } from '/src/services/GroupService';
import { useNavigate, useLocation } from 'react-router-dom';

const FilterGroups= () => {
  const { data: groups, loading } = GroupService.useAllGroups(true);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeCategoryId = queryParams.get('ci');
  const activeGroupId = queryParams.get('gi');

  const [expandedGroup, setExpandedGroup] = useState(null);

  useEffect(() => {
    setExpandedGroup(activeGroupId);
  }, [activeGroupId]);

  const handleClick = (group, category) => {
    const searchParams = new URLSearchParams({
      cat: category.name,
      ci: String(category.id),
      gro: group.name,
      gi: String(group.id)
    });
    navigate(`/store/products/?${searchParams.toString()}`);
  };

  if (loading || !groups) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography className='poppins-bold' sx={{ fontWeight: 500 }}>
        Categorías
      </Typography>
      

      {groups?.map((gr) => gr?.show && (
        <Accordion
          key={gr?.id}
          expanded={expandedGroup === String(gr.id)}
          onChange={() => setExpandedGroup(expandedGroup === String(gr.id) ? null : String(gr.id))}
          disableGutters
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
                        <Typography fontSize={13} className={String(cat.id) === activeCategoryId ? 'poppins-bold' : 'poppins-regular'}>
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

export default memo(FilterGroups)
