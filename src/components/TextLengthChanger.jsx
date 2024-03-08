import React, { useState } from 'react';
import './TextLengthChanger.css';


function TextLengthChanger() {
  const [text, setText] = useState('');
  const handleChange = (e) => {
    setText(e.target.value);
  };

  // Function to calculate font size based on text length
  const calculateFontSize = () => {
    const baseFontSize = 10; // Base font size in pixels
    const maxLength = 100; // Maximum length of text
    const lengthRatio = Math.min(text.length / maxLength, 1); // Calculate ratio of current length to maximum length
    const newSize = baseFontSize + lengthRatio * 20; // Adjust font size based on the ratio
    return `${newSize}px`; // Return font size as string
  };

  return (
    <div className="text-length-changer">
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Type something..."  
      />
      <p style={{ fontSize: calculateFontSize() }}>{text}</p>
    </div>
  );
}
   

export default TextLengthChanger;
