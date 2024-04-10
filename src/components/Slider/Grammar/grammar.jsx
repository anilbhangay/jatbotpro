import React, { useState, useRef } from "react";
import "./grammar.css";
import country_code from "./Countrycode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCloudUploadAlt,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { faClipboard, faCopy } from "@fortawesome/free-regular-svg-icons";
import FileDownload from "react-file-download";

const Grammar = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [original_text, setText] = useState("");
  const [showTextarea, setShowTextarea] = useState(false);
  const [inputText, setInputText] = useState("");
  const [grammerCheck, setGrammerCheck] = useState("");
  const [isCopyTooltipVisible, setIsCopyTooltipVisible] = useState(false);
  const [isCopyIconHovered, setIsCopyIconHovered] = useState(false);

  const handleDownload = () => {
    if (grammerCheck) {
      FileDownload(grammerCheck, "Summary.doc", "mm", "A4");
      // Download data in the specified format
    } else {
      console.log("No data to download");
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(grammerCheck)
      .then(() => {
        setIsCopyTooltipVisible(true);
        setTimeout(() => {
          setIsCopyTooltipVisible(false);
        }, 3000);
      })
      .catch((error) => {
        //console.error('Error copying text:', error);
        // Handle error if needed
      });
  };

  const handleCopyIconHover = () => {
    setIsCopyIconHovered(true);
  };
  const handleCopyIconLeave = () => {
    setIsCopyIconHovered(false);
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("target_language", "");

    console.log(selectedFile);

    try {
      const response = await fetch("http://localhost:5000/Grammer_Checker", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setText(data.original_text || "Error extracting text");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleUpload = async (e) => {
    if (!inputText && !file) {
      alert("Please upload a file or enter text for translation");
      return;
    }

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("manual_text", inputText);

    try {
      const response = await fetch("http://localhost:5000/Grammer_Checker", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      setText(data.original_text || "");
      if (data.corrected_sentences) {
        const parsedText = parseGrammarCheck(data.corrected_sentences);
        setGrammerCheck(parsedText);
      } else {
        setGrammerCheck("");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while translating. Please try again later.");
    }
  };

  const parseGrammarCheck = (text) => {
    // Replace escape sequences and symbols with an empty string
    const cleanedText = text.replace(/\\[.*?m/g, "").replace(/\[.*?[\s]/g, "");

    // Remove leading and trailing spaces
    const trimmedText = cleanedText.trim();
    return trimmedText; // Return the array of parsed sentences
  };

  const handleDelete = () => {
    setInputText("");
    setGrammerCheck("");
    setFile("");
  };

  return (
    <div className="container-gram">
      <div className="container-main-gram">
        <div className="head-top-gram">
          <div>
            <select className="languages-gram">
              {country_code.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button className="gram-button" onClick={handleUpload}>
              GRAMMAR CHECK
            </button>
          </div>
          <div className="trash-gram" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
        <div className="container-boxs-gram">
          <div className="box-left-gram">
            <div className="box-left-data-gram">
              <div className="upload-box-gram">
                <input
                  type="file"
                  accept=".pdf, .doc, .docx, .txt, .png, .jpg, .jpeg"
                  hidden
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                {showTextarea ? null : file ? null : (
                  <label
                    htmlFor="file"
                    onClick={() => fileInputRef.current.click()}
                    className="upload-label-trans"
                  >
                    UPLOAD
                    <FontAwesomeIcon icon={faCloudUploadAlt} className="icon" />
                  </label>
                )}
              </div>
              <div onClick={() => setShowTextarea(true)}>
                {showTextarea ? null : !file ? (
                  <p className="text-label-trans">
                    PASTE TEXT
                    <FontAwesomeIcon icon={faClipboard} />
                  </p>
                ) : null}
              </div>
            </div>
            <div className="box-left-text-gram">
              {!showTextarea && file && (
                <div className="upload-text-gram">
                  <textarea
                    value={original_text}
                    onChange={(e) => setText(e.target.value)}
                    id="text-margin-gram"
                  />
                </div>
              )}
              {showTextarea && (
                <div className="text-area-gram">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="enter a text"
                    id="text-area-data-gram"
                  ></textarea>
                </div>
              )}
            </div>
          </div>
          <div className="box-right-gram">
            <div className="box-right-text-gram">
              {grammerCheck && (
                <div>
                  <textarea
                    value={grammerCheck}
                    color="Red"
                    id="textarea-right-gram"
                  ></textarea>
                  <div className="text-gram-copy-download">
                    <span
                      onClick={handleCopy}
                      onMouseEnter={handleCopyIconHover}
                      onMouseLeave={handleCopyIconLeave}
                    >
                      <FontAwesomeIcon id="text-gram-copy" icon={faCopy} />
                    </span>
                    <FontAwesomeIcon
                      id="text-gram-download"
                      icon={faDownload}
                      onClick={handleDownload}
                    />
                    {isCopyTooltipVisible && (
                      <div className="copy-tooltip-tecd-gram">Text Copied</div>
                    )}
                    {isCopyIconHovered && !isCopyTooltipVisible && (
                      <div className="copy-tooltip-gram">Copy All Text</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grammar;
