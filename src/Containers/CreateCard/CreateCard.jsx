import Grid from "@mui/material/Grid2";
import {Autocomplete, Button, Container, MenuItem, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.js";
import {selectClients, selectReasons, selectSolutions} from "../../features/list/listSlice.js";
import {createCard, getClient, getReasons, getSolution} from "../../features/list/listThunk.js";

const CreateCard = () => {

    const dispatch = useAppDispatch();
    const [state, setState] = useState({
        ls_abon: '',
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
            reason_id: '',
            title: '',
        },
        ip_address: '',
        mac_address: '',
    });

    const [cardIndex , setCardIndex] = useState(0);

    const handleCardChange = (e)=> {
        setCardIndex(e.target.value);
    };

    const inputChangeHandler = (e)=>{
        const {name, value} = e.target;
        setState(prevState => ({...prevState, [name]: value}));
    }

    const selectChangeHandler = (event, arr)=>{
        const { name, value } = event.target;
        if (!value){
            setState((prevState)=>({
                ...prevState,
                [name]: {
                    id: '',
                    reason_id: '',
                    title: '',
                },
            }))
        }else {
            const selectedItem = arr.find(item=> item.title === value);
            setState((prevState)=>({
                ...prevState,
                [name]: selectedItem,
            }));
        }

    }

    const cards = useAppSelector(selectClients);
    const [phoneNumber, setPhoneNumber] = useState("");
    const reasons = useAppSelector(selectReasons);
    const solutions = useAppSelector(selectSolutions);

    useEffect(() => {
        dispatch(getSolution());
        dispatch(getReasons());
    }, [dispatch]);

    useEffect(() => {
        if (cards[cardIndex]){
            setState(prevState => ({
                ...prevState,
                ls_abon: cards[cardIndex].ls_abon,
                full_name: cards[cardIndex].full_name,
                phone_number: cards[cardIndex].phone_number,
                address: cards[cardIndex].address,
                ip_address: cards[cardIndex].ip_address,
                mac_address: cards[cardIndex].mac_address,
            }));
        }
    }, [dispatch, cardIndex, cards]);


    const changePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    };

    const submitFormHandler = async (event) => {
        event.preventDefault();

        const cardMutation = {
            ls_abon: state.ls_abon,
            phone_number: state.phone_number,
            sip: "615",
            spec_full_name: "Бектур Раззаков",
            full_name: state.full_name,
            address: state.address,
            reason_id: state.reason.id,
            solution_id: state.solution.id,
            comment: state.comment.trim(),
        };

        await dispatch(createCard(cardMutation));
    };

    const searchClient = async ()=>{
        await dispatch(getClient(phoneNumber));
    }

    return(
        <>
          <Grid>
              <Container maxWidth="lg">
                  <Grid>
                      <Grid container sx={{
                          pt: 2
                      }}>
                          <Grid>
                              <TextField variant={"outlined"} value={phoneNumber} onChange={changePhoneNumber}></TextField>
                              <Button onClick={searchClient}>
                                  Search
                              </Button>
                          </Grid>
                          <Grid sx={{
                              width: "300px"
                          }}>
                              <TextField
                                  required
                                  select
                                  label={"Клиенты"}
                                  id="card"
                                  name="card"
                                  value={cards.length > 0 ? String(cardIndex) : ""}
                                  onChange={handleCardChange}
                                  sx={{
                                      width: '100%'
                                  }}
                              >
                                  {cards.map((card, index) => (
                                      <MenuItem key={index} value={index}>
                                          {card.full_name}
                                      </MenuItem>
                                  ))}
                              </TextField>
                          </Grid>
                      </Grid>
                      <Grid sx={{
                          padding: "20px 0"
                      }}>
                          <Grid component={"form"} container spacing={2} onSubmit={submitFormHandler}>
                              <Grid container spacing={1} flexDirection={"column"}
                              >
                                  <Grid>
                                      <TextField required label={"Личный счет"} value={state.ls_abon}></TextField>
                                  </Grid>
                                  <Grid>
                                      <TextField required label={"ФИО"} value={state.full_name}></TextField>
                                  </Grid>
                                  <Grid>
                                      <TextField required label={"Адрес"} value={state.address}></TextField>
                                  </Grid>
                                  <Grid>
                                      <Autocomplete
                                          required
                                          multiple
                                          options={state.phone_number}
                                          value={state.phone_number}
                                          disableClearable
                                          readOnly
                                          renderInput={params => <TextField {...params} label={"Номера"}></TextField>}
                                      ></Autocomplete>
                                  </Grid>
                                  <Grid>
                                      <TextField required label={"Мак роутера"} value={state.mac_address}></TextField>
                                  </Grid>
                                  <Grid>
                                      <TextField required label={"Айпи адрес"} value={state.ip_address}></TextField>
                                  </Grid>
                              </Grid>
                              <Grid container spacing={1} flexDirection={"column"}>
                                  <Grid>
                                      <TextField
                                          required
                                          select
                                          label={"Причина обращения"}
                                          id="resone-for-contact"
                                          name="reason"
                                          value={state.reason.title || ""}
                                          onChange={(e)=>selectChangeHandler(e, reasons)}
                                          sx={{
                                              width: '100%'
                                          }}
                                      >
                                          {reasons.map((item, index) => (
                                              <MenuItem value={item.title} key={index}>
                                                  {item.title}
                                              </MenuItem>
                                          ))}
                                      </TextField>
                                  </Grid>
                                  <Grid>
                                      <TextField label="Комментарий" minRows={3} multiline onChange={inputChangeHandler} name={"comment"} value={state.comment}></TextField>
                                  </Grid>
                              </Grid>
                              <Grid container flexDirection={"column"} spacing={3} sx={{
                                  flexGrow: 1,
                              }}>
                                  <Grid>
                                          <TextField
                                              select
                                              id="solution"
                                              value={state.solution.title || ""}
                                              label="Решение"
                                              variant="outlined"
                                              onChange={(e)=>selectChangeHandler(e, solutions)}
                                              name={"solution"}
                                          >
                                              <MenuItem value={''}>Нет решения</MenuItem>
                                              {solutions.map((item, index) => {
                                                  if (!state.reason.id){
                                                      return (
                                                          <MenuItem value={item.title} key={index}>{item.title}</MenuItem>
                                                      )
                                                  }
                                                  if (state.reason.id && state.reason.id === item.reason_id) {
                                                      return (
                                                          <MenuItem value={item.title} key={index}>{item.title}</MenuItem>
                                                      )
                                                  }
                                              })}
                                          </TextField>
                                  </Grid>
                                  <Grid container justifyContent={"end"}>
                                      <Button variant={"outlined"} type={"submit"}>
                                          Сохранить
                                      </Button>
                                  </Grid>
                              </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
              </Container>
          </Grid>
        </>
    );
};

export default CreateCard;