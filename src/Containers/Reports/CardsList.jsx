import {useAppDispatch, useAppSelector} from "../../app/hooks.js";
import {selectList, selectListLoading} from "../../features/list/listSlice.js";
import {useEffect, useState} from "react";
import {getList} from "../../features/list/listThunk.js";
import {
  Button,
  Checkbox,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {exportToExcel} from "../../excelExporter.js";
import PersonIcon from '@mui/icons-material/Person';
import TuneIcon from '@mui/icons-material/Tune';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {getReasonsList, getSolutionsList} from "../../features/reasonsAndSolution/reasonsAndSolutionThunk.js";
import {
  selectReasonsList,
  selectReasonsListLoading,
  selectSolutionsList,
  selectSolutionsListLoading
} from "../../features/reasonsAndSolution/reasonsAndSolutionSlice.js";


const CardsList = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectList);
  const loading = useAppSelector(selectListLoading);

  const reasons = useAppSelector(selectReasonsList);
  const reasonsLoading = useAppSelector(selectReasonsListLoading);

  const solutions = useAppSelector(selectSolutionsList);
  const solutionLoading = useAppSelector(selectSolutionsListLoading);

  const [tableHeight, setTableHeight] = useState(0);
  const [filteredList, setFilteredList] = useState(list);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hovered, setHovered] = useState({
    state: false,
    top: '',
    type: '',
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = 'filters-popup';

  useEffect(() => {
    setFilteredList(list);
  }, [list]);

  useEffect(() => {
    dispatch(getReasonsList());
    dispatch(getSolutionsList());
    dispatch(getList());
  }, [dispatch]);

  useEffect(() => {
    setTableHeight(changeTableHeight);
    document.body.addEventListener('resize', changeTableHeight);
  }, []);

  const changeTableHeight = () => {
    const headerHeight = document.querySelector('header').offsetHeight;
    const windowHeight = window.innerHeight;
    setTableHeight(windowHeight - headerHeight - 135);
  };

  const [filteredReasons, setFilteredReasons] = useState([]);
  const [filteredSolutions, setFilteredSolutions] = useState([]);

  const handleToggle = (value, state ,setState) => () => {
    const currentIndex = state.indexOf(value);
    const newChecked = [...state];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setState(newChecked);
  };

  const resetFiltration = ()=>{
    setFilteredReasons([]);
    setFilteredSolutions([]);
  }

  const handleFiltration = ()=>{
    let newList;
    if (filteredReasons.length > 0){
      newList = list.filter((item)=>
        filteredReasons.some(reason => item.reason_id === reason.id)
      );
    }
    if (filteredSolutions.length > 0){
      newList = newList.filter((item)=>
        filteredSolutions.some(solution => item.solution_id === solution.id)
      );
    }
    console.log(newList)
    setFilteredList(newList);
    handleClose();
  }

  // {
  //   "id": 3236,
  //     "ls_abon": "175089374",
  //     "account_id": "18673540701",
  //     "n_result_id": "18673539901",
  //     "created_at": "2025-04-16 06:02:53",
  //     "spec_full_name": "СПК Мукашева Айдана ТП",
  //     "sip": "629",
  //     "full_name": "Ыбыкеева Мадина",
  //     "phone_number": [
  //   "996559000700",
  //   "996555292806"
  // ],
  //     "call_from": "0708081084",
  //     "address": "Чуйская обл., Аламудунский р-н, с. Беш-Кунгей, ул. Жапарова, д. 9",
  //     "mac_address": "BC-60-6B-5B-58-AA",
  //     "ip_address": "10.200.145.86",
  //     "mac_onu": "",
  //     "ip_olt": "",
  //     "comment": "",
  //     "reason_id": 28,
  //     "reason_title": "Консультация",
  //     "solution_id": 157,
  //     "solution_title": "Консультация по ТВ",
  //     "reason": {
  //   "id": 28,
  //       "title": "Консультация"
  // },
  //   "solution": {
  //   "id": 157,
  //       "title": "Консультация по ТВ"
  // }
  // },

  return (
    <>
      <Grid container spacing={2} p={"20px"}>
        <Typography
            sx={{
              fontSize: "25px",
              color: '#fff',
              textAlign: 'center',
            }}
        >
          Отчет по картам звонков
        </Typography>
        <Button aria-describedby={id} variant={"outlined"} onClick={handleClick} sx={{
          marginLeft: 'auto',
        }}>
          Фильтрация
        </Button>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            PaperProps={{
              onMouseLeave: () =>
                  setHovered({
                    state: false,
                    top: '0',
                  }),
              sx: {
                overflow: 'visible',
              },
            }}
        >
          <List
              sx={{
                fontFamily: "Roboto, sans-serif",
              }}
          >
            <ListItem>
              <ListItemButton
                  sx={{
                    display: 'flex',
                    width: '100%',
                    p: "8px 5px",
                    gap: '15px',
                    alignItems: 'center',
                    borderRadius: '5px'
                  }}
                  onMouseEnter={() => setHovered({
                    state: true,
                    top: '10',
                    type: 'employees',
                  })}
              >
                <Grid sx={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <PersonIcon />
                </Grid>
                <Typography>
                  Сотрудники
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                  sx={{
                    display: 'flex',
                    width: '100%',
                    p: "8px 5px",
                    gap: '15px',
                    alignItems: 'center',
                    borderRadius: '5px'
                  }}
                  onMouseEnter={() => setHovered({
                    state: true,
                    top: '60',
                    type: "reason",
                  })}
              >
                <Grid sx={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <QuestionMarkIcon />
                </Grid>
                <Typography>
                  Причины
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                  sx={{
                    display: 'flex',
                    width: '100%',
                    p: "8px 5px",
                    gap: '15px',
                    alignItems: 'center',
                    borderRadius: '5px'
                  }}
                  onMouseEnter={() => setHovered({
                    state: true,
                    top: '110',
                    type: 'solution',
                  })}
              >
                <Grid sx={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <EmojiObjectsIcon />
                </Grid>
                <Typography>
                  Решения
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                  sx={{
                    display: 'flex',
                    width: '100%',
                    p: "8px 5px",
                    gap: '15px',
                    alignItems: 'center',
                    borderRadius: '5px'
                  }}
                  onMouseEnter={() => setHovered({
                    state: true,
                    top: '160',
                    type: 'date',
                  })}
              >
                <Grid sx={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <CalendarMonthIcon />
                </Grid>
                <Typography>
                  Дата
                </Typography>
              </ListItemButton>
            </ListItem>
          </List>
          <Grid container flexDirection={"column"} spacing={1} sx={{
            padding: "0 5px 8px"
          }}>
            <Button variant={"outlined"} color={"primary"} onClick={handleFiltration}>
              Фильтровать
            </Button>
            <Button variant={"outlined"} color={"error"} onClick={resetFiltration}>
              Сбросить
            </Button>
          </Grid>
          <Grid
            sx={{
            display: hovered.state ? "block" : "none",
            position: 'absolute',
            top: `${hovered.top}px`,
            right: "100%",
            paddingRight: '10px',
          }}>
            <Grid sx={{
              width: "300px",
              height: "400px",
              overflow: 'auto',
              background: "rgb(41,41,41)",
            }}>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                {hovered.type === "reason" ?
                    reasonsLoading ? (
                        <CircularProgress />
                    ) :
                    reasons.map((value) => (
                      <ListItem
                          key={value.id}
                          disablePadding
                      >
                        <ListItemButton role={undefined} onClick={handleToggle(value, filteredReasons, setFilteredReasons)} dense>
                          <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={filteredReasons.includes(value)}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{'aria-labelledby': value.id}}
                            />
                          </ListItemIcon>
                          <ListItemText id={value.id} primary={value.title}/>
                        </ListItemButton>
                      </ListItem>
                  )) : null}

                {hovered.type === "solution" ?
                    solutionLoading ? (
                            <CircularProgress />
                        ) :
                        solutions.map((value) => (
                            <ListItem
                                key={value.id}
                                disablePadding
                            >
                              <ListItemButton role={undefined} onClick={handleToggle(value, filteredSolutions, setFilteredSolutions)} dense>
                                <ListItemIcon>
                                  <Checkbox
                                      edge="start"
                                      checked={filteredSolutions.includes(value)}
                                      tabIndex={-1}
                                      disableRipple
                                      inputProps={{'aria-labelledby': value.id}}
                                  />
                                </ListItemIcon>
                                <ListItemText id={value.id} primary={value.title}/>
                              </ListItemButton>
                            </ListItem>
                        )) : null}
              </List>
            </Grid>
          </Grid>
        </Popover>
        <Button variant={"outlined"} onClick={()=> exportToExcel(filteredList, "Карты-звонков")}>
          Export excel
        </Button>
      </Grid>
      <TableContainer component={Paper} sx={{
        height: `${tableHeight}px`,
        width: '100%'
      }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{
              "&>th":{
                borderRight: '1px solid #515151',
              }
            }}
            >
              <TableCell>
                <Grid sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  "&:hover > button":{
                    display: 'flex',
                  }
                }}>
                  <Typography>
                    ID
                  </Typography>
                  <Button variant={"text"} sx={{
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 0,
                    width: '25px',
                    height: "25px",
                    minWidth: 'unset',
                  }}>
                    <TuneIcon fontSize={"small"}/>
                  </Button>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  "&:hover > button":{
                    display: 'flex',
                  }
                }}>
                  <Typography>
                    ФИО
                  </Typography>
                  <Button variant={"text"} sx={{
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 0,
                    width: '25px',
                    height: "25px",
                    minWidth: 'unset',
                  }}>
                    <TuneIcon fontSize={"small"}/>
                  </Button>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  "&:hover > button":{
                    display: 'flex',
                  }
                }}>
                  <Typography>
                    Звонок от
                  </Typography>
                  <Button variant={"text"} sx={{
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 0,
                    width: '25px',
                    height: "25px",
                    minWidth: 'unset',
                  }}>
                    <TuneIcon fontSize={"small"}/>
                  </Button>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  "&:hover > button":{
                    display: 'flex',
                  }
                }}>
                  <Typography>
                    ЛС абонента
                  </Typography>
                  <Button variant={"text"} sx={{
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 0,
                    width: '25px',
                    height: "25px",
                    minWidth: 'unset',
                  }}>
                    <TuneIcon fontSize={"small"}/>
                  </Button>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  "&:hover > button":{
                    display: 'flex',
                  }
                }}>
                  <Typography>
                    Номер телефона
                  </Typography>
                  <Button variant={"text"} sx={{
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 0,
                    width: '25px',
                    height: "25px",
                    minWidth: 'unset',
                  }}>
                    <TuneIcon fontSize={"small"}/>
                  </Button>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  "&:hover > button":{
                    display: 'flex',
                  }
                }}>
                  <Typography>
                    Дата создания
                  </Typography>
                  <Button variant={"text"} sx={{
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 0,
                    width: '25px',
                    height: "25px",
                    minWidth: 'unset',
                  }}>
                    <TuneIcon fontSize={"small"}/>
                  </Button>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  "&:hover > button":{
                    display: 'flex',
                  }
                }}>
                  <Typography>
                    Причина
                  </Typography>
                  <Button variant={"text"} sx={{
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 0,
                    width: '25px',
                    height: "25px",
                    minWidth: 'unset',
                  }}>
                    <TuneIcon fontSize={"small"}/>
                  </Button>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  "&:hover > button":{
                    display: 'flex',
                  }
                }}>
                  <Typography>
                    Решение
                  </Typography>
                  <Button variant={"text"} sx={{
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 0,
                    width: '25px',
                    height: "25px",
                    minWidth: 'unset',
                  }}>
                    <TuneIcon fontSize={"small"}/>
                  </Button>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  "&:hover > button":{
                    display: 'flex',
                  }
                }}>
                  <Typography>
                    СИП
                  </Typography>
                  <Button variant={"text"} sx={{
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 0,
                    width: '25px',
                    height: "25px",
                    minWidth: 'unset',
                  }}>
                    <TuneIcon fontSize={"small"}/>
                  </Button>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  "&:hover > button":{
                    display: 'flex',
                  }
                }}>
                  <Typography>
                    Комментарий
                  </Typography>
                  <Button variant={"text"} sx={{
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 0,
                    width: '25px',
                    height: "25px",
                    minWidth: 'unset',
                  }}>
                    <TuneIcon fontSize={"small"}/>
                  </Button>
                </Grid>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
            ) : (
                filteredList.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {item.id}
                      </TableCell>

                      <TableCell>
                        {item.full_name}
                      </TableCell>

                      <TableCell>
                        {item.call_from}
                      </TableCell>

                      <TableCell>
                        {item.ls_abon}
                      </TableCell>

                      <TableCell>
                        {item.phone_number.join(', ')}
                      </TableCell>

                      <TableCell>
                        {item.created_at}
                      </TableCell>

                      <TableCell>
                        {item.reason?.title}
                      </TableCell>

                      <TableCell>
                        {item.solution?.title}
                      </TableCell>

                      <TableCell>
                        {item.sip}
                      </TableCell>

                      <TableCell>
                        {item.comment}
                      </TableCell>
                    </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CardsList;