'use client';

import { useEffect, useState } from 'react';
// Internal app
import { useUserStore } from '@/store';
import { ChildrenProps, DataServerProps } from '@/interfaces';

export default function DashboardProvider({ children, userAttr }: ChildrenProps & DataServerProps) {
  const setUserAttr = useUserStore((state) => state.setUserAttr);
  const [dashboarLoad, setDashboarLoad] = useState(false);

  useEffect(() => {
    setUserAttr(userAttr);
    setDashboarLoad(true);
  }, [setUserAttr, userAttr]);

  if (dashboarLoad) {
    return <>{children}</>;
  }
}
