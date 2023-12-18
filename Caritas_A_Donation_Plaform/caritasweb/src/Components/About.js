import React from 'react';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

import './About.css';
export default function About() {
  return (
    <div className="container-about">
      <div className='About'>
        <h1 className="head">ABOUT US</h1>
        <br />
        Caritas aims to create a web application that connects individuals or organizations with causes they care about. The platform provides users with the ability to browse and donate to different charities, fundraising campaigns, or specific projects. It focuses on promoting transparency and impact tracking to enhance donor trust and engagement.
        Donation options are provided to users, allowing them to set up recurring donations also, or support crowdfunding campaigns. Users can choose the donation amount and receive acknowledgement and tax receipts for their contributions.
        Overall, the donation platform project aims to create a user-friendly and impactful web application that connects donors with organisations. By providing transparency, personalized experiences, and opportunities for engagement, the platform strives to enhance the efficiency and effectiveness of charitable giving, fostering a culture of philanthropy and positive change.
        <br />
        <div className="social-icons">

        <h4 className="contactus">Contact us at :</h4>

          <a href='caritasweb@gmail.com'>Caritasweb@gmail.com</a>
          <br/>
          <br/>
          <a href='+919989964650'>+919989964650</a>
          <br/>
          <br/>
          <a href="https://www.instagram.com/your_instagram_profile" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="2x" className="icon" />
          </a>
          <a href="https://twitter.com/your_twitter_profile" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="2x" className="icon" />
          </a>
          
        </div>
        <br />
        
      </div>
    </div>
  );
}
