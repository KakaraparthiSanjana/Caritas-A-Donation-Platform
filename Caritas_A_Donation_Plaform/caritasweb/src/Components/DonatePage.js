// DonatePage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './DonatePage.css';

const DonatePage = () => {
  const { title, requirements,phoneNo } = useParams();
  // const [type,settype]=useState("");
  
  return (
    <>
    <div className='dp-whole'>  
    <div className='container-dp'>
      <h1>We appreciate to choose the Organization "{title}" for valuable Donation </h1>
      <br />
      <h4>There Needs are :  {requirements}</h4>
      <h5>Organization Contact Number : {phoneNo}</h5>
      {/* You can use the title and requirements data as needed in this component */}
      <h3>Choose What to donate :</h3>
      <Link  to='https://buy.stripe.com/test_28o7vc4ZK3ss3TO7st'>Money</Link>
      <br />
      <Link type ='Food' to={`/OtherReq/${title}/${phoneNo}/Food`} >Food</Link>

      <br />
      <Link type='Clothes' to={`/OtherReq/${title}/${phoneNo}/Clothes`} value={'Clothes'}>Clothes</Link>

      <br />
      <Link to={`/OtherReq/${title}/${phoneNo}/Blood`} value={'Blood'}>Blood</Link>
    </div>
    </div>
    </>
  );
};

export default DonatePage;
