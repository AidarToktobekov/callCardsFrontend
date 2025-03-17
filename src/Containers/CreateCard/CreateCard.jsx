import Grid from "@mui/material/Grid2";
import {Button, Container, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useState} from "react";

const CreateCard = () => {

    const [phoneNumber, setPhoneNumber] = useState("");

    const changePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    }

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
                          <Grid component={"form"} container spacing={2}>
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
                                              // value={state.trainingLevel}
                                              label="Причина обращения"
                                              variant="outlined"
                                              // onChange={handleLevelChange}
                                          >
                                              <MenuItem value="">вфцв</MenuItem>
                                              <MenuItem value="">вфцв</MenuItem>
                                              <MenuItem value="">вфцфв</MenuItem>
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
                                              // value={state.trainingLevel}
                                              label="Решение"
                                              variant="outlined"
                                              // onChange={handleLevelChange}
                                          >
                                              <MenuItem value="">Замена бп/роутера заявка</MenuItem>
                                              <MenuItem value="">вфцв</MenuItem>
                                              <MenuItem value="">вфцфв</MenuItem>
                                          </Select>
                                      </FormControl>
                                  </Grid>
                                  <Grid container justifyContent={"end"}>
                                      <Button variant={"outlined"}>
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