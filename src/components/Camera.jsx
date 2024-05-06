// import React, { useEffect, useRef } from 'react'; 

// import 'bootstrap/dist/css/bootstrap.min.css';


// function Camera () {

//    let videoRef = useRef(null);

//    let photoRef = useRef(null);

//    // get access to user camera
    
//    const getUserCamera = () => {
//     navigator.mediaDevices.getUserMedia({
//         video:true
//     })
//       .then((stream) => {
//         // attach the stream to video tag
//         let video = videoRef.current

//         video.srcObject = stream

//         video.play()

//       })
//       .catch((error) => {
//            console.error(error)
//       })
//    }

//      // to take picture of user
          
//        const takePicture = () => {
//           // width and height

//             let width = 500

//             let height = width / (16 / 9)

//             let photo = photoRef.current

//             let video = videoRef.current

//         // set the photo width and height
//              photo.width = width

//              photo.height = height

//              let ctx = photo.getContext('2d')

//              ctx.drawImage(video,0,0,photo.width,photo.height)
//        }

//         // clear out the image from the screen

//            const clearImage = () => {

//            let photo = photoRef.current
        
//            let ctx = photo.getContext('2d')

//            ctx.clearRect(0,0,photo.width,photo.height)
           
//         }

//       useEffect(() => {
//           getUserCamera()

//       },[videoRef])



//   return (
//     <div className='container'>
//        <h1 className='text-center'>Selfie App</h1>
//        <video className='container' ref={videoRef}></video>
//        <button onClick={takePicture} className='btn btn-danger container'>Take Selfie</button>
//        <canvas className='container' ref={photoRef}></canvas>
//        <button onClick={clearImage} className='btn btn-primary container'>Clear Image</button>
//     </div>
//   )
// };

// export default Camera;






// CameraComponent.js
// import React, { useState } from 'react';
// import Webcam from 'react-webcam';
// import Tesseract from 'tesseract.js';

// const Camera = () => {
//   const webcamRef = React.useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [recognizedText, setRecognizedText] = useState('');

//   const handleUserMedia = () => {
//     console.log('Camera is ready!');
//   };

//   const captureImage = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setCapturedImage(imageSrc);

//     // You can also perform text recognition here if you want
//     performTextRecognition(imageSrc);
//   };

//   const performTextRecognition = async (imageSrc) => {
//     const { data } = await Tesseract.recognize(imageSrc, 'eng');
//     console.log('Tesseract Data:', data);
//     setRecognizedText(data.text);
//   };

//   const deleteCapture = () => {
//     setCapturedImage(null);
//     setRecognizedText('');
//   };

//   return (
//     <div>
//       <Webcam
//         audio={false}
//         height={720}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         width={700}
//         onUserMedia={handleUserMedia}
//       />

//       <div>
//         <button onClick={captureImage}>Capture Image</button>
//         <button onClick={deleteCapture}>Delete</button>
//       </div>

//       {capturedImage && (
//         <div>
//           <h2>Captured Image:</h2>
//           <img src={capturedImage} alt="Captured" />
//         </div>
//       )}

//       {recognizedText && (
//         <div>
//           <h2>Recognized Text:</h2>
//           <p style={{ whiteSpace: 'pre-wrap', fontSize: '16px', color: '#333' }}>{recognizedText}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Camera;

