'use client';

import Image from 'next/image';
//Internal app
import logo from '%/images/logo.svg';

export default function MenuList() {
  return (
    <>
      <div>
        <div className="flex items-start flex-col gap-6">
          <Image src={logo} alt="logo" width={176} height={40} priority />
          <h2 className="text-base font-semibold">MENU</h2>
        </div>

        <nav className="my-4">
          <a
            href="#"
            className="flex gap-2 items-center py-1 px-4 rounded transition duration-200 hover:bg-primary-menu"
          >
            <i className="ri-file-list-3-line text-2xl"></i> Purchase orders
          </a>
          <a
            href="#"
            className="flex gap-2 items-center py-1 px-4 rounded transition duration-200 hover:bg-primary-menu"
          >
            <i className="ri-building-4-line text-2xl"></i>Companies
          </a>
        </nav>

        <div className="flex items-start flex-col gap-6">
          <h2 className="text-base font-semibold">CONFIG & SUPPORT</h2>
        </div>

        <nav className="my-4">
          <a
            href="#"
            className="flex gap-2 items-center py-1 px-4 rounded transition duration-200 hover:bg-primary-menu"
          >
            <i className="ri-group-line text-2xl"></i>Users & Roles
          </a>
          <a
            href="#"
            className="flex gap-2 items-center py-1 px-4 rounded transition duration-200 hover:bg-primary-menu"
          >
            <i className="ri-user-line text-2xl"></i>User profile
          </a>
          <a
            href="#"
            className="flex gap-2 items-center py-1 px-4 rounded transition duration-200 hover:bg-primary-menu"
          >
            <i className="ri-shield-keyhole-line text-2xl"></i> Update password
          </a>
        </nav>
      </div>

      <div>
        <hr className="border-color-primary" />
        <a href="#" className="flex gap-2 items-center py-1 px-4 rounded transition duration-200 hover:bg-primary-menu">
          <i className="ri-logout-circle-r-line text-2xl"></i>
          Log out
        </a>
      </div>
    </>
  );
}
