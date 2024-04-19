import React from "react";
import "./Contactus.css";

const Contactus = () => {
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
          <form method="POST">
            <div className="left-form-input-contact">
              <input type="text" id="Name" placeholder="Name" />
            </div>
            <div className="left-form-input-contact">
              <input type="Email" id="Email" placeholder="Email Adress" />
            </div>
            <div className="left-form-input-contact">
              <textarea
                name="Message"
                id="message"
                placeholder="Message"
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </form>
          <div className="snd-btn">
            <button>Send</button>
          </div>
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
