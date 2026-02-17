import React, { useEffect, useState } from 'react';
import ResponsiveHeader from './tools/responsiveHeader';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './tools/AppContext';
import Loader from './tools/loader';


export default function ChatUsers() {
    const navigate = useNavigate();
    const { data, setData } = useAppContext();
    const [ users, setUsers ] = useState();
    const [loading, setLoading] = useState(true);

      
    const fetchData = async () => {
        setLoading(true)
      try {
        // Mock admin data for frontend only
        const usersData = [];
        setUsers(usersData)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  


    useEffect(() => {
      fetchData();
    }, []);
  
    // const handleRowClick = (id) => {
    //   navigate(`/individualsRequest`); // Pass the id to the route
    // };
  
    return (
      <div>
        <ResponsiveHeader />
        <div className="container">
        {loading ? (
            <Loader/>
          ) : (
            <div>
              {/* Add any additional content you want to show when data is loaded */}
            </div>
          )}
          <div className="containerIndividuals">
            <div className="section1">
              <div className="head">
                <h2>Key metrics</h2>
              </div>
              <div className="metrics">
                {/* Add metrics here if needed */}
              </div>
            </div>
            <div className="tableSection">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Date registered</th>
                </tr>
              </thead>
              <tbody>
              {users && users.length > 0 ? (
  users.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  .map((item, i) => (
    <tr key={i}>
      <td>{item.username}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>{formatDate(item.created_at)}</td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan={3} style={{ textAlign: 'center' }}>
      No users available
    </td>
  </tr>
)}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fetching all users data
  const fetchAllUsersData = async () => {
    try {
      // Return mock users data
      return [];
    } catch (error) {
      console.error('Error fetching users data:', error);
      return [];
    }
  };
  
  // Fetching all payments data
  const fetchAllPaymentsData = async () => {
    try {
      // Return mock payments data
      return [];
    } catch (error) {
      console.error('Error fetching payments data:', error);
      return [];
    }
  };
  
  const fetchSiteUsers = async () => {
    try {
      // Return mock site users data
      return [];
    } catch (error) {
      console.error('Error fetching users data:', error);
      return [];
    }
  };

  
function formatDate(input) {
  // Create a new Date object using the input string
  const date = new Date(input);

  // Get individual date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Format the date as "Day, Month Date, Year - HH:MM:SS"
  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}