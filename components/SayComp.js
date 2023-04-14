import React, { useState, useEffect, useRef } from 'react';
import anxiety from './scripts/reduce_anxiety.js'

export default function Say() {
  const [text, setText] = useState(anxiety);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speed, setSpeed] = useState(70);
  const [textareaRows, setTextareaRows] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [buttonText, setButtonText] = useState("Say it");

  // const audioRef2 = useRef(null);

  // const handleSay = () => {
  //   if (!isPlaying) {
  //     const speech = new SpeechSynthesisUtterance(text);
  //     if (selectedVoice !== null) {
  //       speech.voice = selectedVoice;
  //     }
  //     speech.rate = speed / 100;
  //     speechSynthesis.speak(speech);
  //     console.log("isPlaying", isPlaying)

  //     const audio = new Audio('/resources/relax.mp3');
  //     audio.play();
  //     console.log(audio)
  //     setIsPlaying(true);
  //     setButtonText("Stop");

  //     audio.addEventListener('ended', () => {
  //       setIsPlaying(false);
  //     });
  //   } else {
  //     speechSynthesis.cancel();
  //     if (audioRef.current !== null) {
  //       audioRef.current.pause();
  //     }
  //     audio.stop()
  //     setIsPlaying(false);
  //     setButtonText("Say it");
  //   }
  // 
  // let audio = new Audio('/resources/relax.mp3');
  let audio;
  const handleSay = () => {
    if (!isPlaying) {
      const speech = new SpeechSynthesisUtterance(text);
      if (selectedVoice !== null) {
        speech.voice = selectedVoice;
      }
      speech.rate = speed / 100;
      speechSynthesis.speak(speech);
      console.log("isPlaying", isPlaying)

      const audio = new Audio('/resources/relax.mp3');
      audio.play();
      console.log(audio)
      setIsPlaying(true);
      setButtonText("Stop");

      audio.addEventListener('ended', () => {
        setIsPlaying(false);
      });

      audioRef.current = audio; // Assign the audio object to the ref
    } else {
      speechSynthesis.cancel();
      if (audioRef.current instanceof Audio) {
        audioRef.current.pause();
        setIsPlaying(false);
        setButtonText("Say it");
      }
    }
  };



  const handleVoicesChanged = () => {
    const availableVoices = speechSynthesis.getVoices();
    setVoices(availableVoices);

    const selected = availableVoices.find(
      (voice) =>
        voice.name === "Microsoft Natasha Online (Natural) - English (Australia)"
    );
    if (selected !== undefined) {
      setSelectedVoice(selected);
    }
  };

  // useEffect(() => {
  //   if (audioRef2.current !== null) {
  //     audioRef2.current.onerror = (e) => {
  //       console.error("Audio error", e);
  //     };
  //   }
  // }, []);

  const handleSelectVoice = (event) => {
    const selected = voices.find((voice) => voice.name === event.target.value);
    if (selected !== undefined) {
      setSelectedVoice(selected);
    }
  };

  const handleTextareaChange = (event) => {
    setText(event.target.value);
    const numNewlines = (event.target.value.match(/\n/g) || []).length + 1;
    setTextareaRows(numNewlines);
  };

  const audioRef = useRef(null);

  useEffect(() => {
    speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    handleVoicesChanged();
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      setIsPlaying(false);
      setButtonText("Say it");
    };
  }, []);


  return (
    <div className="p-4">
      <div className="flex flex-col space-y-4">
        <textarea
          placeholder="Input what you'd like me to read"
          className="textarea textarea-bordered textarea-lg w-full max-w-xs"
          value={text}
          onChange={handleTextareaChange}
          rows={textareaRows}
        />

        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <label htmlFor="speedSlider" className="text-gray-600">
              Speech Speed:
            </label>
            <label htmlFor="speedSliderValue" style={{ color: 'white' }}>{speed}</label>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={speed}
            className="range range-lg"
            id="speedSlider"
            onChange={(e) => setSpeed(parseInt(e.target.value))}
          />
        </div>

        <div className="flex space-x-2">
          <button className="btn btn-primary" onClick={handleSay}>
            {buttonText}
          </button>
        </div>

        {/* <select className="form-select" onChange={handleSelectVoice}>
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select> */}

        <select className="form-select" onChange={handleSelectVoice}>
          {voices.map((voice) => (
            <option
              key={voice.name}
              value={voice.name}
              selected={voice.name === "Microsoft Natasha Online (Natural) - English (Australia)"}
            >
              {voice.name}
            </option>
          ))}
        </select>
      </div>
   
    </div>
  );
}