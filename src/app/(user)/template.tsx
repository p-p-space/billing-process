'use client';

import Image from 'next/image';
//Internal app
import logo from '%/images/logo.svg';
import { Carousel } from '@/components';
import { RootLayout } from '@/interfaces';

export default function Template({ children }: RootLayout) {
  return (
    <div className="grid lg:grid-cols-2 grip-cols h-screen">
      <div className="col-auto hidden lg:block">
        <div className="block mb-6 absolute top-6 left-6">
          <Image src={logo} alt="logo" width={176} height={40} style={{ margin: 'auto' }} priority />
        </div>
        <Carousel />
      </div>

      <div className="col-auto flex flex-col items-center justify-center bg-white h-full">
        <div className="mt-10 mx-auto sm:max-w-sm w-80">
          <div className="block lg:hidden mb-6">
            <Image src={logo} alt="logo" width={176} height={40} style={{ margin: 'auto' }} priority />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
