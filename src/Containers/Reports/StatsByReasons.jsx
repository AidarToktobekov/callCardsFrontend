import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popover,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.js";
import {selectTreatmentReport, selectTreatmentReportLoading} from "../../features/reports/reportsSlice.js";
import {useEffect, useState} from "react";
import {getTreatmentReport} from "../../features/reports/reportsThunk.js";
import Grid from "@mui/material/Grid2";
import {exportToExcel} from "../../excelExporter.js";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SettingsIcon from '@mui/icons-material/Settings';
import {
  selectReasonsList,
  selectReasonsListLoading
} from "../../features/reasonsAndSolution/reasonsAndSolutionSlice.js";
import {getReasonsList} from "../../features/reasonsAndSolution/reasonsAndSolutionThunk.js";

const StatsByReasons = () => {
  
  const dispatch = useAppDispatch();
  const [tableHeight, setTableHeight] = useState(0);
  
  const treatmentReport = useAppSelector(selectTreatmentReport);
  const loading = useAppSelector(selectTreatmentReportLoading);
  const reasons = useAppSelector(selectReasonsList);
  const reasonLoading = useAppSelector(selectReasonsListLoading);
  const [filteredList, setFilteredList] = useState(treatmentReport);

  useEffect(() => {
    setFilteredList(treatmentReport);
  }, [treatmentReport]);
  
  useEffect(() => {
    dispatch(getTreatmentReport());
    dispatch(getReasonsList());
  }, [dispatch]);
  
  useEffect(() => {
    if (!tableHeight) {
      setTableHeight(changeTableHeight);
      document.body.addEventListener('resize', changeTableHeight);
    }
  }, [tableHeight]);
  
  const changeTableHeight = () => {
    const headerHeight = document.querySelector('header').offsetHeight;
    const windowHeight = window.innerHeight;
    setTableHeight(windowHeight - headerHeight - 135);
  };

  useEffect(() => {
    if (!tableHeight) {
      setTableHeight(changeTableHeight);
      document.body.addEventListener('resize', changeTableHeight);
    }
  }, [tableHeight]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedList = filteredList.slice(startIndex, startIndex + itemsPerPage);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  useEffect(() => {
    if (itemsPerPage > 200) {
      setSnackbarOpen(true);
    }
  }, [itemsPerPage]);

  const handleCloseSnackBar = () => {
    setSnackbarOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = 'filters-popup';

  useEffect(() => {
    setSearchFields({
      reasons: reasons,
    });
  }, [ dispatch, reasons]);

  useEffect(() => {
    setTableHeight(changeTableHeight);
    document.body.addEventListener('resize', changeTableHeight);
  }, []);

  const [filteredReasons, setFilteredReasons] = useState([]);

  useEffect(() => {
    let newList = treatmentReport;
    if (filteredReasons.length > 0){
      newList = newList.filter((item)=>
          filteredReasons.some(reason => item.reason === reason.title)
      );
    }
    setFilteredList(newList);
  }, [filteredReasons, treatmentReport]);

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

  const [filters, setFilters] = useState({
    count: '',
    reason: '',
  });

  const handleFiltrationByOrder = (type) => {
    let newList = filteredList;
    if (type === "reason"){
      if (filters.reason === "up"){
        newList = [...newList].sort((a, b) =>
            b.reason.localeCompare(a.reason)
        );
        setFilters(prev=>({
          ...prev,
          [type]: 'down',
        }))
      }else{

        newList = [...newList].sort((a, b) =>
            a.reason.localeCompare(b.reason)
        );
        setFilters(prev=>({
          ...prev,
          [type]: 'up',
        }))
      }
    }

    if (type === "count"){
      if (filters.count === "up"){
        newList = [...newList].sort((a, b) => Number(b.count) - Number(a.count));
        setFilters(prev=>({
          ...prev,
          [type]: 'down',
        }))
      }else{
        newList = [...newList].sort((a, b) => Number(a.count) - Number(b.count));
        setFilters(prev=>({
          ...prev,
          [type]: 'up',
        }))
      }
    }
    setFilteredList(newList);
  }

  const [searchFields, setSearchFields] = useState({
    reasons: [],
  });

  const handleChangeSearchFields = (e)=>{
    const { name, value } = e.target;
    if (!value){
      setSearchFields({
        reasons: reasons,
      });
    }else{
      setSearchFields(prev=>({
        ...prev,
        [name]: reasons.filter((item)=>
            item.title.toLowerCase().includes(value.toLowerCase()),
        )
      }));
    }
  }


  return (
    <>
      <Container
          variant={"h1"}
          maxWidth={"lg"}
      >
        <Grid container justifyContent="space-between" spacing={1} p={"20px"}>
          <Typography
              sx={{
                fontSize: "25px",
                color: '#fff',
                textAlign: 'center',
              }}
          >
            Отчет по причинам
          </Typography>
          <Grid container alignItems={"center"} spacing={2} sx={{
            border: '1px solid #90caf9',
            ml: "auto",
            borderRadius: "5px",
            color: '#90caf9',
            fontFamily: 'Roboto, sans-serif',
            px: 2,
          }}
          >
            <Grid container alignItems={"center"} spacing={"5px"}>
              Кол-во строк:
              <TextField
                  type="number"
                  value={itemsPerPage}
                  onChange={(e)=>setItemsPerPage(Number(e.target.value))}
                  variant={"filled"}
                  sx={{
                    borderRadius: '5px',
                  }}
                  inputProps={{
                    min: 1,
                    sx: {
                      color: '#90caf9',
                      padding: "5px 5px",
                      maxWidth: "50px",
                      textAlign: "center",
                    }
                  }}
              />
              <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={5000}
                  onClose={handleCloseSnackBar}
              >
                <Alert
                    onClose={handleCloseSnackBar}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                  При большом колличестве строк приложение будет виснуть!
                </Alert>
              </Snackbar>
            </Grid>
            <Grid>
              {(currentPage - 1) * itemsPerPage + 1} - {currentPage * itemsPerPage > filteredList.length ?
                filteredList.length : currentPage * itemsPerPage
            }
            </Grid>
            <Grid>
              <Button disabled={currentPage <= 1} onClick={()=> {
                if (currentPage !== 1){
                  setCurrentPage(prev => prev - 1)
                }
              }} sx={{
                minWidth: 'unset',
                p: "5px",
                borderRadius: '50%'
              }}>
                <ArrowLeftIcon></ArrowLeftIcon>
              </Button>
              <Button disabled={(currentPage - 1) * itemsPerPage + itemsPerPage > filteredList.length} onClick={()=> {
                if((currentPage - 1) * itemsPerPage + itemsPerPage < filteredList.length) {
                  setCurrentPage(prev => prev + 1)
                }
              }} sx={{
                minWidth: 'unset',
                p: "5px",
                borderRadius: '50%'
              }}>
                <ArrowRightIcon></ArrowRightIcon>
              </Button>
            </Grid>
          </Grid>
          <Button variant={"outlined"} onClick={()=>exportToExcel(filteredList, "Стат-ка_по_сотрудникам")}>
            Export excel
          </Button>
        </Grid>
        <TableContainer component={Paper} sx={{
          height: `${tableHeight}px`,
          width: '100%'
        }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{
                "&>th":{
                  borderRight: '1px solid #515151',
                },
                "&>th>div>p":{
                  textAlign: 'center',
                },
                "&>th>div":{
                  gap: '10px',
                  alignItems: 'center',
                },
                "&>th>div>button":{
                  color: '#fff'
                }
              }}
              >
                <TableCell>
                  <Grid sx={{
                    display: 'flex',
                  }}>
                    <Typography>
                      Причина
                    </Typography>
                    <Button variant={"text"} onClick={()=>handleFiltrationByOrder("reason")}  sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 0,
                      width: '25px',
                      height: "25px",
                      minWidth: 'unset',
                      ml: 'auto'
                    }}>
                      {filters.reason === "down" ?
                          <KeyboardArrowDownIcon fontSize={"small"}/>
                          :
                          <KeyboardArrowUpIcon fontSize={"small"}/>
                      }
                    </Button>
                    <Button  aria-describedby={id} variant="text" onClick={handleClick} sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 0,
                      width: '25px',
                      height: "25px",
                      minWidth: 'unset',
                    }}>
                      <SettingsIcon/>
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
                    >
                      <Grid sx={{
                        minWidth: "300px",
                        background: "rgb(41,41,41)",
                      }}
                      >
                        {reasonLoading ? (
                                <CircularProgress/>
                            ) :
                            <Grid sx={{
                              bgcolor: 'background.paper'
                            }}
                            >
                              <Grid container spacing={1} flexDirection={"column"} sx={{
                                px: 1,
                              }}
                              >
                                <TextField autoComplete={'off'} type={"text"} label={"Причина"} name={"reasons"}
                                           onChange={handleChangeSearchFields} sx={{
                                  width: "100%",
                                }}/>
                                <Button variant="contained" color={"error"} onClick={()=>setFilteredReasons([])} sx={{
                                  width: '100%',
                                }}>
                                  Очистить
                                </Button>
                              </Grid>
                              <List sx={{width: '100%', overflow: 'auto', maxHeight: "230px",}}>
                                {searchFields.reasons.map((value) => (
                                    <ListItem
                                        key={value.id}
                                        disablePadding
                                    >
                                      <ListItemButton role={undefined}
                                                      onClick={handleToggle(value, filteredReasons, setFilteredReasons)}
                                                      dense>
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
                            </Grid>
                        }
                      </Grid>
                    </Popover>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Grid sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                    <Typography>
                      Кол-во
                    </Typography>
                    <Button variant={"text"} onClick={()=>handleFiltrationByOrder("count")} sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 0,
                      width: '25px',
                      height: "25px",
                      minWidth: 'unset',
                    }}>
                      {filters.count === "down" ?
                          <KeyboardArrowDownIcon fontSize={"small"}/>
                          :
                          <KeyboardArrowUpIcon fontSize={"small"}/>
                      }
                    </Button>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
              ) : (
                  paginatedList.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell align="center">
                          {item.reason}
                        </TableCell>

                        <TableCell align="center">
                          {item.count}
                        </TableCell>
                      </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default StatsByReasons;