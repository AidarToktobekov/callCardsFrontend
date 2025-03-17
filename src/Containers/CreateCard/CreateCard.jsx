import Grid from "@mui/material/Grid2";
import {Button, Container, TextField, Typography} from "@mui/material";

const CreateCard = () => {
    return(
        <>
          <Grid>
              <Container maxWidth="lg">
                  <Grid>
                      <Grid>
                          <TextField variant={"outlined"}></TextField>
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