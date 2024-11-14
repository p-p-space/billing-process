import { create } from 'zustand';
import { persist } from 'zustand/middleware';
//Internal app
import { MenuStoreProps } from '@/interfaces';

/**
 * Store for navMenu
 *
 * @example
 * ```tsx
 * import { useMenuStore } from '@/store/useMenuStore';
 *
 * const currentItem = useMenuStore((state) => state.currentItem);
 * const setCurrentItem = useMenuStore((state) => state.setCurrentItem);
 * const drawerStatus = useMenuStore((state) => state.drawerStatus);
 * const setDrawerStatus = useMenuStore((state) => state.setDrawerStatus);
 * ```
 *
 * @returns {object} The state and actions of the menu store.
 * @property {string} currentItem - The current item in the menu.
 * @property {function} setCurrentItem - Function to set the current item in the menu.
 * @property {boolean} drawerStatus - The current status of the drawer.
 * @property {function} setDrawerStatus - Function to set the status of the drawer.
 */
export const useMenuStore = create<MenuStoreProps>()(
  persist(
    (set) => ({
      currentItem: 'purchase',

      setCurrentItem: (item) => set({ currentItem: item }),

      drawerStatus: false,

      setDrawerStatus: (status) => set({ drawerStatus: status }),
    }),
    { name: 'menu-store', version: undefined }
  )
);
