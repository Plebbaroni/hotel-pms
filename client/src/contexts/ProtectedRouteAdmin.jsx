import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRouteAdmin = ({ component: Component, ...rest }) => {
  // Retrieve user data from sessionStorage
  const userDataString = sessionStorage.getItem('user');

  // Parse user data or set an empty object if not present
  const userData = userDataString ? JSON.parse(userDataString) : {};

  // Check if user is authenticated based on the parsed data
  const isAdmin = !!userData.id && userData.role === "Admin";

  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/Login" />
        )
      }
    />
  );
};

export default ProtectedRouteAdmin;