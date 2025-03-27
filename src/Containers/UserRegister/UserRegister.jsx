import React, { useState } from "react";
import {Box, Stack, TextField, Typography, Button, MenuItem, Alert} from "@mui/material";
import {useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Grid from "@mui/material/Grid2";
import {selectRegisterError, selectRegisterLoading} from "../../features/user/userSlice.js";
import {register} from "../../features/user/userThunk.js";

const UserRegister = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(selectRegisterLoading);
    const error = useAppSelector(selectRegisterError);
    const [state, setState] = useState({
        username: "",
        name: "",
        phone_number: "+996",
        password: "",
        confirmPassword: "",
        sip: '',
        role: '',
    });

    const inputChangeHandler = (event) => {
        const { name, value } = event.target;

        if (name !== "phone_number") {
            setState((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }else{
            if (value.trim().length >= 4){
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
                full_name: state.name.trim(),
                sip: state.sip.trim(),
                role: state.role,
                phone_number: state.phone_number.trim(),
                password: state.password.trim(),
            };

            await dispatch(register(userMutation)).unwrap();
            navigate("/");
        } catch (e) {
            console.log(e)
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
                        maxWidth: "500px",
                        width: '100%',
                    }}
                >
                    <Typography component="h1" variant="h5" gutterBottom>
                        Регистрация
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
                                    label="Username"
                                    name="username"
                                    autoComplete="new-username"
                                    value={state.username}
                                    onChange={inputChangeHandler}
                                    sx={{
                                        width: '100%',
                                    }}
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
                                    sx={{
                                        width: '100%',
                                    }}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    required
                                    type="text"
                                    label="SIP"
                                    name="sip"
                                    autoComplete="new-sip"
                                    value={state.sip}
                                    onChange={inputChangeHandler}
                                    sx={{
                                        width: '100%',
                                    }}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    required
                                    select
                                    type="text"
                                    label="Роль"
                                    name="role"
                                    autoComplete="new-role"
                                    value={state.role}
                                    onChange={inputChangeHandler}
                                    sx={{
                                        width: '100%',
                                    }}
                                >
                                    <MenuItem value={"user"}>
                                        Пользователь
                                    </MenuItem>
                                    <MenuItem value={"admin"}>
                                        Администратор
                                    </MenuItem>
                                </TextField>
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
                                    sx={{
                                        width: '100%',
                                    }}
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
                                        width: '100%',
                                    }}
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
                            Сохранить
                        </Button>
                    </Box>
                </Box>
            </Stack>
        </Stack>
    );
};

export default UserRegister;
