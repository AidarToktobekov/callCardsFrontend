import AppToolbar from '../AppToolbar/AppToolbar.jsx';
import {Container,} from '@mui/material';
import Footer from '../Footer/Footer.jsx';
import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useAppSelector} from '../../app/hooks.js';
import {selectUser} from '../../features/user/userSlice.js';
import Navbar from "../Navbar/Navbar.jsx";

const adminTabs = {
  '/stats_by_cards': 0,
  '/stats_by_employees': 1,
  '/stats_by_reasons': 2,
  '/stats_by_solutions': 3,
  '/stats_by_repeated_calls': 4,
  '/stats_by_inactives_users': 5,
};

const userTabs = {
  '/stats_by_cards': 0,
  '/stats_by_reasons': 2,
  '/stats_by_solutions': 3,
  '/stats_by_repeated_calls': 4,
  '/stats_by_inactives_users': 5,
};

const Layout = ({ children }) => {
  const location = useLocation();
  const user = useAppSelector(selectUser);
  const { pathname } = useLocation();
  const [currentTab, setCurrentTab] = useState();

  useEffect(() => {
    if (
      currentTab !== (user?.role === 'admin' ? adminTabs : userTabs)[pathname]
    ) {
      setCurrentTab((user?.role === 'admin' ? adminTabs : userTabs)[pathname]);
    }
  }, [currentTab, user, pathname]);
  const onExcludedPage = location.pathname.includes('/sign-in');

  const onReportsPage =
    location.pathname.includes('/stats_by_employees') ||
    location.pathname.includes('/stats_by_cards') ||
    location.pathname.includes('/stats_by_reasons') ||
    location.pathname.includes('/stats_by_solutions') ||
    location.pathname.includes('/stats_by_repeated_calls') ||
    location.pathname.includes('/stats_by_inactives_users');

  const navigate = useNavigate();
  return (
    <>
      <div className="layout">
        <aside>
          <Navbar/>
        </aside>
        <div className="main-area">
          {onExcludedPage ? <></> : <AppToolbar />}
          <main>
            <Container
              maxWidth={false}
              component="main"
              disableGutters
              sx={{ minHeight: '80vh' }}
            >
              {children}
            </Container>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
