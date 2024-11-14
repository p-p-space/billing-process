import { create } from 'zustand';
import { persist } from 'zustand/middleware';
//Internal app
import { NavbarStoreProps } from '@/interfaces';

/**
 * Zustand store for managing the state of the navbar.
 *
 * @returns {NavbarStoreProps} The properties and methods for managing the navbar state.
 * @property {Data | null} navbarObject - The current state of the navbar object.
 * @property {function} setNavbarObject - Function to set the state of the navbar object.
 */
export const useNavbarStore = create<NavbarStoreProps>()(
  persist(
    (set) => ({
      navbarObject: null,

      setNavbarObject: (value) => set({ navbarObject: value }),
    }),
    { name: 'navbar-store', version: undefined }
  )
);
