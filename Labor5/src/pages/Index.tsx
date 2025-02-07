import React, { useState } from 'react';
import Logo from '@/components/Logo';
import ProgressBar from '@/components/ProgressBar';
import Registration from '@/components/Registration';
import ProfileInfo from '@/components/ProfileInfo';

const Index = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <Logo />
        <ProgressBar step={step} />
        {step === 1 ? (
          <Registration onComplete={() => setStep(2)} />
        ) : (
          <ProfileInfo />
        )}
      </div>
    </div>
  );
};

export default Index;