import { Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../authContext/AuthProvider';

function GuestRoute({ element, ...rest }) {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Route {...rest} element={!isAuthenticated ? element : <Navigate to="/profile" />} />
    );
}

export default GuestRoute;
