export interface UiStore {
  loadingScreen: boolean;
  setLoadingScreen: (status: boolean) => void;
  showModalError: boolean;
  closeModalError: () => void;
  setModalError: (value: ErrorMessage | ErrorContext | null) => void;
  modalErrorObject: ErrorMessage | ErrorContext | null;
  showModal: boolean;
  closeModal: () => void;
  setModal: (value: Message | null) => void;
  modalObject: Message | null;
}

interface ErrorMessage {
  code?: string;
  title: string;
  description: string;
}
interface ErrorContext {
  error: unknown;
  context?: 'terms' | 'login';
}

interface Message {
  title: string;
  description: string;
  actions: [
    {
      text: string;
      variant: 'text' | 'contained' | 'outlined';
      onClick: () => void;
    }
  ];
}

/**
 * Interface representing the properties of the MenuStore.
 *
 * @property {string} currentItem - The currently selected item in the menu.
 * @property {function} setCurrentItem - Function to set the currently selected item in the menu.
 * @property {string} drawerStatus - The status of the drawer (open or closed).
 * @property {function} setDrawerStatus - Function to set the status of the drawer.
 */
export interface MenuStoreProps {
  currentItem: string;
  setCurrentItem: (_item: string) => void;
  drawerStatus: boolean;
  setDrawerStatus: (_status: boolean) => void;
}

/**
 * Interface representing the properties of the NavbarStore.
 *
 * @property {Data | null} navbarObject - The current state of the navbar object.
 * @property {function} setNavbarObject - Function to set the state of the navbar object.
 * @property {string} title - The title of the navbar item.
 * @property {string} description - The description of the navbar item.
 * @property {string} image - The image URL of the navbar item.
 * @property {Array<{label: string, onClick: () => void}>} actions - The actions available for the navbar item.
 */
export interface NavbarStoreProps {
  navbarObject: Data | null;
  setNavbarObject: (value: Data | null) => void;
}

type Data = {
  title: string;
  description: string;
  image: string;
  actions: [
    {
      label: string;
      onClick: () => void;
    }
  ];
};
