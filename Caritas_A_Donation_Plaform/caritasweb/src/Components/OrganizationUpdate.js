import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './OrganizationUpdate.css'
const OrganizationUpdate = () => {
  const [organizationData, setOrganizationData] = useState({
    name: '',
    type: '',
    registrationnumber: '', // Assuming this is read-only
    phoneNo: '',
    Address: '',
    requirements: '',
    email: '',
    password: '', // Assuming this is read-only
    ManagerName: '',
    About: '',
  });

  const {registrationnumber} = useParams(); // Get the registration number from somewhere (maybe from local storage or props)
  let history = useNavigate();
  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/getOrganization/${registrationnumber}`);

        if (response.ok) {
          const organization = await response.json();
          setOrganizationData(organization);
          console.log(organizationData);
        } else {
          console.error('Failed to fetch organization details');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchOrganizationData();
  });

  const handleUpdate = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/updateOrganization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationnumber,
          updatedData: organizationData,
        }),
      });

      if (response.ok) {
        // Handle success, maybe show a success message
        console.log('Organization details updated successfully');
        history('/UpdateSuccess')
      } else {
        // Handle error, maybe show an error message
        console.error('Failed to update organization details');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleChange = (e) => {
    setOrganizationData({ ...organizationData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1 className='Headu'>Update Your Organization Profile Here</h1>
      <div className="organization-update-container">
  <div className="form-field">
    <b>Organization Name:</b>
    <input
      type="text"
      value={organizationData.name}
      onChange={handleChange}
      name="name"
      placeholder="Organization Name"
      className="input-field"
    />
  </div>

  <div className="form-field">
    <b>Organization Type:</b>
    <input
      type="text"
      value={organizationData.type}
      onChange={handleChange}
      name="type"
      placeholder="Organization Type"
      className="input-field"
    />
  </div>

  <div className="form-field">
    <b>Registration Number:</b>
    <input
      type="text"
      value={organizationData.registrationnumber}
      readOnly
      placeholder="Registration Number"
      className="input-field read-only"
    />
  </div>

  <div className="form-field">
    <b>Phone Number:</b>
    <input
      type="number"
      value={organizationData.phoneNo}
      onChange={handleChange}
      name="phoneNo"
      placeholder="Phone Number"
      className="input-field"
    />
  </div>

  <div className="form-field">
    <b>Address:</b>
    <input
      type="text"
      value={organizationData.Address}
      onChange={handleChange}
      name="Address"
      placeholder="Address"
      className="input-field"
    />
  </div>

  <div className="form-field">
    <b>Requirements:</b>
    <input
      type="text"
      value={organizationData.requirements}
      onChange={handleChange}
      name="requirements"
      placeholder="Requirements"
      className="input-field"
    />
  </div>

  <div className="form-field">
    <b>Email:</b>
    <input
      type="email"
      value={organizationData.email}
      onChange={handleChange}
      name="email"
      placeholder="Email"
      className="input-field"
    />
  </div>



  <div className="form-field">
    <b>Manager Name:</b>
    <input
      type="text"
      value={organizationData.ManagerName}
      onChange={handleChange}
      name="ManagerName"
      placeholder="Manager Name"
      className="input-field"
    />
  </div>

  <div className="form-field">
    <b>About Organization:</b>
    <textarea
      value={organizationData.About}
      onChange={handleChange}
      name="About"
      placeholder="About Organization"
      className="input-field"
    />
  </div>

  <button onClick={handleUpdate} className="update-button">
    Update Organization
  </button>
</div>

    
    </>
  );
};

export default OrganizationUpdate;
