import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import {selectCheckedSeniorLoading, selectEmployee, selectUser,} from '../../features/user/userSlice.js';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks.js';
import {getPageTitle} from '../../constants.js';
import {checkInSeniorSpec, getEmployee,} from '../../features/user/userThunk.js';
import Grid from "@mui/material/Grid2";
import {getClient} from "../../features/list/listThunk.js";
import {selectClients, selectClientsLoading} from "../../features/list/listSlice.js";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AppToolbar = () => {
  const location = useLocation();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const title = getPageTitle(location.pathname);
  const checkedSeniorLoading = useAppSelector(selectCheckedSeniorLoading);
  const employee = useAppSelector(selectEmployee);
  const cards = useAppSelector(selectClients);
  const clientsLoading = useAppSelector(selectClientsLoading);
  const [modalClient, setModalClient] = useState(null);
  const [cardsResult, setCardsResult] = useState(false);
  const handleClose = () => setModalClient(null);

  const changeLsAbon = async (e) => {
    if (e.target.value.length > 8) {
      setCardsResult(true);
      await dispatch(getClient(e.target.value));
    }
  };

  useEffect(() => {
    dispatch(getEmployee(user?.id));
  }, [dispatch, user?.id]);


  const checkSenior = employee[0]?.checked_in;
  const handleCheckIn = async () => {
    await dispatch(checkInSeniorSpec({ id: user.id, checkSenior }));
    await dispatch(getEmployee(user?.id));
  };
  return (
    <>
      <AppBar position="static" sx={{
        background: 'transparent',
        boxShadow: 'none',
      }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: '500', fontSize: '30px' }}>
            {title}
          </Typography>
          {user?.role === 'senior_spec' && (
            <Button
              variant={'contained'}
              color={checkSenior ? 'error' : 'primary'}
              loading={checkedSeniorLoading}
              onClick={handleCheckIn}
            >
              {checkSenior ? 'Завершить смену' : 'Начать смену'}
            </Button>
          )}

          <Grid alignItems="center" sx={{
            position: 'relative',
          }}>
            <TextField variant={"filled"} label={"Личный счет | Номер телефона"} onChange={changeLsAbon} sx={{
              width: '300px',
            }}/>
            <Grid sx={{
              position: "absolute",
              width: "300px",
              background: "rgba(113,113,113,0.54)",
              zIndex: 100,
              borderRadius: 5,
              opacity: cardsResult ? 1 : 0,
              visibility: cardsResult ? "visible" : "hidden",
              transition: "opacity 300ms ease-in-out, visibility 300ms ease-in-out",
              padding: "10px",
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: "10px"
            }}>
              <Grid sx={{
                width: "100%",
                maxHeight: '240px',
                overflowY: "auto",
              }}>
                <Button variant={"contained"} color={"info"} sx={{
                  width: "100%",
                  mb: 1
                }}
                onClick={()=> setModalClient({open: true})}
                >
                  Создать новую
                </Button>
                {cards.map((card, i)=>(
                  <Button key={i} variant={"contained"} color={"info"} sx={{
                    width: "100%",
                    mb: 1
                  }} onClick={()=> setModalClient({open: true, ...card})}
                  >
                    {card.full_name}
                  </Button>
                ))}
                {clientsLoading ?
                  <CircularProgress/>
                  :
                  null
                }
              </Grid>
              <Button variant={'contained'} color={"error"} onClick={()=>setCardsResult(false)}>
                Отмена
              </Button>
            </Grid>
          </Grid>
          <Modal
            open={modalClient}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              dadawdawd
            </Box>
          </Modal>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppToolbar;
