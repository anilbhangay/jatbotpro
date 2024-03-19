
import React, { useRef, useState, useEffect } from 'react';
import './summarizer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faTrashCan, faSquarePollVertical, faCircleArrowDown, faCopy, faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import FileDownload from 'react-file-download';
import axios from 'axios';



function Tabs() {
  const fileInputRef = useRef(null);
  const [leftSide, setLeftSide] = useState({});
  const [rightSide, setRightSide] = useState({});
  const [sentNumber, setSentNumber] = useState(5);
  const [isCopyTooltipVisible, setIsCopyTooltipVisible] = useState(false);
  const [isCopyIconHovered, setIsCopyIconHovered] = useState(false);
  const [isUploadIconHovered, setIsUploadIconHovered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteTooltipVisible, setIsDeleteTooltipVisible] = useState(false);
  const [isStatTooltipVisible, setIsStatTooltipVisible] = useState(false);
  const [userType, setUserType] = useState("paragraph");
  const [file, setFile] = useState(null);
  const [summaryLength, setSummaryLength] = useState('medium');
  const [uploadButtonVisible, setUploadButtonVisible] = useState(true);
  const [showSentIconSection, setShowSentIconSection] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false); 
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [activeKeywords, setActiveKeywords] = useState([]);
  const [clearAllButtonVisible, setClearAllButtonVisible] = useState(true);
  // const [modeContainerWidth, setModeContainerWidth] = useState('max');
  

  
  const stepOptions = ['Very_Short', 'Short', 'Medium', 'Long'];

  const handleStatIconClick = () => {
    setShowStatistics(!showStatistics); 
  };
  
  const handleSentNumberChange = (e) => {
    setSentNumber(parseInt(e.target.value, 10));
  };

  const handleFileChange = async (e) => {
    setFile(e.target.files[0]);
    setUploadButtonVisible(false);
    // handleModeContainerWidthChange('min');

    const formData = new FormData();
    formData.append('file', e.target.files[0]);
  };

  const handleSummaryLengthChange = (e) => {
    setSummaryLength(stepOptions[parseInt(e.target.value, 10)]);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
    setIsUploadIconHovered(false);
  }

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    // handleModeContainerWidthChange('min'); 
  };


  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    
    const apiUrl = `http://localhost:5000/upload?type=${userType}&summary_length=${summaryLength}`;
    const requestData = userType === "paragraph" ? { sent_number: sentNumber } : {selected_Keyword: selectedKeywords.join(','),  sent_number: sentNumber };
  
    axios.post(apiUrl, formData, { params: requestData })
      .then(response => {
        setRightSide(response.data);
        setShowSentIconSection(true); 
        // handleModeContainerWidthChange('max');
      })
      .catch(error => {
        console.error('Error generating summary: ', error);
      });
  };
   
   const handleKeywordClick = (keyword) => {
    const updatedSelectedKeywords = selectedKeywords.includes(keyword)  
          ? selectedKeywords.filter(k => k  !== keyword) 
          : [...selectedKeywords, keyword];
        setSelectedKeywords(updatedSelectedKeywords);
        setActiveKeywords(updatedSelectedKeywords);


      const selectedKeywordsString = updatedSelectedKeywords.join(',');
      const apiUrl = `http://localhost:5000/upload?type=keywords&selected_keyword=${encodeURIComponent(selectedKeywordsString)}&sent_number=${sentNumber}`;
      axios.post(apiUrl)
      .then(response => {
          setRightSide({
              keyword_summary: response.data.keyword_summary,
              num_word: response.data.num_word,
              num_sent: response.data.num_sent
          });
          
      })
      .catch(error => {
          console.error('Error generating summary for selected keywords: ', error);
      });
  };


  useEffect(() => {
    const fetchSummary = async () => {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(`http://localhost:5000/upload?sent_number=${5}`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();  
        setLeftSide(data);
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    };

    fetchSummary();
  }, [summaryLength, file, sentNumber]);

  const handleDeleteAllData = () => {
    setFile(null);
    setLeftSide({});
    setRightSide({});
    setUploadButtonVisible(true);
    setShowSentIconSection(false); 
  };

  const handleDownload = () => {
    if (rightSide.text) {
      FileDownload(rightSide.text, 'Summary.doc');
    } else {
      console.log('No data to download');
    }
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const handleCopyIconHover = () => {
    setIsCopyIconHovered(true);
  };

  const handleCopyIconLeave = () => {
    setIsCopyIconHovered(false);
  };

  const handleUploadIconHover = () => {
    setIsUploadIconHovered(true);
  };

  const handleUploadIconLeave = () => {
    setIsUploadIconHovered(false);
  };

  const handleCopyText = () => {
    const textToCopy = document.getElementById('right-side-text').innerText;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Error copying text: ', err);
      });

    setIsCopyTooltipVisible(true);
    setTimeout(() => {
      setIsCopyTooltipVisible(false);
    }, 2000);
  };


  const handleDeleteIconHover = () => {
    setIsDeleteTooltipVisible(true);
  };

  const handleDeleteIconLeave = () => {
    setIsDeleteTooltipVisible(false);
  };

  const handleStatIconHover = () => {
    setIsStatTooltipVisible(true);
  };

  const handleStatIconLeave = () => {
    setIsStatTooltipVisible(false);
  };

  // const handleModeContainerWidthChange = (width) => {
  //   setModeContainerWidth(width);
  // };
  
    return (
    <>
    <div className="main">
    {/* {`main ${modeContainerWidth === 'max' ? 'max-width' : 'min-width'}`} */}
     <div className="main-section"> 
      <div className='header'>
         <h3>SUMMARIZER</h3>
      </div>
     <div className="mode-container">
     {/* {`mode-container ${modeContainerWidth}`} */}
     <div className="mode-part">
       <h4 className='text'>Modes:</h4>
        
    <select onChange={handleUserTypeChange}>
      <option value="paragraph">Paragraph</option>
      <option value="bulletpoints">Bulletpoints</option>
    </select>
        
    {userType === "paragraph" && (
      <span className='numberbox'>
        <input type="number" value={sentNumber} onChange={handleSentNumberChange} />
      </span>
    )} 
    
    {userType === "bulletpoints" && (
      <>
        <label htmlFor="summaryLength">Summary Length: {summaryLength}</label>
        <input
          type="range"
          id="summaryLength"
          name="summaryLength"
          min="0"
          max={stepOptions.length - 1}
          step="1"
          value={stepOptions.indexOf(summaryLength)}
          onChange={handleSummaryLengthChange}
        />
      </>
    )}

    <button onClick={handleUpload}>SUMMARIZE</button>

    <div onClick={handleDeleteAllData}>
      <span className='icon-delete' onMouseEnter={handleDeleteIconHover} onMouseLeave={handleDeleteIconLeave}>
        <FontAwesomeIcon icon={faTrashCan} />
      </span>
    </div>

    {isDeleteTooltipVisible && (
      <div className='tooltip delete-tooltip'>
        Delete All Text
      </div>
    )}
  </div>

  <div className="upload-section">  
    <div className="left-side">
      {uploadButtonVisible && (
        <div onClick={handleFileInputClick}  className='upload-doc' onMouseEnter={handleUploadIconHover} onMouseLeave={handleUploadIconLeave}>
          <input type="file" accept=".pdf, .doc, .docx, .txt, .png, .jpg, .jpeg" onChange={handleFileChange} hidden ref={fileInputRef} />UPLOAD<FontAwesomeIcon icon={faCloudArrowUp} className='icon' />
        </div>    
      )}
              
      <div className="text-container">
          <p>{leftSide.text}</p>
      </div>
    </div>

    <div className="right-side">
     {userType === "paragraph" && (
          <p id='right-side-text'>{rightSide.text}</p>
    )}

    {userType === "bulletpoints" && summaryLength !== 'medium' && (
      <>
        <p>{rightSide.summaryLength}</p>
        <p id='right-side-text'>{rightSide.text && rightSide.text.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))} </p>
      </>
    )}
        <p>{rightSide.keyword_summary}</p>              
        </div>             
          </div>

      {showStatistics && (
        <div className={`statistics-slider ${showStatistics ? 'show' : ''}`}>
          <h2>Statistics <span className='cros-icon' onClick={() => setShowStatistics(false)}><FontAwesomeIcon icon={faXmark} /></span></h2>
          <hr />
        <div className="stat-text">  
         <div className="word-sec">
          <h4>Word Count</h4> 
          <p className='Lnum-word'>{leftSide.Lnum_word }</p> <p className='arrow'><FontAwesomeIcon icon={faArrowRight} /></p>       
          <p className='Rnum-word'>{rightSide.Rnum_word}</p>
          <p className='Rnum-word'>{rightSide.Bnum_word}</p>
        </div>

        <div className="sent-sec">
           <h4>Sentence Count</h4>
           <p className='Lnum-sent'>{leftSide.Lnum_sent}</p> <p className='arrow'><FontAwesomeIcon icon={faArrowRight} /></p>
           <p className='Rnum-sent'>{rightSide.Rnum_sent}</p>
           <p className='Rnum-sent'>{rightSide.Bnum_sent}</p>
        </div>

         <div className="percent">
            <h4>Reduction</h4>
           <p className='per'>{rightSide.statistics}</p>
         </div>
       </div> 
       </div>
       )} 
          
          {!uploadButtonVisible && (
             <div className="keywords-container">
              <div className="keywords">
                <div className="key-head">
               <h4>Select keywords :</h4>
               {selectedKeywords.length > 1 && clearAllButtonVisible && (
                 <p className="clear-all-btn" onClick={() => {setActiveKeywords([]); setClearAllButtonVisible([]) }}> Clear All</p>
                )}
               </div>   
                <p className='btn'>{leftSide.keywords && leftSide.keywords.split(',').map((keyword, index) => (
                  <button key={index} className={activeKeywords.includes(keyword) ? 'selected' : ''} onClick={() => handleKeywordClick(keyword)} > 
                   {keyword} 
                  </button>
                ))}
                </p>

                <div className="word-sent">
                  <p>{leftSide.Lnum_word} words</p>
                  <p>{leftSide.Lnum_sent} sentences</p>
                </div>
              </div>
            </div>
              )}
        </div>

    {showSentIconSection && (
     <div className="icons-sent-container">
        <div className="sent-word">
          {userType === "paragraph" && ( 
              <>
            <p>{rightSide.Rnum_word} words</p>
            <p>{rightSide.Rnum_sent} sentences</p> 
            </>
          )}
        {userType === "bulletpoints" && (
          <>
            <p>{rightSide.Bnum_word} words</p>
            <p>{rightSide.Bnum_sent} sentences</p>
          </>  
        )}
        </div>     
            <div className="all-icons">
              <span className='stat-icon' onClick={handleStatIconClick} onMouseEnter={handleStatIconHover} onMouseLeave={handleStatIconLeave}>
                <FontAwesomeIcon icon={faSquarePollVertical} />
              </span>
              <span className='down-icon' onClick={handleDownload} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
              <FontAwesomeIcon icon={faCircleArrowDown} />
              </span>
              <span className='copy-icon' onClick={handleCopyText} onMouseEnter={handleCopyIconHover} onMouseLeave={handleCopyIconLeave}>
              <FontAwesomeIcon icon={faCopy} />
              </span>
               </div>
               </div>
              )}

      </div>
    </div>

      {isHovered && (
        <div className="tooltip export-tooltip">
          Export
        </div>
      )}

      {isCopyTooltipVisible && (
        <div className='tooltip copy-text-tooltip'>
          Text Copied
        </div>
      )}

      {isCopyIconHovered && (
        <div className="tooltip copy-tooltip">
          Copy All Text
        </div>
      )}

      {isStatTooltipVisible && (
        <div className="tooltip stat-tooltip">
           Statistics
        </div>
      )}

      {isUploadIconHovered && (
        <div className="tooltip upload-tooltip">
            Upload Doc
        </div>
      )}
    
    </>
  );
};

 
 export default Tabs; 








// import React, { useState } from 'react';
// import axios from 'axios';

// const App = () => {
// const [leftSide, setLeftSide] = useState({});
// const [rightSide, setRightSide] = useState({});
// const [file, setFile] = useState(null);
// const [sentNumber, setSentNumber] = useState(5);
// const [userType, setUserType] = useState("paragraph");
// const [selectedKeywords, setSelectedKeywords] = useState([]);

// const handleFileChange = (e) => {
// setFile(e.target.files[0]);
// };

// const handleSentNumberChange = (e) => {
// setSentNumber(parseInt(e.target.value, 10));
// };

// const handleUserTypeChange = (e) => {
// setUserType(e.target.value);
// };

// const handleUpload = () => {
// const formData = new FormData();
// formData.append('file', file);

// axios.post('http://localhost:5000/upload', formData)
//     .then(response => {
//         setLeftSide(response.data);
//     })
//     .catch(error => {
//         console.error('Error uploading file: ', error);
//     });

// const apiUrl = `http://localhost:5000/upload?type=${userType}`;
// const requestData = userType === "paragraph" ? { sent_number: sentNumber } :  { selected_keyword: selectedKeywords.join(','), sent_number: sentNumber };

// axios.post(apiUrl, formData, { params: requestData })
//     .then(response => {
//         setRightSide(response.data);
//     })
//     .catch(error => {
//         console.error('Error generating summary: ', error);
//     });
// };

// const handleKeywordClick = (keyword) => {
// // Toggle selection of the keyword
// const updatedSelectedKeywords = selectedKeywords.includes(keyword)
//     ? selectedKeywords.filter(k => k !== keyword)
//     : [...selectedKeywords, keyword];
// setSelectedKeywords(updatedSelectedKeywords);

// // Construct the API URL with updated selected keywords
// const selectedKeywordsString = updatedSelectedKeywords.join(',');
// const apiUrl = `http://localhost:5000/upload?type=keywords&selected_keyword=${encodeURIComponent(selectedKeywordsString)}&sent_number=${sentNumber}`;

// axios.post(apiUrl)
//     .then(response => {
//         setRightSide({
//             keyword_summary: response.data.keyword_summary,
//             num_word: response.data.num_word,
//             num_sent: response.data.num_sent
//         });
//     })
//     .catch(error => {
//         console.error('Error generating summary for selected keywords: ', error);
//     });
// };

// return (
// <div>
//     <div style={{ marginBottom: '20px' }}>
//         <input type="file" onChange={handleFileChange} />
//         <label>
//             User Type:
//             <select onChange={handleUserTypeChange}>
//                 <option value="paragraph">Paragraph</option>
//                 <option value="bulletpoints">Bulletpoints</option>
//                 <option value="keywords">Selected Keyword</option>
//             </select>
//         </label>

//         {userType === "paragraph" && (
//             <label>
//                 Number of Sentences in Summary:
//                 <input type="number" value={sentNumber} onChange={handleSentNumberChange} />
//             </label>
//         )}

//         {userType === "keywords" && (
//             <div>
//                 <label>
//                     Number of Sentences in Summary:
//                     <input type="number" value={sentNumber} onChange={handleSentNumberChange} />
//                 </label>
//             </div>
//         )}

//         <button onClick={handleUpload}>Upload</button>
//     </div>

//     <div style={{ float: 'right', width: '50%' }}>
//         <h2>Right Side (Summary)</h2>
//         <p>Text: {rightSide.text}</p>
//         <p>Number of Words: {rightSide.num_word}</p>
//         <p>Number of Sentences: {rightSide.num_sent}</p>
//     </div>

//     <div style={{ float: 'right', width: '50%' }}>
//         <h2>Right Side (keyword)</h2>
//         <p>Text: {rightSide.keyword_summary}</p>
//     </div>

//     <div style={{ float: 'left', width: '50%' }}>
//         <h2>Left Side (Text)</h2>
//         <p>Text: {leftSide.text}</p>
//         <p>Keywords: {leftSide.keywords && leftSide.keywords.split(',').map ((keyword, index) => (
//             <button
//                 key={index}
//                 style={{ marginRight: '5px' }}
//                 className={selectedKeywords.includes(keyword) ? 'selected' : ''}
//                 onClick={() => handleKeywordClick(keyword)}
//             >
//                 {keyword}
//             </button>
//         ))}
//         </p>
//         <p>Number of Words: {leftSide.num_word}</p>
//         <p>Number of Sentences: {leftSide.num_sent}</p>
//     </div>
// </div>
// );
// };

// export default App; 
