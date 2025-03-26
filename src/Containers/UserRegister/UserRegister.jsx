import React, { useState } from "react";
import {Box, Stack, TextField, Typography, Link, Button} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Grid from "@mui/material/Grid2";
import {selectRegisterLoading} from "../../features/user/userSlice.js";

const UserRegister = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(selectRegisterLoading);
    const [state, setState] = useState({
        username: "",
        name: "",
        phone_number: "996",
        password: "",
        confirmPassword: "",
    });

    const inputChangeHandler = (event) => {
        const { name, value } = event.target;

        if (name !== "phone_number") {
            setState((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }else{
            if (value.trim().length >= 3){
                setState((prevState) => ({
                    ...prevState,
                    [name]: value,
                }));
            }
        }
    };

    const submitFormHandler = async (event) => {
        event.preventDefault();
        try {
            const userMutation = {
                username: state.username.trim(),
                name: state.name.trim(),
                phone_number: state.phone_number.trim(),
                password: state.password.trim(),
                confirmPassword: state.confirmPassword.trim(),
            };

            await dispatch(register(userMutation)).unwrap();
            navigate("/");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Stack sx={{ width: "100%" }} textAlign="center" mt={3}>
            <Stack alignItems="center" justifyContent="center" m={4}>
                <Box
                    sx={{
                        mt: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5" gutterBottom>
                        Присоединяйтесь к нам <br /> и наслаждайтесь фитнесом!
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={submitFormHandler}
                        sx={{ mt: 3, width: "100%", mx: "auto" }}
                    >
                        <Grid container direction="column" spacing={2}>
                            <Grid>
                                <TextField
                                    required
                                    type="text"
                                    label="Username"
                                    name="username"
                                    autoComplete="new-username"
                                    value={state.username}
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    required
                                    type="text"
                                    label="Name"
                                    name="name"
                                    autoComplete="new-name"
                                    value={state.name}
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    required
                                    type="tel"
                                    label="Phone number"
                                    name="phone_number"
                                    autoComplete="new-phone_number"
                                    value={state.phone_number}
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    required
                                    type="password"
                                    label="Пароль"
                                    name="password"
                                    autoComplete="new-password"
                                    value={state.password}
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    required
                                    type="password"
                                    label="Подтвердите пароль"
                                    name="confirmPassword"
                                    autoComplete="new-password"
                                    value={state.confirmPassword}
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            loading={loading}
                        >
                            Регистрация
                        </Button>
                        <Typography variant="body1">
                            <Link component={RouterLink} to={"sign-in"}>
                                Войти
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Stack>
        </Stack>
    );
};

export default UserRegister;
