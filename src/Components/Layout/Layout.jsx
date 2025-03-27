import AppToolbar from "../AppToolbar/AppToolbar.jsx";
import {Container} from "@mui/material";
import Footer from "../Footer/Footer.jsx";
import {useLocation} from "react-router-dom";

const Layout = ({ children }) => {
    const location = useLocation();
    const onExcludedPage =
        location.pathname.includes("/sign-in") ||
        location.pathname.includes("/sign-up");
    return(
        <>
            <header>{onExcludedPage ? <></> :<AppToolbar/>}</header>
            <Container
                maxWidth={false}
                component="main"
                disableGutters
                sx={{ minHeight: "80vh" }}
            >
                {children}
            </Container>
            <footer><Footer /></footer>
        </>
    );
};

export default Layout;