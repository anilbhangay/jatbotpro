
// import React from 'react';
// import{useNavigate} from 'react-router-dom'

// const GoogleLogin = () => {
//     const navigate=useNavigate()
//     const handleGoogleLogin = () => {
//         window.location.href = 'http://localhost:5000/login'; // Redirect to Google authentication endpoint
//         navigate('/')
//     };

//     return (
//         <div>
//             <button onClick={handleGoogleLogin}>
//                 Login with Google
//             </button>
//         </div>
//     );
// };

// export default GoogleLogin;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const GoogleLogin = () => {
//     const navigate = useNavigate();

//     const handleGoogleLogin = () => {
//         // Open Google authentication page in a new window/tab
//         const authWindow = window.open('http://localhost:5000/login');

//         // Check if the authentication was successful
//         const checkAuth = () => {
//             if (authWindow.closed) {
//                 // If authentication window is closed, navigate to main page
//                 navigate('/Loginform');
//                 clearInterval(interval);
//             }
//         };

//         // Check authentication status every 100 milliseconds
//         const interval = setInterval(checkAuth, 100);
//     };

//     return (
//         <div>
//             <button onClick={handleGoogleLogin}>
//                 Login with Google
//             </button>
//         </div>
//     );
// };

// export default GoogleLogin;

import React from 'react';
import{useNavigate} from 'react-router-dom'

const GoogleLogin = () => {
    const navigate=useNavigate()
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5000/login'; 
         navigate('/')
        
    };

    return (
        <div>
            <button onClick={handleGoogleLogin}>
                Login with Google
            </button>
        </div>
    );
};

export default GoogleLogin;
