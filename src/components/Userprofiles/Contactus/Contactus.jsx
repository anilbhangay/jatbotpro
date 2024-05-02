import React,{useState} from "react";
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Contactus.css";

const Contactus = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const[loading, setLoading]=useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/send_complaint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, name: Name, email: Email }),
      });
      const data = await res.json();
      setTimeout(() => {
          setLoading(false); // Turn off loading after 5 seconds
          setResponse(data.message);
        }, 1000);
     
    
      // You might not receive Email and Name back from the server
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error occurred. Please try again.');
    }
  };
  return (
    <div className="main-contactus">
      <div className="left-data-contact">
        <div className="left-data-heading-contact">
          <h4>How can we help?</h4>
          <p>
            Send us a message or question and we'll help
            <br /> you as soon as we can.
          </p>
        </div>
        <div className="left-data-form-contact">
          <form method="POST" onSubmit={handleSubmit}>
            <div className="left-form-input-contact">
              <input type="text" id="Name" value={Name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            </div>
            <div className="left-form-input-contact">
              <input type="Email" id="Email" value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Adress" />
            </div>
            <div className="left-form-input-contact">
              <textarea value={message}
              placeholder="Enter your complaint message here"
                name="Message"
                id="message"
                cols="30"
                rows="10" 
                onChange={(e) => setMessage(e.target.value)}
                  required
              ></textarea><br />
                {response && <span id="resp-msg">{response}</span>}
            </div>
            <div className="snd-btn">
            <button type="submit">{loading ? (
                <FontAwesomeIcon id='spinner-icon-contact' icon={faRotateRight} spin />
              ) : (
                "Send"
              )}</button>
             </div>
          </form> 
        </div>
      </div>
      <div className="right-data-contact">
        <div className="address-1">
          <h1>Chicago</h1>
          <address>
            303 East Wacker, Suite 2101 <br /> Chicago, IL 60601 <br />
            United States of America 
          </address>
          <br />
          <a href="http://">View map →</a>
        </div>
        <div className="inquiries">
          <p>
            For General Inquiries and Billing: <br />
            +1 (833) 982-1803 <br />
            (10AM-5PM Weekdays)
          </p>
        </div>
        <div className="address-2">
          <h1>Jaipur</h1>
          <address>
            5th floor, Gt Square Mall, Kalyan <br /> Colony, D-Block, Malviya
            Nagar,
            <br /> Jaipur, Rajasthan 302017
          </address> {" "}
          <br />
          <a href="http://">View map →</a>
        </div>
      </div>
    
    </div>
  );
};

export default Contactus;


