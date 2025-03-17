import Grid from "@mui/material/Grid2";
import {Button, Container, TextField} from "@mui/material";
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
                  </Grid>
              </Container>
          </Grid>
        </>
    );
};

export default CreateCard;