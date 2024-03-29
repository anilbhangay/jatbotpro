import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMicrophone, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import './voice.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Voice = () => {
  const [inputText, setInputText] = useState('');
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);
  const [corrections, setCorrections] = useState({});
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [hover,setHover]=useState(false)
   

  const toggleMicrophone = () => {
    if (!isMicrophoneOn) {
      SpeechRecognition.startListening({ continuous: true, language: 'en-In'});
      setTimeout(() => {
        SpeechRecognition.stopListening();
        setIsMicrophoneOn(false);
      }, 300000);
    } else {
      SpeechRecognition.stopListening();
    }
    setIsMicrophoneOn(!isMicrophoneOn);
  };


  useEffect(() => {
    if (transcript && isMicrophoneOn) {
      setInputText(prevText => prevText+''+transcript);
      handleTextChange( ''+transcript);
    }
  }, [transcript, isMicrophoneOn]);
 
  
  const handleTextChange = async (newText) => {
    setInputText(newText);
    // Fetch spelling suggestions
    try {
      const response = await fetch('http://localhost:5000/suggest-corrections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure correct Content-Type header
        },
        body: JSON.stringify({ text: newText }),
      });

      const data = await response.json();
      setCorrections(data.corrections);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleDeleteData = () => {
    setInputText('');
    setCorrections('');
   setIsMicrophoneOn('')
  };
  const handleHover = (word) => {
    setHover(word);
  };

  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser doesn't support speech recognition. Please use a different browser.</div>;
  }

  return (
    <div className='container-voice'>
      <div className='container-main-voice'>
        <div className="head-top-voice">
          <div className='mics-voice' onClick={toggleMicrophone}>
            <FontAwesomeIcon icon={isMicrophoneOn ? faMicrophone : faMicrophoneSlash} />
          </div>
          <div className='icon-trash-voice' onClick={handleDeleteData}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
        <div className='container-boxs-voice'>
          <div className='box-left-voice'>
            <div className='text-area-voice'>
              <textarea
                value={inputText} 
                onChange={(e)=>handleTextChange(e.target.value)}
                placeholder='Speak or enter text...'
                id='text-area-data-voice'
               onMouseEnter={handleHover}
              >  
              </textarea>
              {hover && corrections[hover] && (
                <div> 
                  <ul>
                    {corrections[hover].map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>   
                </div>
              )}
            </div>
          </div>
          <div className='box-right-voice'>
            <div className='box-right-data-textheader'>
              <strong>Spelling Suggestions:</strong>
            </div>
            <div className="box-right-data-voice" >
              <ul  id='list-dots'>
                {Object.entries(corrections).map(([word, suggestions], index) => (
                  <li key={index}>
                    <strong>{suggestions}</strong>  
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voice;