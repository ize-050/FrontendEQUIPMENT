'use client';

import { useState, useEffect } from 'react';

export default function BenefitsCycle({ benefits }) {
  const [currentBenefit, setCurrentBenefit] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefit((prev) => (prev + 1) % benefits.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [benefits.length]);

  const benefit = benefits[currentBenefit];

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-auto transform hover:scale-105 transition-all duration-500">
      <div className="mb-4 flex justify-center">
        {benefit.icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-800">
        {benefit.title}
      </h3>
      <p className="text-gray-600 text-lg">
        {benefit.description}
      </p>
    </div>
  );
}
