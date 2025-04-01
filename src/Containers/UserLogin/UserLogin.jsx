import React, { useState } from "react";
import { Alert, Avatar, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Grid from "@mui/material/Grid2";
import { login } from "../../features/user/userThunk.js";
import {
  selectLoginError,
  selectLoginLoading
} from "../../features/user/userSlice.js";
import { LoadingButton } from "@mui/lab";
import LockIcon from '@mui/icons-material/Lock';
import { deepPurple } from '@mui/material/colors';
import './userLogin.css';

const UserLogin = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoginLoading);
  const error = useAppSelector(selectLoginError);
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  
  const onChange = (event) => {
    const {
      name,
      value
    } = event.target;
    
    setState((prevState) => (
      {
        ...prevState,
        [name]: value,
      }
    ));
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
    <Container
      className='sign-in'
      component='form'
      maxWidth='xs'
      onSubmit={submitFormHandler}
    >
      <Avatar
        sx={{
          bgcolor: deepPurple[500],
          m: '0 auto'
        }}
      >
        <LockIcon style={{ color: 'white' }}/>
      </Avatar>
      <Typography
        component='h1'
        variant='h5'
        sx={{
          color: '#FFFFFF',
          textAlign: 'center',
          pb: '20px'
        }}
      >
        Вход в систему
      </Typography>
      <TextField
        id='username'
        name='username'
        label='Имя пользователя'
        variant='outlined'
        value={state?.username}
        onChange={onChange}
      />
      <TextField
        id='username'
        type='password'
        name='password'
        label='Пароль'
        variant='outlined'
        value={state?.password}
        onChange={onChange}
      />
      <LoadingButton
        type='submit'
        fullWidth
        variant='contained'
        sx={{
          mt: 3,
          mb: 2
        }}
        disabled={!state.username || !state.password}
        loading={loading}
      >
        Логин
      </LoadingButton>
      <Grid
        container
        justifyContent='flex-end'
      >
        {!!error && <Alert severity='error' sx={{width: '100%'}}>{error?.message}</Alert>}
      </Grid>
    </Container>
  );
};

export default UserLogin;
