import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRouteEmployee = ({ component: Component, ...rest }) => {
  // Retrieve user data from sessionStorage
  const userDataString = sessionStorage.getItem('user');

  // Parse user data or set an empty object if not present
  const userData = userDataString ? JSON.parse(userDataString) : {};

  // Check if user is authenticated based on the parsed data
  const isCustomer = !!userData.id && (userData.role === 'Employee' || userData.role === 'Admin');

  return (
    <Route
      {...rest}
      render={(props) =>
        isCustomer ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRouteEmployee;