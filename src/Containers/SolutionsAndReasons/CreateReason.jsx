import Grid from '@mui/material/Grid2';
import { Alert, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import { createReason } from '../../features/reasonsAndSolution/reasonsAndSolutionThunk.js';
import { useAppDispatch, useAppSelector } from '../../app/hooks.js';
import { useNavigate } from 'react-router-dom';
import {
  selectCreateReasonError,
  selectCreateReasonLoading,
} from '../../features/reasonsAndSolution/reasonsAndSolutionSlice.js';

const CreateReason = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCreateReasonLoading);
  const error = useAppSelector(selectCreateReasonError);
  const navigate = useNavigate();

  const [reasonTitle, setReasonTitle] = React.useState('');

  const inputChangeHandler = (e) => {
    setReasonTitle(e.target.value);
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      const reason = {
        title: reasonTitle.trim(),
      };

      await dispatch(createReason(reason)).unwrap();
      navigate('/solution-and-reason');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid>
        <Container maxWidth={'lg'}>
          <Typography
            variant="h3"
            sx={{
              fontSize: '25px',
              textAlign: 'center',
              margin: '30px 0 0',
            }}
          >
            Создание причины
          </Typography>
          <Grid
            component={'form'}
            container
            flexDirection={'column'}
            spacing={2}
            justifyContent={'center'}
            onSubmit={submitFormHandler}
            sx={{
              maxWidth: '500px',
              margin: '30px auto',
            }}
          >
            {error && (
              <Alert severity="error" sx={{ my: 1 }}>
                {error.error}
              </Alert>
            )}
            <Grid>
              <TextField
                type="text"
                label="Причина"
                name="title"
                autoComplete="new-reason-title"
                value={reasonTitle}
                sx={{
                  width: '100%',
                }}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Button loading={loading} type={'submit'} variant="contained">
              Сохранить
            </Button>
          </Grid>
        </Container>
      </Grid>
    </>
  );
};

export default CreateReason;
