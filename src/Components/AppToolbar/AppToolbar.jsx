import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { logout, selectUser } from '../../features/user/userSlice.js';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch, useAppSelector } from '../../app/hooks.js';
import { getPageTitle, PAGE_NAMES } from '../../constants.js';

const AppToolbar = () => {
  const location = useLocation();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const title = getPageTitle(location.pathname);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = (url) => {
    navigate(url);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/sign-in');
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            {!!user && (
              <div style={{ marginLeft: 'auto' }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleClick('/')}>
                    Новая карточка
                  </MenuItem>
                  {user?.role === 'admin' && (
                    <MenuItem
                      onClick={() => handleClick('/solution-and-reason')}
                    >
                      Причины/решения
                    </MenuItem>
                  )}
                  <MenuItem onClick={() => handleClick('/stats_by_cards')}>
                    Отчёты
                  </MenuItem>
                  {user?.role === 'admin' && (
                    <MenuItem onClick={() => handleClick('/sign-up')}>
                      Новый пользователь
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>Выйти</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default AppToolbar;
