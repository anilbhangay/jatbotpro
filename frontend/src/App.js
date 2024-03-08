import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [summaryLength, setSummaryLength] = useState('Medium');
  const [keywords, setKeywords] = useState('');
  const [statistics, setStatistics] = useState('');

  const stepOptions = ['Very_Short', 'Short', 'Medium', 'Long'];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSummaryLengthChange = (e) => {
    setSummaryLength(stepOptions[parseInt(e.target.value, 10)]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`http://localhost:5000/upload?summary_length=${summaryLength}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setText(data.text || 'Error extracting text');
      setSummary(data.summary || '');
      setKeywords(data.keywords || '');
      setStatistics(data.statistics || '');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchSummary = async () => {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(`http://localhost:5000/upload?summary_length=${summaryLength}`, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setSummary(data.summary || '');
        setKeywords(data.keywords || '');
        setStatistics(data.statistics || '');
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    };

    fetchSummary();
  }, [summaryLength, file]);


  return (
    <div className="App">
      <div className="box left-box">
        <h1>Text Extractor</h1>
        <input type="file" accept=".pdf, .doc, .docx, .txt, .png, .jpg, .jpeg" onChange={handleFileChange} />
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
        <button onClick={handleUpload}>Summarizer</button>
        <div className="text-container">
          {text.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        <div className="keywords">
          <p>{keywords}</p>
        </div>
      </div>
      <div className="box right-box">
        <div className="summary-container">
          {summary.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        {statistics && (
          <div className="statistics">
            <p>{statistics}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
