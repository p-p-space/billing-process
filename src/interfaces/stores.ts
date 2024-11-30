/**
 * Interface representing the properties of the UiStore.
 *
 * @property {boolean} loadingScreen - Indicates if the loading screen is visible.
 * @property {function} setLoadingScreen - Function to set the loading screen visibility.
 * @property {boolean} showModalError - Indicates if the error modal is visible.
 * @property {function} closeModalError - Function to close the error modal.
 * @property {function} setModalError - Function to set the error modal object.
 * @property {ErrorMessage | ErrorContext | null} modalErrorObject - The error modal object.
 * @property {boolean} showModal - Indicates if the modal is visible.
 * @property {function} closeModal - Function to close the modal.
 * @property {function} setModal - Function to set the modal object.
 * @property {Message | null} modalObject - The modal object.
 */
export interface UiStore {
  loadingScreen: boolean;
  setLoadingScreen: (status: boolean) => void;
  showModalError: boolean;
  closeModalError: () => void;
  setModalError: (value: ErrorMessage | null) => void;
  modalErrorObject: ErrorMessage | null;
  showModalSuccess: boolean;
  closeModalSuccess: () => void;
  setModalSuccess: (value: ErrorMessage | null) => void;
  modalSuccessObject: ErrorMessage | null;
  showModal: boolean;
  closeModal: () => void;
  setModal: (value: Message | null) => void;
  modalObject: Message | null;
}

/**
 * Interface representing an error message.
 *
 * @property {string} [code] - The error code.
 * @property {string} title - The title of the error.
 * @property {string} description - The description of the error.
 */
interface ErrorMessage {
  code?: string;
  title: string;
  description: string;
}

/**
 * Interface representing a message.
 *
 * @property {string} title - The title of the message.
 * @property {string} description - The description of the message.
 * @property {Array<{text: string, variant: 'text' | 'contained' | 'outlined', onClick: () => void}>} actions - The actions available for the message.
 */
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
 * @property {boolean} drawerStatus - The status of the drawer (open or closed).
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
 */
export interface NavbarStoreProps {
  navbarObject: Data | null;
  setNavbarObject: (value: Data | null) => void;
}

/**
 * Type representing the data of a navbar item.
 *
 * @property {string} title - The title of the navbar item.
 * @property {string} [description] - The description of the navbar item.
 * @property {string} [image] - The image URL of the navbar item.
 * @property {Array<{label: string, onClick: () => void}>} [actions] - The actions available for the navbar item.
 */
type Data = {
  title: string;
  description?: string;
  image?: string;
  actions?: [
    {
      label: string;
      onClick: () => void;
    }
  ];
};
