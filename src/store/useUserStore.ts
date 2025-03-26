import { devtools } from 'zustand/middleware';
import { type StateCreator, create } from 'zustand';
//internal app
import { UserStore } from '@/interfaces';

const userInit = {
  email: '',
  userAttr: {},
};

const storeUser: StateCreator<UserStore, [['zustand/devtools', never]]> = (set) => ({
  ...userInit,

  setEmail: (email) => set(() => ({ email }), false, 'setEmail'),
  setUserAttr: (attr) => set((state) => ({ userAttr: { ...state.userAttr, ...attr } }), false, 'setUserAttr'),
  resetUserStore: () => set(() => userInit, false, 'resetUserStore'),
});

/**
 * Zustand store for managing user state, specifically for password recovery.
 *
 * @example
 * ```tsx
 * import { useUserStore } from '@/store/useUserStore';
 *
 * const email = useUserStore((state) => state.email);¿
 * const setEmail = useUserStore((state) => state.setEmail);
 * ```
 *
 * @returns {object} The state and actions of the user store.
 * @property {string} email - The email of the user.
 * @property {function} setEmail - Function to set the email value.
 * @property {object} userAttr - attributes from cognito user info
 * @property {function} setUserAttr - set the attributes value
 */
export const useUserStore = create<UserStore>()(devtools(storeUser, { name: 'userStore' }));
