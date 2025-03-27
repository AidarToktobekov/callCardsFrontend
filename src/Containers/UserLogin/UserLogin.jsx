import React, { useState} from "react";
import {Box, Stack, TextField, Typography, Button, Alert} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Grid from "@mui/material/Grid2";
import {login} from "../../features/user/userThunk.js";
import {selectLoginError, selectLoginLoading} from "../../features/user/userSlice.js";

const UserLogin = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLoginLoading);
    const error = useAppSelector(selectLoginError);
    const navigate = useNavigate();
    const [state, setState] = useState({
        username: "",
        password: "",
    });

    const inputChangeHandler = (event) => {
        const { name, value } = event.target;

        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitFormHandler = async (event) => {
        event.preventDefault();
        try {
            const userMutation = {
                username: state.username.trim(),
                password: state.password.trim(),
            };

            await dispatch(login(userMutation)).unwrap();
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
                       Login Title
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{ my: 1}}>
                            {error.message}
                        </Alert>
                    )}
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
                                    label="Имя пользователя"
                                    name="username"
                                    autoComplete="new-username"
                                    value={state.username}
                                    sx={{
                                        width: "100%",
                                    }}
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
                                    sx={{
                                        width: "100%",
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            loading={loading}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Войти
                        </Button>
                    </Box>
                </Box>
            </Stack>
        </Stack>
    );
};

export default UserLogin;
