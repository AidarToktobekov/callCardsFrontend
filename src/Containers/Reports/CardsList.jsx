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
  TableRow, TextField,
  Typography
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {exportToExcel} from "../../excelExporter.js";
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
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
import {selectEmployees, selectEmployeesLoading, selectUser} from "../../features/user/userSlice.js";
import {getEmployees} from "../../features/user/userThunk.js";


const CardsList = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectList);
  const loading = useAppSelector(selectListLoading);
  const user = useAppSelector(selectUser);

  const reasons = useAppSelector(selectReasonsList);
  const reasonsLoading = useAppSelector(selectReasonsListLoading);

  const solutions = useAppSelector(selectSolutionsList);
  const solutionLoading = useAppSelector(selectSolutionsListLoading);

  const employees = useAppSelector(selectEmployees);
  const employeesLoading = useAppSelector(selectEmployeesLoading);

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
    if (user?.role === "admin"){
      dispatch(getEmployees());
    }
    dispatch(getReasonsList());
    dispatch(getSolutionsList());
    dispatch(getList());
  }, [dispatch, user]);

  useEffect(() => {
    setTableHeight(changeTableHeight);
    document.body.addEventListener('resize', changeTableHeight);
  }, []);

  const changeTableHeight = () => {
    const headerHeight = document.querySelector('header').offsetHeight;
    const windowHeight = window.innerHeight;
    setTableHeight(windowHeight - headerHeight - 135);
  };

  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filteredReasons, setFilteredReasons] = useState([]);
  const [filteredSolutions, setFilteredSolutions] = useState([]);
  const [filteredDate, setFilteredDate] = useState({
    createdAt: '',
    finishedAt: '',
  });

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
    setFilteredDate({
      createdAt: '',
      finishedAt: '',
    });
    setFilteredList(list);
  }

  const handleFiltration = ()=>{
    let newList = filteredList;
    if (filteredEmployees.length > 0){
      newList = newList.filter((item)=>
          filteredEmployees.some(employee => item.sip === employee.sip)
      );
    }
    if (filteredReasons.length > 0){
      newList = newList.filter((item)=>
        filteredReasons.some(reason => item.reason_id === reason.id)
      );
    }
    if (filteredSolutions.length > 0){
      newList = newList.filter((item)=>
        filteredSolutions.some(solution => item.solution_id === solution.id)
      );
    }
    if (filteredDate.createdAt){
      newList = newList.filter((item) => {
        const createdAt = new Date(item.created_at);
        const from = new Date(filteredDate.createdAt);
        const to = filteredDate.finishedAt ? new Date(filteredDate.finishedAt) : new Date();

        return (createdAt >= from) && (createdAt <= to);
      });
    }
    setFilteredList(newList);
    handleClose();
  }

  const [filters, setFilters] = useState({
    id: '',
    name: '',
    date: '',
    sip: '',
  })

  const handleFiltrationByOrder = (type) => {
    let newList = filteredList;
    if (type === "id"){
      if (filters.id === "up"){
        newList = [...newList].sort((a, b) => b.id - a.id);
        setFilters(prev=>({
          ...prev,
          [type]: 'down',
        }));
      }else{
        newList = [...newList].sort((a, b) => a.id - b.id);
        setFilters(prev=>({
          ...prev,
          [type]: 'up',
        }))
      }
    }
    if (type === "name"){
      if (filters.name === "up"){
        newList = [...newList].sort((a, b) =>
            b.full_name.localeCompare(a.full_name)
        );
        setFilters(prev=>({
          ...prev,
          [type]: 'down',
        }))
      }else{
        newList = [...newList].sort((a, b) =>
            a.full_name.localeCompare(b.full_name)
        );
        setFilters(prev=>({
          ...prev,
          [type]: 'up',
        }))
      }
    }

    if (type === "date"){
      if (filters.date === "up"){
        newList = [...newList].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setFilters(prev=>({
          ...prev,
          [type]: 'down',
        }))
      }else{
        newList = [...newList].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        setFilters(prev=>({
          ...prev,
          [type]: 'up',
        }))
      }
    }

    if (type === "sip"){
      if (filters.sip === "up"){
        newList = [...newList].sort((a, b) => Number(b.sip) - Number(a.sip));
        setFilters(prev=>({
          ...prev,
          [type]: 'down',
        }))
      }else{
        newList = [...newList].sort((a, b) => Number(a.sip) - Number(b.sip));
        setFilters(prev=>({
          ...prev,
          [type]: 'up',
        }))
      }
    }
    setFilteredList(newList);
  }

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
        <Button aria-describedby={id} variant="outlined" onClick={handleClick} sx={{
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
                    top: '60',
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
                    top: '110',
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
            {user.role === 'admin' ?
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
              : null
            }
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
              minWidth: "300px",
              maxHeight: "300px",
              overflow: 'auto',
              background: "rgb(41,41,41)",
            }}
            >
                {hovered.type === "employees" ?
                    employeesLoading ? (
                            <CircularProgress />
                        ) :
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                          {employees.map((value) => (
                              <ListItem
                                  key={value.id}
                                  disablePadding
                              >
                                <ListItemButton role={undefined}
                                                onClick={handleToggle(value, filteredEmployees, setFilteredEmployees)} dense>
                                  <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={filteredEmployees.includes(value)}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{'aria-labelledby': value.id}}
                                    />
                                  </ListItemIcon>
                                  <ListItemText id={value.id} primary={value.full_name}/>
                                </ListItemButton>
                              </ListItem>
                          ))}
                        </List>

                    : null}
                {hovered.type === "reason" ?
                    reasonsLoading ? (
                        <CircularProgress />
                    ) :
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                      {reasons.map((value) => (
                          <ListItem
                              key={value.id}
                              disablePadding
                          >
                            <ListItemButton role={undefined}
                                            onClick={handleToggle(value, filteredReasons, setFilteredReasons)} dense>
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
                      ))}
                    </List>

                  : null}

                {hovered.type === "solution" ?
                    solutionLoading ? (
                            <CircularProgress />
                        ) :
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                          {solutions.map((value) => (
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
                          ))}
                        </List>
                          : null}

                {hovered.type === "date" ?
                    <Grid container flexWrap={"nowrap"} spacing={"10px"} sx={{
                      p: '15px'
                    }}>
                      <Grid>
                        <Typography sx={{
                          fontSize: '14px'
                        }}>
                          От
                        </Typography>
                        <TextField type={"date"} value={filteredDate.createdAt} onChange={(e)=>{
                          setFilteredDate(prev=>({
                            ...prev,
                            createdAt: e.target.value,
                          }));
                        }} sx={{
                          width: '100%',
                        }}/>
                      </Grid>
                      <Grid>
                        <Typography sx={{
                          fontSize: '14px'
                        }}>
                          До
                        </Typography>
                        <TextField type={"date"} value={filteredDate.finishedAt} onChange={(e)=>{
                          setFilteredDate(prev=>({
                            ...prev,
                            finishedAt: e.target.value,
                          }));
                        }} sx={{
                          width: '100%',
                        }}/>
                      </Grid>
                    </Grid>
                     : null}
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
                  <Button variant={"text"} onClick={()=>handleFiltrationByOrder("id")} sx={{
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 0,
                    width: '25px',
                    height: "25px",
                    minWidth: 'unset',
                  }}>
                    {filters.id === "down" ?
                        <KeyboardArrowDownIcon fontSize={"small"}/>
                        :
                        <KeyboardArrowUpIcon fontSize={"small"}/>
                    }
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
                  <Button variant={"text"} onClick={()=>handleFiltrationByOrder("name")}  sx={{
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 0,
                    width: '25px',
                    height: "25px",
                    minWidth: 'unset',
                  }}>
                    {filters.name === "down" ?
                        <KeyboardArrowDownIcon fontSize={"small"}/>
                        :
                        <KeyboardArrowUpIcon fontSize={"small"}/>
                    }
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
                  <Button variant={"text"} onClick={()=>handleFiltrationByOrder("date")} sx={{
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 0,
                    width: '25px',
                    height: "25px",
                    minWidth: 'unset',
                  }}>
                    {filters.date === "down" ?
                        <KeyboardArrowDownIcon fontSize={"small"}/>
                        :
                        <KeyboardArrowUpIcon fontSize={"small"}/>
                    }
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
                  <Button variant={"text"} onClick={()=>handleFiltrationByOrder("sip")} sx={{
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 0,
                    width: '25px',
                    height: "25px",
                    minWidth: 'unset',
                  }}>
                    {filters.sip === "down" ?
                        <KeyboardArrowDownIcon fontSize={"small"}/>
                        :
                        <KeyboardArrowUpIcon fontSize={"small"}/>
                    }
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