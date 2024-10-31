/**
 * Props for the NavbarLower component.
 *
 * @interface NavbarLowerProps
 * @property {function} onCLickDrawer - Function to handle the drawer click event.
 */
export interface NavbarLowerProps {
  onCLickDrawer: () => void;
}

/**
 * Props for the NavInternal component.
 *
 * @interface NavInternalProps
 * @property {string} title - The title to be displayed in the internal navigation.
 */
export interface NavInternalProps {
  title: string;
}

/**
 * Sidebar
 *
 * @typeParam drawerWidth: number
 * @typeParam open: boolean
 * @typeParam onTransitionEnd: () => void
 * @typeParam onClose: () => void
 */
export interface SidebarProps {
  drawerWidth: number;
  open: boolean;
  onTransitionEnd: () => void;
  onClose: () => void;
}

/**
 * Props for the DrawerToggle component.
 *
 * @interface DrawerToggleProps
 * @property {function} handleDrawerToggle - Function to handle the drawer toggle event.
 */
export interface DrawerToggleProps {
  handleDrawerToggle: () => void;
}
