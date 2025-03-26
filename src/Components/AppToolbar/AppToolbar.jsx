import {AppBar, Button, Container, Link, List, ListItem, Popover, Toolbar, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {selectUser} from "../../features/user/userSlice.js";
import {useAppSelector} from "../../app/hooks.js";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const AppToolbar = ()=>{
    const user = useAppSelector(selectUser);

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
                                <Grid>
                                    <Button onClick={handleClick} sx={{
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
                                            {user.name}
                                        </Typography>
                                    </Button>
                                    <Popover
                                        id={id}
                                        open={open}
                                        aria-hidden={!open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "left",
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                    >
                                        <List
                                            sx={{
                                                width: "100%",
                                                maxWidth: 360,
                                                bgcolor: "background.paper",
                                            }}
                                        >
                                            <ListItem alignItems="center">
                                                <Link href={"/profile"}>
                                                    Профиль
                                                </Link>
                                            </ListItem>
                                            <ListItem alignItems="center">
                                                <Link href={"/profile"}>
                                                    Профиль
                                                </Link>
                                            </ListItem>
                                        </List>
                                    </Popover>
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