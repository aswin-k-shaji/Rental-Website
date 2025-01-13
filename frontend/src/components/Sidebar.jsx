import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";

const Sidebar = ({ open, toggleSidebar }) => {
  return (
    <Drawer anchor="left" open={open} onClose={toggleSidebar}>
      <List>
        <ListItem button>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Shop" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Cart" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
