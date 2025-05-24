import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Button
} from '@mui/material';
import {
  Menu,
  Home,
  Description,
  People,
  Settings,
  ExitToApp,
  HelpCenter
} from '@mui/icons-material';

const Sidebar = () => {
const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
  setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          // width: open ? 100 : 56,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? 60 : 56,
            boxSizing: 'border-box',
            transition: 'width 0.3s ease',
          },
        }}
      >
          <Box>
          {/* Top spacing */}
          <Box sx={{ height: 50}} />

        <List>
          <ListItem button>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            
          </ListItem>
          <ListItem button selected>
            <ListItemIcon>
              <Description />
            </ListItemIcon>
       
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <People/>
            </ListItemIcon>
          
          </ListItem>
        </List>
        </Box>

        
        <Divider />
        <List sx={{ mt: 'auto' }}>
          <ListItem button>
            <ListItemIcon>
              <HelpCenter />
            </ListItemIcon>
          
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
          
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
      
          </ListItem>
        </List>
      </Drawer>
      </Box>
  );
};

export default Sidebar;