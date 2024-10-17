'use client';

import { FormSignin } from '@/components';

export default function Page() {
  const onSubmit = () => console.log('hola');

  return (
    <>
      <h2 className="text-2xl text-center lg:text-start mb-6 ">Sign in</h2>
      <FormSignin onSubmit={onSubmit} />
    </>
  );
}
