import Grid from "@mui/material/Grid2";
import {Button, Container, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.js";
import {selectCard, selectCardLoading, selectReasons, selectSolutions} from "../../features/list/listSlice.js";
import {getReasons, getSolution} from "../../features/list/listThunk.js";

const CreateCard = () => {

    const dispatch = useAppDispatch();
    const [state, setState] = useState({
        ls_abon: '',
        spec_full_name: '',
        sip: '',
        full_name: "",
        phone_number: "",
        address: '',
        comment: '',
        reason: '',
        solution: '',
    });

    const inputChangeHandler = (event) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const card = useAppSelector(selectCard);
    const cardLoading = useAppSelector(selectCardLoading);
    const [phoneNumber, setPhoneNumber] = useState("");
    const reasons = useAppSelector(selectReasons);
    const solutions = useAppSelector(selectSolutions);

    useEffect(() => {
        dispatch(getSolution());
        dispatch(getReasons());
    }, [dispatch]);


    const changePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    };

    const submitFormHandler = (event) => {
        event.preventDefault();
        console.log(state);
    };

    return(
        <>
          <Grid>
              <Container maxWidth="lg">
                  <Grid>
                      <Grid>
                          <TextField variant={"outlined"} value={phoneNumber} onChange={changePhoneNumber}></TextField>
                          <Button>
                              Search
                          </Button>
                      </Grid>
                      <Grid sx={{
                          padding: "20px 0"
                      }}>
                          <Grid component={"form"} container spacing={2} onSubmit={submitFormHandler}>
                              <Grid container spacing={1} flexDirection={"column"}
                              >
                                  <Grid>
                                      <TextField placeholder={"Личный счет"}></TextField>
                                  </Grid>
                                  <Grid>
                                      <TextField placeholder={"ФИО"}></TextField>
                                  </Grid>
                                  <Grid>
                                      <TextField placeholder={"Адрес"}></TextField>
                                  </Grid>
                                  <Grid>
                                      <TextField placeholder={"Номер телефона"}></TextField>
                                  </Grid>
                                  <Grid>
                                      <TextField placeholder={"Мак роутера"}></TextField>
                                  </Grid>
                                  <Grid>
                                      <TextField placeholder={"Айпи адрес"}></TextField>
                                  </Grid>
                              </Grid>
                              <Grid container spacing={1} flexDirection={"column"}>
                                  <Grid>
                                      <FormControl fullWidth>
                                          <InputLabel id="resone-for-contact-label">Причина обращения</InputLabel>
                                          <Select
                                              required
                                              labelId="resone-for-contact-label"
                                              id="resone-for-contact"
                                              value={state.reason}
                                              label="Причина обращения"
                                              variant="outlined"
                                              onChange={inputChangeHandler}
                                              name={"reason"}
                                          >
                                              {reasons.map((item, index) => (
                                                  <MenuItem value={item.title} key={index}>
                                                      {item.title}
                                                  </MenuItem>
                                              ))}
                                          </Select>
                                      </FormControl>
                                  </Grid>
                                  <Grid>
                                      <TextField label="Комментарий" minRows={3} multiline placeholder={"Айпи адрес"}></TextField>
                                  </Grid>
                              </Grid>
                              <Grid container flexDirection={"column"} spacing={3} sx={{
                                  flexGrow: 1,
                              }}>
                                  <Grid>
                                      <FormControl fullWidth>
                                          <InputLabel id="solution-label">Решение</InputLabel>
                                          <Select
                                              required
                                              labelId="solution-label"
                                              id="solution"
                                              value={state.solution}
                                              label="Решение"
                                              variant="outlined"
                                              onChange={inputChangeHandler}
                                              name={"solution"}
                                          >
                                              {solutions.map((item, index) => {
                                                      return (
                                                          <MenuItem value={item.title} key={index}>{item.title}</MenuItem>
                                                      )
                                              })}
                                          </Select>
                                      </FormControl>
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