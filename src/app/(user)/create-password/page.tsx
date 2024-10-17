'use client';

import { FormCreatePassword } from '@/components';

export default function Page() {
  const onSubmit = () => console.log('hola');

  return (
    <>
      <h2 className="text-2xl text-center lg:text-start mb-6 ">Create Password</h2>
      <FormCreatePassword onSubmit={onSubmit} />
    </>
  );
}
