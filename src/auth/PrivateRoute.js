import React from 'react'
import { useStateValue } from '../StateProvider'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ children, ...rest }) => {
    const [{ token }, dispatch] = useStateValue();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          token ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}

export default PrivateRoute