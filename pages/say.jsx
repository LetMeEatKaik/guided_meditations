import React from 'react';
import Says from '../components/SayComp'
// import './styles.css'; // import DaisyUI CSS

function MyDaisyUILayout() {
  return (
    <div className="p-4">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Text to Speech</h1>
          <Says noSsr/>
        <div className="flex justify-center mt-4">
          <a href="#" className="bg-secondary text-white py-2 px-4 rounded-md hover:bg-secondary-focus focus:bg-secondary-focus">
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}

export default MyDaisyUILayout;
