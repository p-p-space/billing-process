'use client';

//Internal app
import MenuList from './MenuList';

export default function Sidebar({ open }: any) {
  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 transform flex flex-col justify-between ${
          open ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out bg-white color-text container-menu z-50 pt-6 px-6 pb-2`}
      >
        <MenuList />
      </div>

      <div
        className={`inset-y-0 left-0 transform hidden lg:flex flex-col justify-between translate-x-0 transition-transform  duration-300 ease-in-out bg-white color-text container-menu z-50 pt-6 px-6 pb-2`}
      >
        <MenuList />
      </div>
    </>
  );
}
