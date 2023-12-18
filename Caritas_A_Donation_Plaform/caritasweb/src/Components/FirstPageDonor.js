import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FirstPageDonor.css'
import { Link } from 'react-router-dom';
const Card = ({ title,registrationnumber,type,requirements,phoneNo}) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <h5>Reg no :{registrationnumber}</h5>
      <h5>Org Type : {type}</h5>
      <h5>requirements : {requirements}</h5>
      <h5>Phone No :{phoneNo}</h5>
      <Link to={`/DonatePage/${title}/${requirements}/${phoneNo}`}>Donate</Link>
    </div>
  );
};

const FirstPageDonor = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from MongoDB using Axios
    axios.get('http://localhost:5000/api/auth/data')  // Replace with your actual API endpoint
      .then(response => {
        setData(response.data);
        console.log(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  });

  return (
    <>
    <div className="card-list">
      {data.map(item => (
        <Card 
            key={item.uniqueId} 
            title={item.name} 
            registrationnumber={item.registrationnumber}
            type={item.type}
            requirements={item.requirements}
            phoneNo={item.phoneNo}
        />
        
      ))}
      
    </div>
    </>
  );
};

export default FirstPageDonor;
