import React, { useState, useRef } from 'react';
import './translator.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCloudUploadAlt,faDownload } from "@fortawesome/free-solid-svg-icons";
import { faClipboard,faCopy } from "@fortawesome/free-regular-svg-icons";
import country_code from './Countrycode';
import FileDownload from 'react-file-download';


const Translator = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [original_text, setText] = useState('');
  const [showTextarea, setShowTextarea] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage1, setTargetLanguage1] = useState('');
  const [targetLanguage2, setTargetLanguage2] = useState('');
  const [inputText, setInputText] = useState(''); 
  const[isCopyTooltipVisible,setIsCopyTooltipVisible]=useState(false);
  const[isCopyIconHovered,setIsCopyIconHovered]=useState(false);
  
  
    const handleDownload = () => {
   
      if (translatedText) {
        FileDownload(translatedText, 'Summary.doc','mm','A4');
        // Download data in the specified format
    } else {
           console.log('No data to download');
           
    }
    };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText)
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
  }
  

  const handleCopyIconHover=()=>{
    setIsCopyIconHovered(true)
  }
  const handleCopyIconLeave=()=>{
    setIsCopyIconHovered(false)
  }
  const handleLanguageChange1 = (e) => {
    setTargetLanguage1(e.target.value);
  };

  const handleDeleteData = () => {
    setFile(null);
    setText('');
    setTranslatedText('');
    setInputText('');
  };
  const handleLanguageChange=(e)=>{
    setInputText(e.target.value)

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('target_language', targetLanguage1);
    formData.append('manual_text', inputText);

    setTargetLanguage1(targetLanguage2);
  }
  const handleLanguageChange2 = (e) => {
    setTargetLanguage2(e.target.value);
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('target_language', targetLanguage1);

    try {
      const response = await fetch('http://localhost:5000/translate', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      console.log('Response Data:', data);
  
      setText(data.original_text || 'Error extracting text');
      setTranslatedText(data.translated_text || '');
    
  
    } catch (error) {
      console.error('Error:', error);
    }
  };
 
const handleUpload = async () => {
  if (!targetLanguage2) {
    alert('Please select a target language');
    return;
  }
  if (!inputText && !file) {
    alert('Please upload a file or enter text for translation');
    return;
  }

  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  formData.append('target_language', targetLanguage2);
  formData.append('manual_text', inputText);

  try {
    const response = await fetch('http://localhost:5000/translate', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log('Response Data:', data);
    

    setText(data.original_text || '');
    setTranslatedText(data.translated_text || '');

  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while translating. Please try again later.');
  }
};


  return (
    <div className='container-trans'>
      <div className='container-main-trans'>
        <div className="head-top-trans">
          <div>
            <select  className='languages-trans' onChange={handleLanguageChange1} value={targetLanguage1}> 
            <option value="">Auto Language</option>
              {country_code.map(option => (
                <option hidden key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div><button className='trans-button' onClick={handleUpload}>TRANSLATOR</button></div>
          <div ><select className='languages-trans' onChange={handleLanguageChange2} value={targetLanguage2}>
          <option value="" disabled>Select Language</option>
            {country_code.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select></div>
          <div onClick={handleDeleteData} className='icon-trash-trans'><FontAwesomeIcon icon={faTrash} /></div>
        </div>
        <div className='container-boxs-trans'>
          <div className='box-left-trans'>
            <div className='upload-box-trans'>
              <input type="file" accept=".pdf, .doc, .docx, .txt, .png, .jpg, .jpeg" hidden onChange={handleFileChange} ref={fileInputRef} />
              {showTextarea ? null : (file ? null : <label htmlFor="file" onClick={() => fileInputRef.current.click()} className='upload-label-trans'>UPLOAD<FontAwesomeIcon icon={faCloudUploadAlt} className='icon' /></label>)}
            </div>
            <div onClick={() => setShowTextarea(true)}>
              {showTextarea ? null : (!file ? <p className="text-label-trans">TEXT<FontAwesomeIcon icon={faClipboard} /></p> : null)}
            </div>
            <div className='box-left-data-trans'>
              {!showTextarea && (
                <div>
                  {original_text && <div className="container-text-trans">{original_text}</div>}
                </div>
              )}
              {showTextarea && (
                <div className='text-area-trans' >
                  <textarea value={inputText} onChange={handleLanguageChange}   placeholder='enter a text' id='text-area-data-trans'></textarea>
                </div>
              )}
            </div>
          </div>
          <div className='box-right-trans'>
            <div className="box-right-keys">
              {translatedText  && <div><div className="text-trans-right">{translatedText}</div><div className='text-trans-copy-download'> <span onClick={handleCopy} onMouseEnter={handleCopyIconHover} onMouseLeave={handleCopyIconLeave}><FontAwesomeIcon id='text-trans-copy' icon={faCopy} /></span>
                <FontAwesomeIcon id='text-trans-download'icon={faDownload}onClick={handleDownload}/></div> 
              {isCopyTooltipVisible&&(
                <div className='copy-tooltip-tecd'>TextCopied</div>
              )}
              {isCopyIconHovered&&!isCopyTooltipVisible&&(
                <div className='copy-tooltip'>Copy All Text</div>
              )}
              </div>}               
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Translator;


