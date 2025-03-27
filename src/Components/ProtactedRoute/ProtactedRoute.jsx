import {Navigate} from "react-router-dom";

const ProtectedRoute = ({ isAllowed, children }) => {

    if (!isAllowed) {
        return <Navigate to="/sign-in" />;
    }

    return children;
};

export default ProtectedRoute;
