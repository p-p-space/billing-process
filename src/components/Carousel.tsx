'use client';

import Image from 'next/image';
import { useState } from 'react';
//Internal app
import screen1 from '%/images/screen1.svg';
import screen2 from '%/images/screen2.svg';

export default function Carousel() {
  const [currentStep, setCurrentStep] = useState(0);
  console.log('🚀 ~ Carousel ~ currentStep:', currentStep);
  const steps = [
    {
      image: screen1,
      title: 'Adapt',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
    },
    {
      image: screen2,
      title: 'Scale',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
    },
  ];

  const nextStep = () => {
    setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => (prevStep - 1 + steps.length) % steps.length);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-custom-container">
      <div className="w-full max-w-lg rounded-lg p-6">
        <div className="block mb-6">
          <Image src={steps[currentStep].image} alt="screen" style={{ margin: 'auto' }} width={210} height={200} />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">{steps[currentStep].title}</h2>
        <p className="mb-6 text-center">{steps[currentStep].content}</p>
        <div className="flex justify-between max-w-sm m-auto items-center ">
          <button onClick={prevStep} className="btn-circle">
            <i className="ri-arrow-left-line"></i>
          </button>
          {currentStep == 0 ? (
            <div className="flex justify-between gap-6">
              <hr className="hr-slider active" /> <hr className="hr-slider inactive" />
            </div>
          ) : (
            <div className="flex justify-between gap-6">
              <hr className="hr-slider inactive" /> <hr className="hr-slider active" />
            </div>
          )}

          <button onClick={nextStep} className="btn-circle">
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
