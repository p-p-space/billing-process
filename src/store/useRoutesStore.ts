import { type StateCreator, create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
//internal app
import { RoutesStore } from '@/interfaces';

const storeApi: StateCreator<RoutesStore, [['zustand/devtools', never]]> = (set) => ({
  loginRoute: 'login',
  recoveryRoute: 'requestCode',
  setRoute: (section, newRoute) => set(() => ({ [section]: newRoute }), false, 'setRoute'),
});

/**
 * Zustand store for managing application routes.
 *
 * @example
 * ```tsx
 * import { useRoutesStore } from '@/store/useRoutesStore';
 *
 * const loginRoute = useRoutesStore((state) => state.loginRoute);
 * const recoveryRoute = useRoutesStore((state) => state.recoveryRoute);
 * const profileRoute = useRoutesStore((state) => state.profileRoute);
 * const setRoute = useRoutesStore((state) => state.setRoute);
 * ```
 *
 * @returns {object} The state and actions of the routes store.
 * @property {string} loginRoute - The current route for the login page.
 * @property {string} recoveryRoute - The current route for the password recovery page.
 * @property {function} setRoute - Function to set a new route for a given section.
 */
export const useRoutesStore = create<RoutesStore>()(
  devtools(
    persist(storeApi, {
      name: 'routes-store',
      storage: createJSONStorage(() => sessionStorage),
    })
  )
);
