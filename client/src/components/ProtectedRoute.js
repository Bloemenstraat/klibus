import { Navigate } from "react-router-dom";

const ProtectedRoute = ({component: Component, ...rest}) => {
    const token = localStorage.getItem('klibus-jwt');

    return (
        token ? <Component {...rest} /> : <Navigate to="/" />
    );
}
 
export default ProtectedRoute;