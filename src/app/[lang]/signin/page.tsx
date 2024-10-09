import Image from 'next/image';
//Internal app
import logo from '%/images/logo.svg';
import { Carousel } from '@/components';
import { PageProps } from '@/interfaces';
import { getDictionary } from '../dictionaries';

export default async function Page({ params: { lang } }: PageProps) {
  const dict = await getDictionary(lang);

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
          <h2 className="text-2xl text-center lg:text-start mb-6 ">{dict.signin}</h2>
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                {dict.email}
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="input-custom no-focus"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                {dict.password}
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="input-custom no-focus"
                />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center btn-primary">
                {dict.signin}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
