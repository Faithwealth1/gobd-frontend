import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);

  const fetchData = async () => {
    try {
      // Mock admin data for frontend only
      const adminData = { username: "Admin User", id: "admin" };

      // Set mock data
      const usersData = [];
      const paymentsData = [];

      setData({ users: usersData, payments: paymentsData, adminData: adminData });
      setLoginStatus(true);
    } catch (error) {
      console.error('Error in fetchData:', error);
    }
  };

  const fetchAllUsersData = async () => {
    try {
      // Return mock users data
      return [];
    } catch (error) {
      console.error('Error fetching users data:', error);
      return [];
    }
  };

  const fetchAllPaymentsData = async () => {
    try {
      // Return mock payments data
      return [];
    } catch (error) {
      console.error('Error fetching payments data:', error);
      return [];
    }
  };

  return (
    <AppContext.Provider value={{ data, fetchData, loginStatus }}>
      {children}
    </AppContext.Provider>
  );
};
