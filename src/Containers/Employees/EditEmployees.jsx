import {useAppDispatch, useAppSelector} from '../../app/hooks.js';
import {useNavigate, useParams} from 'react-router-dom';
import {selectEditEmployeeLoading, selectEmployee, selectEmployeeLoading,} from '../../features/user/userSlice.js';
import React, {useEffect, useState} from 'react';
import {editEmployees, getEmployee,} from '../../features/user/userThunk.js';
import {Alert, Box, Button, MenuItem, Stack, TextField} from '@mui/material';
import Grid from '@mui/material/Grid2';

const EditEmployee = () => {
  const { id } = useParams();
  const employee = useAppSelector(selectEmployee);
  const employeeLoading = useAppSelector(selectEmployeeLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectEditEmployeeLoading);
  const [error, setError] = useState(null);
  const [state, setState] = useState({
    username: '',
    name: '',
    phone_number: '',
    newPassword: '',
    confirmPassword: '',
    sip: '',
    role: '',
  });

  useEffect(() => {
    dispatch(getEmployee(id));
  }, []);

  useEffect(() => {
    if (employee?.[0]) {
      setState({
        username: employee?.[0].username,
        name: employee?.[0].full_name,
        phone_number: employee?.[0].phone_number,
        newPassword: '',
        confirmPassword: '',
        sip: employee?.[0].sip,
        role: employee?.[0].role,
      });
    }
  }, [employee]);

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    if (name !== 'phone_number') {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      if (value.trim().length >= 4) {
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
      if (state.password && state.password !== state.confirmPassword) {
        return setError({ message: 'Пороли не совпадают!' });
      }

      const userMutation = {
        username: state.username.trim(),
        full_name: state.name.trim(),
        sip: state.sip.trim(),
        role: state.role,
        phone_number: state.phone_number.trim(),
        password: state.password?.trim(),
      };

      console.log(userMutation);
      await dispatch(editEmployees(userMutation)).unwrap();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Stack sx={{ width: '100%' }} textAlign="center">
      <Stack alignItems="center" justifyContent="center" m={4}>
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '500px',
            width: '100%',
          }}
        >
          {error && (
            <Alert severity="error" sx={{ my: 1 }}>
              {error.message}
            </Alert>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={submitFormHandler}
            sx={{
              mt: 3,
              width: '100%',
              mx: 'auto',
            }}
          >
            <Grid container direction="column" spacing={2}>
              <Grid>
                <TextField
                  required
                  type="text"
                  label="Логин"
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
                  label="ФИО"
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
                  label="СИП"
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
                  <MenuItem value={'user'}>Пользователь</MenuItem>
                  <MenuItem value={'admin'}>Администратор</MenuItem>
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
              <Grid>
                <TextField
                  required
                  type="password"
                  label="Подтвердите пороль"
                  name="confirmPassword"
                  autoComplete="new-confirmPassword"
                  value={state.confirmPassword || ''}
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
              sx={{
                mt: 3,
                mb: 2,
              }}
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

export default EditEmployee;
