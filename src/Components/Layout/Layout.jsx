import AppToolbar from "../AppToolbar/AppToolbar.jsx";
import {
  BottomNavigation,
  BottomNavigationAction,
  Container
} from "@mui/material";
import Footer from "../Footer/Footer.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import GroupIcon from '@mui/icons-material/Group';
import HelpIcon from '@mui/icons-material/Help';
import RepeatIcon from '@mui/icons-material/Repeat';
import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks.js";
import { selectUser } from "../../features/user/userSlice.js";

const adminTabs = {
  '/reports': 0,
  '/stats_by_reasons': 1,
  '/stats_by_solutions': 2,
  '/stats_by_repeated_calls': 3,
  '/stats_by_inactives_users': 4,
};

const userTabs = {
  '/stats_by_reasons': 1,
  '/stats_by_solutions': 2,
  '/stats_by_repeated_calls': 3,
  '/stats_by_inactives_users': 4,
};

const Layout = ({ children }) => {
  const location = useLocation();
  const user = useAppSelector(selectUser);
  const { pathname } = useLocation();
  const [currentTab, setCurrentTab] = useState();
  
  useEffect(() => {
    if (currentTab !== (
      user?.role === 'admin' ? adminTabs : userTabs
    )[pathname]) {
      setCurrentTab((
        user?.role === 'admin' ? adminTabs : userTabs
      )[pathname]);
    }
  }, [
    currentTab,
    pathname
  ]);
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
  return (
    <>
      <header>{onExcludedPage ? <></> : <AppToolbar/>}</header>
      <Container
        maxWidth={false}
        component='main'
        disableGutters
        sx={{ minHeight: "80vh" }}
      >
        {children}
        {onReportsPage &&
          <BottomNavigation
            value={currentTab}
            sx={{ justifyContent: 'stretch' }}
            onChange={(_, newValue) => {
              setCurrentTab(newValue);
            }}
          >
            {
              user?.role === 'admin' && <BottomNavigationAction
                label='Сотрудники'
                onClick={() => navigate('/reports')}
                icon={<GroupIcon/>}
                showLabel
                sx={{
                  flexGrow: 1,
                  maxWidth: 'unset'
                }}
              />
            }
            <BottomNavigationAction
              label='Причины'
              onClick={() => navigate('/stats_by_reasons')}
              showLabel
              sx={{
                flexGrow: 1,
                maxWidth: 'unset'
              }}
              icon={<HelpIcon/>}
            />
            <BottomNavigationAction
              label='Причины/Решения'
              onClick={() => navigate('/stats_by_solutions')}
              showLabel
              sx={{
                flexGrow: 1,
                maxWidth: 'unset'
              }}
              icon={<EmojiObjectsIcon/>}
            />
            <BottomNavigationAction
              label='Повторные звонки'
              onClick={() => navigate('/stats_by_repeated_calls')}
              showLabel
              sx={{
                flexGrow: 1,
                maxWidth: 'unset'
              }}
              icon={<RepeatIcon/>}
            />
            <BottomNavigationAction
              label='Неактивные'
              onClick={() => navigate('/stats_by_inactives_users')}
              showLabel
              sx={{
                flexGrow: 1,
                maxWidth: 'unset'
              }}
              icon={<VoiceOverOffIcon/>}
            />
          </BottomNavigation>
        }
      </Container>
      <footer><Footer/></footer>
    </>
  );
};

export default Layout;
