import {AppBar, Button, Container, Link, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {logout, selectUser} from "../../features/user/userSlice.js";
import {useAppDispatch, useAppSelector} from "../../app/hooks.js";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from "@mui/icons-material/Logout";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const AppToolbar = ()=>{
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await dispatch(logout());
        navigate("/sign-in");
    };

    return(
        <>
            <AppBar position="sticky" color="inherit">
                <Toolbar>
                    <Container maxWidth="lg">
                        <Grid
                            sx={{ width: "100%" }}
                            container
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid>
                                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                                    <Link href="/">
                                       Logo
                                    </Link>
                                </Typography>
                            </Grid>
                            {user ?
                                <Grid container spacing={2}>
                                    <Button onClick={handleClick} sx={{
                                        color: "#000",
                                    }}>
                                        {user.name}
                                    </Button>
                                    <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted>
                                        {user.role === "admin" &&
                                            <MenuItem>
                                                <Link sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                }} href={"solution-and-reason"}>
                                                    Присок причин и решений
                                                </Link>
                                            </MenuItem>
                                        }
                                        <MenuItem>
                                            <Link sx={{
                                                width: "100%",
                                                height: "100%",
                                            }} href={"reports"}>
                                                Отчеты
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link sx={{
                                                width: "100%",
                                                height: "100%",
                                            }} href={"create-card"}>
                                                Создать карту
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            <LogoutIcon sx={{ mr: 2 }} />
                                            Выход
                                        </MenuItem>
                                    </Menu>
                                </Grid>
                                :
                                <Link href={"/sign-in"} sx={{
                                    textDecoration: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    color: '#000',
                                }}>
                                    <Grid>
                                        <PermIdentityIcon sx={{
                                            fontSize: '30px',
                                        }}/>
                                    </Grid>
                                    <Typography sx={{

                                    }}>
                                        Войти
                                    </Typography>
                                </Link>
                            }
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default AppToolbar;