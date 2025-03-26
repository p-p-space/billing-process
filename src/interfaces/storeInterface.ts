import { Tenant, TenantSettings } from './appInterface';

export type TenantStore = {
  tenantSett: {
    sessExpTime: TenantSettings['sessExpTime'];
    sessResetTime: TenantSettings['sessResetTime'];
    tenant: Tenant;
    tenantImages: TenantSettings['tenantImages'];
    tenantPwa: TenantSettings['tenantPwa'];
    tenantUri: string;
    webUrl: TenantSettings['webUrl'];
  };
  setTenantSett: (tenantSett: TenantStore['tenantSett']) => void;
};

export type SessionStorage = {
  sessReset: number;
  showModal: boolean;
  timeLeft: number;
  setSessReset: (reset?: number) => void;
  setShowModal: (show: boolean) => void;
  setTimeLeft: (time: number) => void;
  resetSessStore: (time: number) => void;
};

export type RoutesStore = {
  loginRoute: string;
  recoveryRoute: string;
  setRoute: (section: string, newRoute: string) => void;
  resetRouteStore: () => void;
};
