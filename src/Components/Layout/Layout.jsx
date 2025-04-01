import AppToolbar from "../AppToolbar/AppToolbar.jsx";
import {BottomNavigation, BottomNavigationAction, Container} from "@mui/material";
import Footer from "../Footer/Footer.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import GroupIcon from '@mui/icons-material/Group';
import HelpIcon from '@mui/icons-material/Help';
import RepeatIcon from '@mui/icons-material/Repeat';
import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';

const Layout = ({ children }) => {
    const location = useLocation();
    const onExcludedPage =
        location.pathname.includes("/sign-in") ||
        location.pathname.includes("/sign-up");

    const onReportsPage =
        location.pathname.includes("/reports") ||
        location.pathname.includes("/stats_by_reasons") ||
        location.pathname.includes("/stats_by_solutions") ||
        location.pathname.includes("/stats_by_repeated_calls") ||
        location.pathname.includes("/stats_by_inactives_users");

    const navigate = useNavigate();
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
                {onReportsPage &&
                    <BottomNavigation
                        sx={{
                            display: "flex",
                            width: "100%",
                            position: 'fixed',
                            bottom: '0',
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            "& > button":{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '45px',
                                justifyContent: 'space-between',
                            },
                        }}
                    >
                        <BottomNavigationAction
                            label="Сотрудники"
                            onClick={() => navigate('/reports')}
                            icon={<GroupIcon></GroupIcon>}
                            showLabel
                        />
                        <BottomNavigationAction
                            label="Причины"
                            onClick={() => navigate('/stats_by_reasons')}
                            showLabel
                            icon={<HelpIcon></HelpIcon>}
                        />
                        <BottomNavigationAction
                            label="Причины/Решения"
                            onClick={() => navigate('/stats_by_solutions')}
                            showLabel
                            icon={<EmojiObjectsIcon></EmojiObjectsIcon>}
                        />
                        <BottomNavigationAction
                            label="Повторные звонки"
                            onClick={() => navigate('/stats_by_repeated_calls')}
                            showLabel
                            icon={<RepeatIcon></RepeatIcon>}
                        />
                        <BottomNavigationAction
                            label="Неактивные"
                            onClick={() => navigate('/stats_by_inactives_users')}
                            showLabel
                            icon={<VoiceOverOffIcon></VoiceOverOffIcon>}
                        />
                    </BottomNavigation>
                }
            </Container>
            <footer><Footer /></footer>
        </>
    );
};

export default Layout;
