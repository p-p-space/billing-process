'use client';

import Image from 'next/image';
//Internal app
import usersLogo from '%/images/users.png';

export default function Nabvar(props: { toggleSidebar: () => void }) {
  const { toggleSidebar } = props;

  return (
    <div className="navbar">
      <div className="flex justify-between items-center w-full h-full">
        <div className="flex p-4 items-center">
          <button onClick={toggleSidebar} className="text-white focus:outline-none lg:hidden pr-3 ">
            <i className="ri-menu-line text-2xl"></i>
          </button>
          <h1 className="text-xl text-white">Purchase orders (PO)</h1>
        </div>

        <div className="flex items-center justify-center">
          <div className="avatar">M</div>
          <div>
            <h2 className="text-lg  text-white">John Doe</h2>
            <p className="text-sm text-white">Compliance Officer</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-4 hidden lg:block">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <h1 className="text-xl text-white">
              In this section, you can efficiently manage all activities related to your purchase orders. Access
              detailed data, track status and perform customized searches. If you need to create a new purchase order,
              enter through the following button.
            </h1>
            <button
              onClick={toggleSidebar}
              className="border border-white text-white hover:bg-white hover:text-gray-600 font-semibold my-6 py-2 px-4 rounded transition duration-300"
            >
              New purchase order
            </button>
          </div>
          <div className="col-span-4 flex items-end">
            <Image src={usersLogo} alt="Business" width={264} height={162} priority />
          </div>
        </div>
      </div>
    </div>
  );
}
