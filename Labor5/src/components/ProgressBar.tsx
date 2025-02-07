import React from 'react';

const ProgressBar = ({ step }: { step: number }) => (
  <div className="flex items-center space-x-2">
    {[1, 2, 3].map((s) => (
      <div key={s} className={`w-4 h-4 rounded-full ${s <= step ? 'bg-primary' : 'bg-gray-300'}`} />
    ))}
    {[1, 2].map((s) => (
      <div key={s} className={`flex-1 h-1 ${s < step ? 'bg-primary' : 'bg-gray-300'}`} />
    ))}
  </div>
);

export default ProgressBar;