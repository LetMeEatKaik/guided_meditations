import React, { useState } from 'react';
import Says from '../components/SayComp';
import WhoAmI from '../components/WhoAmI';


function MyDaisyUILayout() {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`p-4 ${isDark ? 'bg-gray-800' : 'bg-gradient-to-r from-teal-400 to-blue-500'} h-screen`}>
      <div className="max-w-lg mx-auto rounded-lg shadow-lg p-6">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Text to Speech</h1>
        <Says noSsr />
      </div>
      <div className="flex justify-center mt-4">
        <button className={`btn btn-lg ${isDark ? 'btn-primary' : 'btn-secondary'}`} onClick={toggleDarkMode}>
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <br />
      <p className="text-sm text-white">
        This experiment explores ways we can create our own trance and guided meditation scripts
        for health and well-being.
      </p>
    </div>
  );
}

export default MyDaisyUILayout;
