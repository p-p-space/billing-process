'use client';

import { Box, Drawer } from '@mui/material';
//Internal app
import { SidebarProps } from '@/interfaces';
import ListSidebar from './components/ListSidebar';

/**
 * Sidebar configured for the different resolutions.
 *
 * @param drawerWidth - Sidebar Width {@defaultValue `280px`}.
 * @param open - Function to show sidebar or not - responsive.
 * @param onTransitionEnd - Function to close the sidebar when you have an action - responsive.
 * @param onClose - Function to close the sidebar - responsive.
 */
export default function Sidebar(props: Readonly<SidebarProps>): JSX.Element {
  const { drawerWidth, open, onTransitionEnd, onClose } = props;

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 }, height: 'auto' }}
      aria-label="mailbox folders"
    >
      <Drawer
        anchor="left"
        variant="temporary"
        open={open}
        onTransitionEnd={onTransitionEnd}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Box>
          <ListSidebar />
        </Box>
      </Drawer>

      <Drawer variant="permanent" open sx={{ display: { xs: 'none', md: 'block' }, '&>.MuiPaper-root': { pb: 0 } }}>
        <ListSidebar />
      </Drawer>
    </Box>
  );
}
