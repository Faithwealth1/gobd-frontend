import React, { useState } from 'react';
import '../../stylings/styles.css'; // Import your SCSS file
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import { useNavigate } from 'react-router-dom';

const Verification = () => {
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'code') {
      setCode(value);
    } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mock verification for frontend only
    try {
      // Simulate a successful verification
      toast.success('Verification successful!', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });

      // Redirect to login page after verification
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error('Error during verification!', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login-container">
        <div className="inner">
          <h2>Verification</h2>
          {errorMessage && <div className="error">{errorMessage}</div>}
          {successMessage && <div className="success">{successMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Code:</label>
              <input 
                type="code" 
                name="code" 
                value={code} 
                onChange={handleChange} 
                required 
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Verification;
