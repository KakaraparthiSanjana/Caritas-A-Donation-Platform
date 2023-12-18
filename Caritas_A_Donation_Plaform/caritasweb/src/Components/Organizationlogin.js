import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrganizationLogin() {
  const [credentials, setCredentials] = useState({ registrationnumber: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/organizationlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationnumber: credentials.registrationnumber,
          password: credentials.password,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        localStorage.setItem('token', json.authtoken);
        history(`/OrganizationUpdate/${credentials.registrationnumber}`);
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred while logging in');
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="alignment mb-3" style={{ backgroundImage: 'url(https://www.aurumliving.com/blog/wp-content/uploads/2021/07/Old-Age-Home-870x600.jpg)' , backgroundRepeat: 'no-repeat' , backgroundSize: 'cover'}}>

        <div className="formdiv">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <b>
                <label htmlFor="registrationnumber" className="form-label">
                  Registration Number
                </label>
              </b>
              <input
                type="text"
                className="form-control"
                value={credentials.registrationnumber}
                onChange={onChange}
                id="registrationnumber"
                name="registrationnumber"
              />
            </div>
            <div className="mb-3">
              <b>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
              </b>
              <input
                type="password"
                placeholder="********"
                className="form-control"
                value={credentials.password}
                onChange={onChange}
                name="password"
                id="password"
              />
            </div>

            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? 'Logging in...' : 'Submit'}
            </button>
            {error && <p className="text-danger">{error}</p>}
            <br />
            <br />
            <a href="/Organizationsignup">New Organization?</a>
          </form>
        </div>
      </div>
    </>
  );
}
