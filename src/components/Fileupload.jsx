import React, { useState } from 'react';


function Fileupload () {
  const [file, setFile] = useState()

  function getFile(event) {

    setFile(URL.createObjectURL(event.target.files[0]))
  } 
    return (
       <div>
          <input type="file" onChange={getFile}></input>

           <img src={file} alt='img' />       
      </div>
    )
};


    export default Fileupload;