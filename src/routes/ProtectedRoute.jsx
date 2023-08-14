import { Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../authContext/AuthProvider';

function ProtectedRoute({ element, ...rest }) {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Route {...rest} element={isAuthenticated ? element : <Navigate to="/login" />} />
    );
}

export default ProtectedRoute;
