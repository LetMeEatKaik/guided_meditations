import React, { useState, useEffect } from 'react';

export default function Say() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speed, setSpeed] = useState(70);

  const handleSpeak = async () => {
    const speech = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      speech.voice = selectedVoice;
    }
    speech.rate = speed / 100;
    speechSynthesis.speak(speech);
  };

  const handleSay = () => {
    const speech = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      speech.voice = selectedVoice;
    }
    speechSynthesis.speak(speech);
  };

  const handleVoicesChanged = () => {
    const availableVoices = speechSynthesis.getVoices();
    setVoices(availableVoices);
    setSelectedVoice(availableVoices.find((voice) => voice.default));
  };

  const handleSelectVoice = (event) => {
    setSelectedVoice(voices.find((voice) => voice.name === event.target.value));
  };

  useEffect(() => {
    speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    handleVoicesChanged();
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
    };
  }, []);

  return (
    <div>
      <textarea
        placeholder="Input what you'd like me to read"
        className="textarea textarea-bordered textarea-lg w-full max-w-xs"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          e.target.rows = e.target.value.split("\n").length;
        }}
        rows={1}
      />

      <div className="flex space-x-2">
        <button className="btn btn-primary" onClick={handleSay}>
          Say it
        </button>
        
        <div className="flex items-center space-x-2">
          <label htmlFor="speedSlider" className="text-gray-600">
            Speech Speed:
          </label>

          <input
            type="range"
            min="0"
            max="100"
            value={speed}
            className="range range-lg"
            id="speedSlider"
            onChange={(e) => setSpeed(e.target.value)}
          />
        </div>
      </div>

      <select className="form-select" onChange={handleSelectVoice}>
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select>
    </div>
  );
}
