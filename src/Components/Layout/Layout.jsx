import AppToolbar from "../AppToolbar/AppToolbar.jsx";
import {Container} from "@mui/material";
import Footer from "../Footer/Footer.jsx";

const Layout = ({ children }) => {

    return(
        <>
            <header>{<AppToolbar/>}</header>
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