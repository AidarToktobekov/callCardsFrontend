import { useAppDispatch, useAppSelector } from '../../app/hooks.js';
import { useNavigate, useParams } from 'react-router-dom';
import { selectEditEmployeeLoading, } from '../../features/user/userSlice.js';
import React, { useEffect, useState } from 'react';
import { editEmployees, } from '../../features/user/userThunk.js';
import { Alert, Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useFetchEmployeeForEdit } from "../../hooks.js";

const EditEmployee = () => {
  const { id } = useParams();
  const {
    employeeForEdit,
    employeeForEditLoading,
    fetchEmployeeForEdit
  } = useFetchEmployeeForEdit();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectEditEmployeeLoading);
  const [state, setState] = useState();
  
  useEffect(() => {
    if (id) {
      void fetchEmployeeForEdit(id);
    }
    return () => setState(null);
  }, [
    dispatch,
    id
  ]);
  
  useEffect(() => {
    setState(employeeForEdit);
  }, [employeeForEdit]);
  
  const inputChangeHandler = (event) => {
    const {
      name,
      value
    } = event.target;
    if (name !== 'phone_number') {
      setState((prevState) => (
        {
          ...prevState,
          [name]: value,
        }
      ));
    } else {
      if (value.trim().length >= 4) {
        setState((prevState) => (
          {
            ...prevState,
            [name]: value,
          }
        ));
      }
    }
  };
  
  const submitFormHandler = async (event) => {
    event.preventDefault();
    try {
      const userMutation = {
        id: state.id,
        username: state.username.trim(),
        full_name: state.full_name.trim(),
        sip: state.sip.trim(),
        role: state.role,
        phone_number: state.phone_number.trim(),
        password: state.password?.trim(),
      };
      
      await dispatch(editEmployees(userMutation)).unwrap();
      navigate('/employees');
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <Stack
      sx={{ width: '100%' }}
      textAlign='center'
    >
      <Stack
        alignItems='center'
        justifyContent='center'
        m={4}
      >
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
          <Box
            component='form'
            noValidate
            onSubmit={submitFormHandler}
            sx={{
              mt: 3,
              width: '100%',
              mx: 'auto',
            }}
          >
            <Grid
              container
              direction='column'
              spacing={2}
            >
              <Grid>
                <TextField
                  required
                  type='text'
                  label='Логин'
                  name='username'
                  autoComplete='off'
                  value={state?.username || ''}
                  onChange={inputChangeHandler}
                  sx={{
                    width: '100%',
                  }}
                />
              </Grid>
              <Grid>
                <TextField
                  required
                  type='text'
                  label='ФИО'
                  name='full_name'
                  autoComplete='off'
                  value={state?.full_name || ''}
                  onChange={inputChangeHandler}
                  sx={{
                    width: '100%',
                  }}
                />
              </Grid>
              <Grid>
                <TextField
                  required
                  type='text'
                  label='СИП'
                  name='sip'
                  autoComplete='off'
                  value={state?.sip || ''}
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
                  type='text'
                  label='Роль'
                  name='role'
                  autoComplete='off'
                  value={state?.role || ''}
                  onChange={inputChangeHandler}
                  sx={{
                    width: '100%',
                  }}
                >
                  <MenuItem value={'user'}>Пользователь</MenuItem>
                  <MenuItem value={'admin'}>Администратор</MenuItem>
                  <MenuItem value={'senior_spec'}>Старший специалист</MenuItem>
                </TextField>
              </Grid>
              <Grid>
                <TextField
                  required
                  type='tel'
                  label='Phone number'
                  name='phone_number'
                  autoComplete='off'
                  value={state?.phone_number || ''}
                  onChange={inputChangeHandler}
                  sx={{
                    width: '100%',
                  }}
                />
              </Grid>
              <Grid>
                <TextField
                  required
                  type='password'
                  label='Пароль'
                  name='password'
                  autoComplete='off'
                  value={state?.password || ''}
                  onChange={inputChangeHandler}
                  sx={{
                    width: '100%',
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{
                mt: 3,
                mb: 2,
              }}
              loading={loading || employeeForEditLoading}
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
