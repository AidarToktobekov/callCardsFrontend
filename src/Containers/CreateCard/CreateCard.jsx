import Grid from "@mui/material/Grid2";
import {
  Alert,
  Autocomplete,
  Button,
  Container,
  MenuItem,
  TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.js";
import {
  selectClients,
  selectClientsLoading,
  selectCreateCardLoading,
  selectReasons,
  selectSolutions
} from "../../features/list/listSlice.js";
import {
  createCard,
  getClient,
  getReasons,
  getSolution
} from "../../features/list/listThunk.js";
import { selectUser } from "../../features/user/userSlice.js";
import { useNavigate } from "react-router-dom";

const CreateCard = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectCreateCardLoading);
  const [error, setError] = useState('');
  const [state, setState] = useState({
    call_from: '',
    ls_abon: '',
    account_id: '',
    n_result_id: '',
    spec_full_name: '',
    sip: '',
    full_name: "",
    phone_number: [],
    address: '',
    comment: '',
    reason: {
      id: '',
      title: '',
    },
    solution: {
      id: '',
      reason: {
        id: "",
        title: '',
      },
      title: '',
    },
    ip_address: '',
    mac_address: '',
    ip_olt: '',
    mac_onu: '',
  });
  
  const [cardIndex, setCardIndex] = useState(0);
  
  const handleCardChange = (e) => {
    setCardIndex(e.target.value);
  };
  
  const inputChangeHandler = (e) => {
    const {
      name,
      value
    } = e.target;
    setState(prevState => (
      {
        ...prevState,
        [name]: value
      }
    ));
  }
  
  const selectChangeHandler = (event, arr) => {
    const {
      name,
      value
    } = event.target;
    if (!value) {
      setState((prevState) => (
        {
          ...prevState,
          [name]: {
            id: '',
            reason_id: '',
            title: '',
          },
        }
      ))
    } else {
      const selectedItem = arr.find(item => item.title === value);
      setState((prevState) => (
        {
          ...prevState,
          [name]: selectedItem,
        }
      ));
    }
    
  }
  
  const cards = useAppSelector(selectClients);
  const clientsLoading = useAppSelector(selectClientsLoading);
  const [phoneNumber, setPhoneNumber] = useState("");
  const reasons = useAppSelector(selectReasons);
  const solutions = useAppSelector(selectSolutions);
  
  useEffect(() => {
    dispatch(getSolution());
    dispatch(getReasons());
  }, [dispatch]);
  
  useEffect(() => {
    if (cards[cardIndex]) {
      setState(prevState => (
        {
          ...prevState,
          ls_abon: cards[cardIndex].ls_abon,
          full_name: cards[cardIndex].full_name,
          phone_number: cards[cardIndex].phone_number,
          address: cards[cardIndex].address,
          ip_address: cards[cardIndex].ip_address,
          mac_address: cards[cardIndex].mac_address,
          account_id: cards[cardIndex].account_id,
          n_result_id: cards[cardIndex].n_result_id,
          mac_onu: cards[cardIndex].mac_onu,
          ip_olt: cards[cardIndex].ip_olt,
        }
      ));
    }
  }, [
    dispatch,
    cardIndex,
    cards
  ]);
  
  
  const changePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  
  const submitFormHandler = async (event) => {
    event.preventDefault();
    
    if (user) {
      const cardMutation = {
        ls_abon: state.ls_abon,
        phone_number: state.phone_number,
        sip: user.sip,
        spec_full_name: user.name,
        full_name: state.full_name,
        call_from: state.call_from,
        address: state.address,
        reason_id: state.reason.id,
        solution_id: state.solution.id,
        comment: state.comment.trim(),
        ip_address: '',
        mac_address: '',
        ip_olt: '',
        mac_onu: '',
      };
      
      await dispatch(createCard(cardMutation));
      setState({
        call_from: '',
        ls_abon: '',
        account_id: '',
        n_result_id: '',
        spec_full_name: '',
        sip: '',
        full_name: "",
        phone_number: [],
        address: '',
        comment: '',
        reason: {
          id: '',
          title: '',
        },
        solution: {
          id: '',
          reason: {
            id: "",
            title: '',
          },
          title: '',
        },
        ip_address: '',
        mac_address: '',
        ip_olt: '',
        mac_onu: '',
      });
      navigate("/");
    } else {
      setError("Зарегстрируйтесь!")
    }
  };
  
  const searchClient = async () => {
    await dispatch(getClient(phoneNumber));
  }
  
  return (
    <>
      <Grid padding={"30px"}>
        <Container maxWidth='lg'>
          {error && (
            <Alert
              severity='error'
              sx={{ mb: 3 }}
            >
              {error}
            </Alert>
          )}
          <Grid
            component={"form"}
            onSubmit={submitFormHandler}
            container
          >
            <Grid
              container
              flexDirection={"column"}
              gap={"15px"}
              sx={{
                width: "40%",
                paddingRight: '20px'
              }}
            >
              <Grid
                container
                gap={"10px"}
              >
                <TextField
                  variant={"outlined"}
                  label={"Номер или лицевой счет"}
                  value={phoneNumber}
                  onChange={changePhoneNumber}
                  sx={{
                    flexGrow: '1',
                  }}
                ></TextField>
                <Button
                  onClick={searchClient}
                  loading={clientsLoading}
                  variant='outlined'
                >
                  Search
                </Button>
              </Grid>
              <Grid>
                <TextField
                  required
                  select
                  label={"Клиенты"}
                  id='card'
                  name='card'
                  value={cards.length > 0 ? String(cardIndex) : ""}
                  onChange={handleCardChange}
                  sx={{
                    width: '100%'
                  }}
                >
                  {cards.map((card, index) => (
                    <MenuItem
                      key={index}
                      value={index}
                    >
                      {card.full_name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid>
                <TextField
                  label={"Номер с которого звонили"}
                  name={"call_from"}
                  onChange={inputChangeHandler}
                  sx={{
                    width: '100%'
                  }}
                  value={state.call_from}
                ></TextField>
              </Grid>
              <Grid>
                <TextField
                  required
                  label={"Личный счет"}
                  sx={{
                    width: '100%'
                  }}
                  value={state.ls_abon}
                ></TextField>
              </Grid>
              <Grid>
                <TextField
                  label={"Аккаунт айди"}
                  sx={{
                    width: '100%'
                  }}
                  value={state.account_id}
                ></TextField>
              </Grid>
              <Grid>
                <TextField
                  label={"n_result_id"}
                  sx={{
                    width: '100%'
                  }}
                  value={state.n_result_id}
                ></TextField>
              </Grid>
              <Grid>
                <TextField
                  required
                  label={"ФИО"}
                  value={state.full_name}
                  sx={{
                    width: '100%'
                  }}
                ></TextField>
              </Grid>
              <Grid>
                <TextField
                  required
                  label={"Адрес"}
                  value={state.address}
                  sx={{
                    width: '100%'
                  }}
                ></TextField>
              </Grid>
              <Grid>
                <Autocomplete
                  required
                  multiple
                  options={state.phone_number}
                  value={state.phone_number}
                  disableClearable
                  readOnly
                  renderInput={params =>
                    <TextField {...params} label={"Номера"}></TextField>}
                ></Autocomplete>
              </Grid>
              <Grid>
                <TextField
                  required
                  label={"Мак роутера"}
                  value={state.mac_address}
                  sx={{
                    width: '100%'
                  }}
                ></TextField>
              </Grid>
              <Grid>
                <TextField
                  required
                  label={"Айпи адрес"}
                  value={state.ip_address}
                  sx={{
                    width: '100%'
                  }}
                ></TextField>
              </Grid>
              <Grid>
                <TextField
                  label={"mac_onu"}
                  value={state.mac_onu || ""}
                  sx={{
                    width: '100%'
                  }}
                ></TextField>
              </Grid>
              <Grid>
                <TextField
                  label={"ip_olt"}
                  value={state.ip_olt || ""}
                  sx={{
                    width: '100%'
                  }}
                ></TextField>
              </Grid>
            </Grid>
            <Grid
              container
              flexDirection={"column"}
              gap={"15px"}
              sx={{
                width: "60%",
              }}
            >
              <Grid>
                <TextField
                  required
                  select
                  label={"Причина обращения"}
                  id='resone-for-contact'
                  name='reason'
                  value={state.reason.title || ""}
                  onChange={(e) => selectChangeHandler(e, reasons)}
                  sx={{
                    width: '100%'
                  }}
                >
                  {reasons.map((item, index) => (
                    <MenuItem
                      value={item.title}
                      key={index}
                    >
                      {item.title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid>
                <TextField
                  select
                  id='solution'
                  value={state.solution.title || ""}
                  label='Решение'
                  variant='outlined'
                  onChange={(e) => selectChangeHandler(e, solutions)}
                  name={"solution"}
                  sx={{
                    width: '100%'
                  }}
                >
                  <MenuItem value={''}>Нет решения</MenuItem>
                  {solutions.map((item, index) => {
                    if (!state.reason.id) {
                      return (
                        <MenuItem
                          value={item.title}
                          key={index}
                        >{item.title}</MenuItem>
                      )
                    }
                    if (state.reason.id && state.reason.id === item.reason.id) {
                      return (
                        <MenuItem
                          value={item.title}
                          key={index}
                        >{item.title}</MenuItem>
                      )
                    }
                  })}
                </TextField>
              </Grid>
              <Grid>
                <TextField
                  label='Комментарий'
                  minRows={3}
                  multiline
                  onChange={inputChangeHandler}
                  name={"comment"}
                  value={state.comment}
                  sx={{
                    width: '100%'
                  }}
                ></TextField>
              </Grid>
              <Button
                variant={"outlined"}
                loading={loading}
                type={"submit"}
              >
                Сохранить
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </>
  );
};

export default CreateCard;