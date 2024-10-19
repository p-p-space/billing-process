'use client';

import Image from 'next/image';
//Internal app
import logo from '%/images/logo.svg';
import { useTranslations } from 'next-intl';

export default function MenuList() {
  const t = useTranslations();
  return (
    <>
      <div>
        <div className="flex items-start flex-col gap-6">
          <Image src={logo} alt="logo" width={176} height={40} priority />
          <h2 className="text-base font-semibold"> {t('App.menu')} </h2>
        </div>

        <nav className="my-4">
          <a
            href="#"
            className="flex gap-2 items-center py-1 px-4 rounded transition duration-200 hover:bg-primary-menu"
          >
            <i className="ri-file-list-3-line text-2xl"></i>
            {t('Menu.purchase-orders')}
          </a>
          <a
            href="#"
            className="flex gap-2 items-center py-1 px-4 rounded transition duration-200 hover:bg-primary-menu"
          >
            <i className="ri-building-4-line text-2xl"></i>
            {t('Menu.companies')}
          </a>
        </nav>

        <div className="flex items-start flex-col gap-6">
          <h2 className="text-base font-semibold"> {t('Menu.config-support')} </h2>
        </div>

        <nav className="my-4">
          <a
            href="#"
            className="flex gap-2 items-center py-1 px-4 rounded transition duration-200 hover:bg-primary-menu"
          >
            <i className="ri-group-line text-2xl"></i>
            {t('Menu.users-roles')}
          </a>
          <a
            href="#"
            className="flex gap-2 items-center py-1 px-4 rounded transition duration-200 hover:bg-primary-menu"
          >
            <i className="ri-user-line text-2xl"></i>
            {t('Menu.user-profile')}
          </a>
          <a
            href="#"
            className="flex gap-2 items-center py-1 px-4 rounded transition duration-200 hover:bg-primary-menu"
          >
            <i className="ri-shield-keyhole-line text-2xl"></i>
            {t('Menu.update-password')}
          </a>
        </nav>
      </div>

      <div>
        <hr className="border-color-primary" />
        <a href="#" className="flex gap-2 items-center py-1 px-4 rounded transition duration-200 hover:bg-primary-menu">
          <i className="ri-logout-circle-r-line text-2xl"></i>
          {t('Menu.log-out')}
        </a>
      </div>
    </>
  );
}
