import Grid from '@mui/material/Grid2';
import {
  Alert,
  Autocomplete,
  Button,
  CircularProgress,
  Container,
  FormControlLabel,
  MenuItem,
  Switch,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.js';
import {
  resetClients,
  selectClients,
  selectClientsLoading,
  selectCreateCardLoading,
  selectReasons,
  selectReasonsLoading,
  selectSolutions,
  selectSolutionsLoading,
} from '../../features/list/listSlice.js';
import {
  createCard,
  getClient,
  getReasons,
  getSolution,
} from '../../features/list/listThunk.js';
import { selectUser } from '../../features/user/userSlice.js';

const CreateCard = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCreateCardLoading);
  const [error, setError] = useState('');
  const [state, setState] = useState(null);

  const [cardIndex, setCardIndex] = useState(0);

  const handleCardChange = (e) => {
    setCardIndex(e.target.value);
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    if (
      ['ls_abon', 'full_name', 'address'].includes(name) &&
      state?.reason?.title !== 'Интерком' &&
      state?.reason?.title !== 'Желает подключиться'
    )
      return;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const selectChangeHandler = (name, value) => {
    if (value?.id !== 'placeholder') {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const cards = useAppSelector(selectClients);
  const clientsLoading = useAppSelector(selectClientsLoading);
  const [phoneNumber, setPhoneNumber] = useState('');
  const reasons = useAppSelector(selectReasons);
  const reasonLoading = useAppSelector(selectReasonsLoading);
  const solutions = useAppSelector(selectSolutions);
  const solutionLoading = useAppSelector(selectSolutionsLoading);

  useEffect(() => {
    if (state?.reason?.id) {
      const newSolutions = [];
      solutions.map((item) => {
        if (state?.reason?.id && state?.reason?.id === item?.reason?.id) {
          newSolutions.push(item);
        }
      });
      if (newSolutions.length > 0) {
        setFilteredSolution(newSolutions);
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        solution: null,
      }));
      setFilteredSolution([
        {
          id: 'placeholder',
          title: 'Выберите причину',
        },
      ]);
    }
  }, [state?.reason, solutions, dispatch]);

  useEffect(() => {
    dispatch(getSolution());
    dispatch(getReasons());

    return () => {
      setState(null);
      dispatch(resetClients());
    };
  }, [dispatch]);

  useEffect(() => {
    if (cards[cardIndex]) {
      setState((prevState) => ({
        ...prevState,
        ls_abon: cards[cardIndex].ls_abon,
        full_name: cards[cardIndex].full_name,
        phone_number: cards[cardIndex].phone_number,
        address: cards[cardIndex].address,
        ip_address: cards[cardIndex].ip_address,
        mac_address: cards[cardIndex].mac_address,
        account_id: cards[cardIndex].account_id,
        n_base_subject_id: cards[cardIndex].n_base_subject_id,
        n_result_id: cards[cardIndex].n_result_id,
        mac_onu: cards[cardIndex].mac_onu,
        ip_olt: cards[cardIndex].ip_olt,
      }));
    }
  }, [dispatch, cardIndex, cards]);

  const changePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();

    if (user) {
      const cardMutation = {
        ls_abon: state?.ls_abon,
        phone_number: state?.phone_number,
        sip: user.sip,
        spec_full_name: user?.name,
        full_name: state?.full_name,
        call_from: state?.call_from,
        address: state?.address,
        reason_id: state?.reason?.id,
        solution_id: state?.solution?.id,
        comment: state?.comment?.trim(),
        ip_address: state?.ip_address,
        mac_address: state?.mac_address,
        ip_olt: state?.ip_olt,
        mac_onu: state?.mac_onu,
        account_id: `${state?.account_id}`,
        n_base_subject_id: `${state?.n_base_subject_id}`,
        n_result_id: `${state?.n_result_id}`,
        save_call_from: state?.save_call_from,
      };

      await dispatch(createCard(cardMutation));
      await setState(null);
      await setPhoneNumber('');
      await dispatch(resetClients());
    } else {
      setError('Зарегстрируйтесь!');
    }
  };

  const searchClient = async () => {
    await dispatch(getClient(phoneNumber));
  };

  const [openReason, setOpenReason] = useState(false);
  const [openSolution, setOpenSolution] = useState(false);

  const [filteredSolution, setFilteredSolution] = useState([
    {
      id: 'placeholder',
      title: 'Выберите причину',
    },
  ]);

  return (
    <>
      <Grid padding={'30px'}>
        <Container maxWidth="lg">
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          <Grid component={'form'} onSubmit={submitFormHandler} container>
            <Grid
              container
              sx={{
                display: 'flex',
                gap: '15px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  width: '100%',
                  gap: '20px',
                  marginBottom: '15px',
                }}
              >
                <TextField
                  variant={'outlined'}
                  label={'Найти абонента...'}
                  value={phoneNumber}
                  onChange={changePhoneNumber}
                  sx={{ flexGrow: 1 }}
                />
                <Button
                  onClick={searchClient}
                  loading={clientsLoading}
                  variant="outlined"
                >
                  Поиск
                </Button>
                <TextField
                  required={
                    !['Callback', 'Желает подключиться', 'Интерком'].includes(
                      state?.reason?.title
                    )
                  }
                  select
                  label="Найденные абоненты"
                  id="card"
                  name="card"
                  value={cards.length > 0 ? String(cardIndex) : ''}
                  onChange={handleCardChange}
                  sx={{ width: '100%' }}
                >
                  {cards.map((card, index) => (
                    <MenuItem key={index} value={index}>
                      {card.full_name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <Autocomplete
                open={openReason}
                onOpen={() => setOpenReason(true)}
                onClose={() => setOpenReason(false)}
                getOptionLabel={(option) => option.title}
                onChange={(event, newValue) => {
                  selectChangeHandler('reason', newValue);
                }}
                value={
                  state?.reason || {
                    id: '',
                    title: '',
                  }
                }
                options={reasons}
                loading={reasonLoading}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    name={'reason'}
                    label={'Причина обращения'}
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {reasonLoading ? (
                              <CircularProgress color={'inherit'} size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      },
                    }}
                  />
                )}
                sx={{
                  width: 'calc(50% - 7.5px)',
                }}
              />
              <Autocomplete
                open={openSolution}
                onOpen={() => setOpenSolution(true)}
                onClose={() => setOpenSolution(false)}
                getOptionLabel={(option) => option.title}
                onChange={(event, newValue) => {
                  selectChangeHandler('solution', newValue);
                }}
                value={
                  state?.solution || {
                    id: '',
                    title: '',
                  }
                }
                options={filteredSolution}
                loading={solutionLoading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    name={'solution'}
                    label={'Решение'}
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {solutionLoading ? (
                              <CircularProgress color={'inherit'} size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      },
                    }}
                  />
                )}
                sx={{
                  width: 'calc(50% - 7.5px)',
                }}
              />
              <TextField
                label={'Номер с которого звонили'}
                name={'call_from'}
                onChange={inputChangeHandler}
                sx={{ width: 'calc(50% - 7.5px)' }}
                value={state?.call_from || ''}
                required
              />
              <TextField
                required={
                  !['Callback', 'Желает подключиться'].includes(
                    state?.reason?.title
                  )
                }
                name="ls_abon"
                label={'Лицевой счет'}
                value={state?.ls_abon || ''}
                sx={{ width: 'calc(50% - 7.5px)' }}
                onChange={inputChangeHandler}
              />
              <TextField
                required={!['Callback'].includes(state?.reason?.title)}
                name="full_name"
                label={'ФИО'}
                value={state?.full_name || ''}
                sx={{ width: 'calc(50% - 7.5px)' }}
                onChange={inputChangeHandler}
              />
              <TextField
                required={!['Callback'].includes(state?.reason?.title)}
                name="address"
                label={'Адрес'}
                value={state?.address || ''}
                sx={{ width: 'calc(50% - 7.5px)' }}
                onChange={inputChangeHandler}
              />
              <Autocomplete
                required
                multiple
                options={state?.phone_number}
                value={
                  Array.isArray(state?.phone_number) ? state.phone_number : []
                }
                disableClearable
                readOnly
                renderInput={(params) => (
                  <TextField {...params} label={'Номера'}></TextField>
                )}
                sx={{ width: 'calc(50% - 7.5px)' }}
              />
              <TextField
                required={
                  ![
                    'Callback',
                    'Желает подключиться',
                    'Ждет подключения',
                    'Интерком',
                  ].includes(state?.reason?.title)
                }
                label={'Мак роутера'}
                value={state?.mac_address || ''}
                sx={{ width: 'calc(50% - 7.5px)' }}
              />
              <TextField
                required={
                  ![
                    'Callback',
                    'Желает подключиться',
                    'Ждет подключения',
                    'Интерком',
                  ].includes(state?.reason?.title)
                }
                label={'Айпи адрес'}
                value={state?.ip_address || ''}
                sx={{ width: 'calc(50% - 7.5px)' }}
              />
              <TextField
                label={'mac_onu'}
                value={state?.mac_onu || ''}
                sx={{ width: 'calc(50% - 7.5px)' }}
              />
              <TextField
                label={'ip_olt'}
                value={state?.ip_olt || ''}
                sx={{ width: 'calc(50% - 7.5px)' }}
              />
              <FormControlLabel
                value="end"
                control={
                  <Switch
                    checked={!!state?.save_call_from || false}
                    color="primary"
                    onChange={(_, value) =>
                      inputChangeHandler({
                        target: {
                          name: 'save_call_from',
                          value,
                        },
                      })
                    }
                  />
                }
                label="Сохранить в Гидре номер с которого звонили"
                labelPlacement="end"
              />
              <TextField
                label="Комментарий"
                minRows={3}
                multiline
                onChange={inputChangeHandler}
                sx={{ width: '100%' }}
                name={'comment'}
                value={state?.comment || ''}
              />
            </Grid>
            <Button
              variant={'outlined'}
              size="large"
              loading={loading}
              type={'submit'}
              sx={{
                width: '100%',
                mt: '15px',
              }}
            >
              Создать
            </Button>
          </Grid>
        </Container>
      </Grid>
    </>
  );
};

export default CreateCard;
