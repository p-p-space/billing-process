import { create } from 'zustand';
//Internal app
import { UiStore } from '@/interfaces';

/**
 * Store and change states for show/hide elements in UI.
 *
 * @example
 * ```tsx
 * import { useUiStore } from '@/store/useUiStore';
 *
 * const loadingScreen = useUiStore((state) => state.loadingScreen);
 * const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);
 * const showModalError = useUiStore((state) => state.showModalError);
 * const setModalError = useUiStore((state) => state.setModalError);
 * const closeModalError = useUiStore((state) => state.closeModalError);
 * const modalErrorObject = useUiStore((state) => state.modalErrorObject);
 * const modalObject = useUiStore((state) => state.modalObject);
 * const showModal = useUiStore((state) => state.showModal);
 * const closeModal = useUiStore((state) => state.closeModal);
 * const setModal = useUiStore((state) => state.setModal);
 * ```
 *
 * @returns {object} The state and actions of the UI store.
 * @property {boolean} loadingScreen - The current state of the loading screen.
 * @property {function} setLoadingScreen - Function to set the status of the loading screen.
 * @property {boolean} showModalError - The current state of the modal error.
 * @property {function} setModalError - Function to set the modal error.
 * @property {function} closeModalError - Function to close the modal error.
 * @property {any} modalErrorObject - The object containing details of the modal error.
 * @property {any} modalObject - The object containing details of the global modal.
 * @property {boolean} showModal - The current state of the global modal.
 * @property {function} closeModal - Function to close the global modal.
 * @property {function} setModal - Function to set the global modal.
 */
export const useUiStore = create<UiStore>()((set) => ({
  /*Big Modal*/
  loadingScreen: false,

  setLoadingScreen: (status: boolean) => set(() => ({ loadingScreen: status })),

  /*Notification error */
  modalErrorObject: null,

  showModalError: false,

  closeModalError: () => set({ showModalError: false }),

  setModalError: (value) => set({ showModalError: true, modalErrorObject: value }),

  /*Notification success */
  modalSuccessObject: null,

  showModalSuccess: false,

  closeModalSuccess: () => set({ showModalSuccess: false }),

  setModalSuccess: (value) => set({ showModalSuccess: true, modalSuccessObject: value }),

  /*Global Modal */
  modalObject: null,

  showModal: false,

  closeModal: () => set({ showModal: false }),

  setModal: (value) => set({ showModal: true, modalObject: value }),
}));
