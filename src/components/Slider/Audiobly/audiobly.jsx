import React, { useState, useRef, useEffect } from "react";
import "./audiobly.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCloudUploadAlt,
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import country_code from "./Countrycode";

const Audiobly = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [original_text, setText] = useState("");
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage1, setTargetLanguage1] = useState("");
  const [targetLanguage2, setTargetLanguage2] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const audioRef = useRef();

  const handleLanguageChange1 = (e) => {
    setTargetLanguage1(e.target.value);
  };

  const handleDeleteData = () => {
    setFile(null);
    setText("");
    setTranslatedText("");
    setAudioSrc("");
  };

  const handleLanguageChange2 = (e) => {
    setTargetLanguage2(e.target.value);
  };
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("target_language", targetLanguage1);

    try {
      const response = await fetch("http://localhost:5000/audiblity", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Response Data:", data);

      setText(data.original_text || "Error extracting text");
      setTranslatedText(data.translated_text || "");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpload = async () => {
    if (!targetLanguage2) {
      alert("Please select a target language");
      return;
    }
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("target_language", targetLanguage2);

    try {
      const response = await fetch("http://localhost:5000/audiblity", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Response Data:", data);

      setTranslatedText(data.translated_text || "");
      setAudioSrc(data.audio || "");
      console.log(translatedText);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while translating. Please try again later.");
    }
  };
  useEffect(() => {
    // Update audio source when translated text changes
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [audioSrc]);

  const toggleMicrophone = () => {
    setIsMicrophoneOn(!isMicrophoneOn);
    if (audioRef.current) {
      if (isMicrophoneOn) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="container-audio">
      <div className="container-main-audio">
        <div className="head-top-audio">
          <div>
            <select
              className="languages-audio"
              onChange={handleLanguageChange1}
              value={targetLanguage1}
            >
              <option value="">Auto Language</option>
              {country_code.map((option) => (
                <option hidden key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="audio-button">
            <button onClick={handleUpload}>TRANSLATOR</button>
          </div>
          <div>
            <select
              className="languages-audio"
              onChange={handleLanguageChange2}
              value={targetLanguage2}
            >
              <option value="" disabled>
                Select Language
              </option>
              {country_code.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mic-icons-audibly">
            <div className="mics-icon-audibly">
              <div className="mics-audibly">
                <FontAwesomeIcon
                  onClick={toggleMicrophone}
                  icon={isMicrophoneOn ? faMicrophone : faMicrophoneSlash}
                />
              </div>
              {audioSrc && (
                <div>
                  <audio ref={audioRef} hidden controls>
                    <source
                      src={`data:audio/mpeg;base64,${audioSrc}`}
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              )}
            </div>
          </div>

          <div onClick={handleDeleteData} className="icon-trash-audio">
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
        <div className="container-boxs-audio">
          <div className="box-left-audio">
            <div className="upload-box-audio">
              <input
                type="file"
                accept=".pdf, .doc, .docx, .txt, .png, .jpg, .jpeg"
                hidden
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              {file ? null : (
                <label
                  htmlFor="file"
                  onClick={() => fileInputRef.current.click()}
                  className="upload-label-audio"
                >
                  UPLOAD
                  <FontAwesomeIcon
                    icon={faCloudUploadAlt}
                    className="icon-audio"
                  />
                </label>
              )}
            </div>

            <div className="box-left-data-audio">
              <div>
                {original_text && (
                  <div className="container-text-audio">{original_text}</div>
                )}
              </div>
            </div>
          </div>
          <div className="box-right-audio">
            <div className="box-right-data">
              {translatedText && (
                <div className="text-audio-right">{translatedText}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audiobly;
